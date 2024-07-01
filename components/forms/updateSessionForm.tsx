"use client";

import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { Session, SessionSchema, TSessionSchema, User } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Select, SelectItem } from "@nextui-org/select";
import { DatePicker } from "@nextui-org/date-picker";
import { updateSession } from "@/app/lib/sessions";
import { useState } from "react";
import { DateTime } from "luxon";
import { getLocalTimeZone, parseAbsolute } from "@internationalized/date";
import { sessionTypes } from "./createSessionForm";

type Props = {
  session: Session;
  onClose: () => void;
};

const UpdateSessionForm: React.FC<Props> = ({ session, onClose }) => {
  const [selectedDate, setSelectedDate] = useState(
    parseAbsolute(session.date.replace(" ", "T"), getLocalTimeZone())
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<Session>({
    resolver: zodResolver(SessionSchema),
    defaultValues: {
      ...session,
    },
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateSession,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sessions"] }); // Invalidate and refetch
      toast.success("Session updated successfully");
      reset();
      onClose();
    },
    onError: (error: any) => {
      console.error(error);
      toast.error("Something went wrong");
    },
  });

  const onSubmit = (data: TSessionSchema) => {
    const sessionData = {
      ...session,
      ...data,
      date: DateTime.fromISO(selectedDate.toString())
        .toUTC()
        .toFormat("yyyy-MM-dd HH:mm:ss.SSS'Z'"),
      duration_in_hours: Number(data.duration_in_hours),
    };

    mutation.mutate(sessionData as Session);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <DatePicker
        value={selectedDate}
        onChange={setSelectedDate}
        label="Date"
        variant="underlined"
        hideTimeZone
        showMonthAndYearPickers
      />
      {errors.date && (
        <small className="mt-1 ml-1 text-red-500">{`${errors.date.message}`}</small>
      )}

      <div className="flex gap-4">
        <div className="w-full">
          <Select
            {...register("type")}
            items={sessionTypes}
            label="Session Type"
            className="block max-w-[160px]"
            classNames={{ popoverContent: ["bg-background"] }}
            variant="underlined"
          >
            {(type) => <SelectItem key={type.key}>{type.label}</SelectItem>}
          </Select>
          {errors.type && (
            <small className="mt-1 ml-1 text-red-500">{`${errors.type.message}`}</small>
          )}
        </div>
        <div className="w-full">
          <Input
            {...register("duration_in_hours")}
            type="number"
            variant={"underlined"}
            label="Duration in hours"
            min={1}
          />
          {errors.duration_in_hours && (
            <small className="mt-1 ml-1 text-red-500">{`${errors.duration_in_hours.message}`}</small>
          )}
        </div>
      </div>

      <div className="flex justify-end">
        <Button
          type="submit"
          size="sm"
          className="my-4 bg-cultured text-forrestGreen hover:bg-opacity-90 font-medium"
          disabled={isSubmitting}
        >
          {isSubmitting ? "please wait..." : "Save"}
        </Button>
      </div>
    </form>
  );
};

export default UpdateSessionForm;

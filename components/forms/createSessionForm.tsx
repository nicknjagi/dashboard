"use client";

import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { SessionSchema, TSessionSchema, User } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Select, SelectItem } from "@nextui-org/select";
import { useParams } from "next/navigation";
import { DatePicker } from "@nextui-org/date-picker";
import { now, getLocalTimeZone } from "@internationalized/date";
import { createSession } from "@/app/lib/sessions";
import { useEffect, useState } from "react";
import { DateTime } from "luxon";
import { generateJitsiLink } from "@/app/lib/utils";

type Props = {
  onClose: () => void;
};

export const sessionTypes = [
  { key: "MEETING", label: "MEETING" },
  { key: "DEEP_FOCUS", label: "DEEP_FOCUS" },
  { key: "NETWORKING", label: "NETWORKING" },
  { key: "LESSON", label: "LESSON" },
  { key: "COLLABORATION", label: "COLLABORATION" },
  { key: "PUBLIC", label: "PUBLIC" },
];

const CreateSessionForm: React.FC<Props> = ({ onClose }) => {
  const { id } = useParams();
  const [selectedDate, setSelectedDate] = useState(now(getLocalTimeZone()));
  const [generatedLink, setGeneratedLink] = useState(generateJitsiLink());

  useEffect(() => {
    setGeneratedLink(generateJitsiLink());
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TSessionSchema>({
    resolver: zodResolver(SessionSchema),
    defaultValues: {
      workspace: id as string,
      date: selectedDate.toString(),
      link_to_session: generatedLink,
    },
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createSession,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sessions"] }); // Invalidate and refetch
      toast.success("Session created successfully");
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
      ...data,
      date: DateTime.fromISO(selectedDate.toString())
        .toUTC()
        .toFormat("yyyy-MM-dd HH:mm:ss.SSS'Z'"),
      duration_in_hours: Number(data.duration_in_hours),
    };

    mutation.mutate(sessionData);
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
          {isSubmitting ? "please wait..." : "Create"}
        </Button>
      </div>
    </form>
  );
};

export default CreateSessionForm;

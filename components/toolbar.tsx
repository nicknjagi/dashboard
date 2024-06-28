"use client";

import { Button } from "@nextui-org/button";
import { type Editor } from "@tiptap/react";
import {
  Bold,
  Strikethrough,
  Italic,
  List,
  ListOrdered,
  Heading2,
  Underline,
  Quote,
  Undo,
  Redo,
  Code,
  Heading1,
  Heading3,
  Image,
} from "lucide-react";

type Props = {
  editor: Editor | null;
  content: string;
  isSubmitting: boolean;
};

export default function Toolbar({ editor, content, isSubmitting }: Props) {
  if (!editor) {
    return null;
  }
  return (
    <div className="flex flex-wrap flex-row items-center justify-between p-2 gap-2 border-b border-cultured/20 rounded-t-lg bg-forrestGreen sticky top-0 z-20">
      <div className="flex flex-wrap justify-start items-center gap-1 w-full my-1">
        {/* Bold button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBold().run();
          }}
          className={
            editor.isActive("bold")
              ? "bg-cultured/15 text-cultured p-1 rounded-lg"
              : "p-1"
          }
        >
          <Bold size={18} />
        </button>
        {/* Italic button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleItalic().run();
          }}
          className={
            editor.isActive("italic")
              ? "bg-cultured/15 text-cultured p-1 rounded-lg"
              : "p-1"
          }
        >
          <Italic size={18} />
        </button>
        {/* Underline button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleUnderline().run();
          }}
          className={
            editor.isActive("underline")
              ? "bg-cultured/15 text-cultured p-1 rounded-lg"
              : "p-1"
          }
        >
          <Underline size={18} />
        </button>
        {/* Strikethrough button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleStrike().run();
          }}
          className={
            editor.isActive("strike")
              ? "bg-cultured/15 text-cultured p-1 rounded-lg"
              : "p-1"
          }
        >
          <Strikethrough size={18} />
        </button>
        {/* H1 button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleHeading({ level: 1 }).run();
          }}
          className={
            editor.isActive("heading", { level: 1 })
              ? "bg-cultured/15 text-cultured p-1 rounded-lg"
              : "p-1"
          }
        >
          <Heading1 size={18} />
        </button>
        {/* H2 button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleHeading({ level: 2 }).run();
          }}
          className={
            editor.isActive("heading", { level: 2 })
              ? "bg-cultured/15 text-cultured p-1 rounded-lg"
              : "p-1"
          }
        >
          <Heading2 size={18} />
        </button>
        {/* H3 button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleHeading({ level: 3 }).run();
          }}
          className={
            editor.isActive("heading", { level: 3 })
              ? "bg-cultured/15 text-cultured p-1 rounded-lg"
              : "p-1"
          }
        >
          <Heading3 size={18} />
        </button>
        {/* Unordered List Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBulletList().run();
          }}
          className={
            editor.isActive("bulletList")
              ? "bg-cultured/15 text-cultured p-1 rounded-lg"
              : "p-1"
          }
        >
          <List size={18} />
        </button>
        {/* Ordered List Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleOrderedList().run();
          }}
          className={
            editor.isActive("orderedList")
              ? "bg-cultured/15 text-cultured p-1 rounded-lg"
              : "p-1"
          }
        >
          <ListOrdered size={18} />
        </button>
        {/* Blockquote Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBlockquote().run();
          }}
          className={
            editor.isActive("blockquote")
              ? "bg-cultured/15 text-cultured p-1 rounded-lg"
              : "p-1"
          }
        >
          <Quote size={18} />
        </button>
        {/* Image Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            const url = window.prompt("URL");
            editor
              .chain()
              .focus()
              .setImage({ src: url as string })
              .run();
          }}
          className={
            editor.isActive("code")
              ? "bg-cultured/15 text-cultured p-1 rounded-lg"
              : "p-1"
          }
        >
          <Image size={18} />
        </button>
        {/* Code Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleCode().run();
          }}
          className={
            editor.isActive("code")
              ? "bg-cultured/15 text-cultured p-1 rounded-lg"
              : "p-1"
          }
        >
          <Code size={18} />
        </button>
        {/* Undo Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().undo().run();
          }}
          className={
            editor.isActive("undo")
              ? "bg-cultured/15 text-cultured p-1 rounded-lg"
              : "p-1"
          }
        >
          <Undo size={18} />
        </button>
        {/* Redo Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().redo().run();
          }}
          className={
            editor.isActive("redo")
              ? "bg-cultured/15 text-cultured p-1 rounded-lg"
              : "p-1"
          }
        >
          <Redo size={18} />
        </button>
        {/* submit button */}
        <div className="w-fit inline-block ml-auto">
          <Button
            type="submit"
            size="sm"
            className="bg-cultured text-forrestGreen hover:bg-opacity-90 font-medium"
          >
            {isSubmitting ? "please wait..." : "Submit"}
          </Button>
        </div>
      </div>
    </div>
  );
}

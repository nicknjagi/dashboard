"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useState } from "react";
import Toolbar from "./toolbar";
import Underline from "@tiptap/extension-underline";
import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";
import Heading from "@tiptap/extension-heading";
import Document from "@tiptap/extension-document";
import Text from "@tiptap/extension-text";
import Paragraph from "@tiptap/extension-paragraph";
import Code from "@tiptap/extension-code";
import Blockquote from "@tiptap/extension-blockquote";
import BulletList from "@tiptap/extension-bullet-list";
import ListItem from "@tiptap/extension-list-item";
import OrderedList from "@tiptap/extension-ordered-list";
import Image from "@tiptap/extension-image";

const Tiptap = () => {
  const [content, setContent] = useState<string>("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const handleContentChange = (newContent: string) => {
    setContent(newContent);
  };
  const editor = useEditor({
    extensions: [
      Underline,
      Heading.configure({
        levels: [1, 2, 3],
      }),
      Document,
      Paragraph,
      Text,
      Blockquote,
      Code,
      BulletList, 
      ListItem,
      OrderedList,
      Image,
      StarterKit
    ],
    editorProps: {
      attributes: {
        class: "outline-none px-2 sm:px-4 py-3 min-h-[200px]",
      },
    },
    onUpdate: ({ editor }) => {
      handleContentChange(editor.getHTML());
    },
    content:content
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const data = {
      content: content,
    };
    console.log(data);
    // setContent('')
  };

  return (
    <>
      <Button
        size="sm"
        onPress={onOpen}
        className="bg-cultured text-forrestGreen hover:bg-opacity-90 font-medium"
      >
        + New
      </Button>
      <Modal
        className="bg-forrestGreen py-8"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        size="4xl"
        scrollBehavior="inside"
        isKeyboardDismissDisabled={true}
        placement="top-center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              {/* <ModalHeader className="flex flex-col gap-1 pb-0">
                add
              </ModalHeader> */}
              <ModalBody>
                <form
                  onSubmit={handleSubmit}
                  className="rounded-lg bg-forrestGreen border border-cultured/20 "
                >
                  <Toolbar editor={editor} content={content} />
                  <EditorContent
                    style={{ whiteSpace: "pre-line" }}
                    editor={editor}
                  />
                </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default Tiptap;

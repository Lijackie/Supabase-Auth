"use client";

import { useAtom, useStore } from "jotai";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import { recipeAtom } from "@/atoms";

const Tiptap = () => {
  const [recipe, setRecipe] = useAtom(recipeAtom, {
    store: useStore(),
  });

  const editor = useEditor({
    extensions: [StarterKit],
    content: recipe,

    onUpdate: ({ editor }) => {
      setRecipe(editor.getText());
    },
  });

  return <EditorContent editor={editor} />;
};

export default Tiptap;

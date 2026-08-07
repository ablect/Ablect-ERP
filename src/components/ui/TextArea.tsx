import type {
  TextareaHTMLAttributes,
} from "react";

export default function TextArea(
  props: TextareaHTMLAttributes<HTMLTextAreaElement>,
) {

  return (

    <textarea

      {...props}

      className="
      min-h-[120px]
      w-full
      rounded-xl
      border
      border-slate-300
      p-3
      outline-none
      focus:border-blue-500
      "

    />

  );

}
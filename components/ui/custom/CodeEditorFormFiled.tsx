"use client";

import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { useFormContext, Controller } from "react-hook-form";
import {
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

interface CodeEditorFormFieldProps {
  name: string;
  label: string;
  placeholder?: string;
}

export function CodeEditorFormField({
  name,
  label,
  placeholder,
}: CodeEditorFormFieldProps) {
  const { control } = useFormContext();

  return (
    <FormItem className="space-y-2">
      <FormLabel>{label}</FormLabel>
      <FormControl>
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <CodeMirror
              value={field.value}
              height="200px"
              width="460px"
              extensions={[javascript()]}
              onChange={(val) => field.onChange(val)}
              placeholder={placeholder}
              basicSetup={{
                lineNumbers: true,
                highlightActiveLine: true,
              }}
            />
          )}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  );
}

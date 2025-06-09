import { Button } from "@/components/ui/button";
import { MultiCombobox } from "@/components/ui/custom/MultiCombobox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { messageTypesOptions } from "@/utils/options";
import React from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface MessageTypeFilterFormProps {
  defaultValues: any;
  onSubmit: (config: any) => void;
  onDeleteNode: () => void;
}

const MessageTypeFilterForm = ({
  defaultValues,
  onSubmit,
  onDeleteNode,
}: MessageTypeFilterFormProps) => {
  const form = useForm({
    defaultValues: defaultValues || {
      messageTypes: [],
    },
  });
  useEffect(() => {
    if (defaultValues) {
      form.reset(defaultValues);
    } else {
      form.reset({
        messageTypes: [],
      });
    }
  }, [defaultValues]);
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="messageTypes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>نام انواع پیام</FormLabel>
              <FormControl>
                <MultiCombobox
                  data={messageTypesOptions}
                  placeholder="انتخاب نوع پیام"
                  searchPlaceholder="جستجو..."
                  dValue={field.value || []}
                  onChange={field.onChange}
                  isMulti={true}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center gap-4">
          <Button type="submit">ذخیره تغییرات</Button>
          <Button variant="destructive" onClick={onDeleteNode}>
            حذف نود
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default MessageTypeFilterForm;

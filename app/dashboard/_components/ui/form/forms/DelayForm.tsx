import React from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface Props {
  defaultValues: any;
  onSubmit: (config: any) => void;
  onDeleteNode: () => void;
}

const DelayForm = ({ defaultValues, onSubmit, onDeleteNode }: Props) => {
  const form = useForm({
    defaultValues: defaultValues || {
      maxPendingMsgs: 1000,
      periodInSeconds: 60,
      periodInSecondsPattern: null,
      useMetadataPeriodInSecondsPatterns: false,
    },
  });

  useEffect(() => {
    if (defaultValues) {
      form.reset(defaultValues);
    } else {
      form.reset({
        maxPendingMsgs: 1000,
        periodInSeconds: 60,
        periodInSecondsPattern: null,
        useMetadataPeriodInSecondsPatterns: false,
      });
    }
  }, [defaultValues]);
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <div className="w-full flex items-center gap-4">
          <FormField
            control={form.control}
            name="maxPendingMsgs"
            render={({ field }) => (
              <FormItem>
                <FormLabel>حداکثر پیام های معلق</FormLabel>
                <FormControl>
                  <Input {...field} type="number" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="periodInSeconds"
            render={({ field }) => (
              <FormItem>
                <FormLabel>دوره در ثانیه</FormLabel>
                <FormControl>
                  <Input {...field} type="number" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

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

export default DelayForm;

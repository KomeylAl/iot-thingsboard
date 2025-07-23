import React from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";

interface Props {
  defaultValues: any;
  onSubmit: (config: any) => void;
  onDeleteNode: () => void;
}

const SendSmsForm = ({ defaultValues, onSubmit, onDeleteNode }: Props) => {
  const form = useForm({
    defaultValues: defaultValues || {
      useSystemSmsSettings: true,
      numbersToTemplate: "${userPhone}",
      smsMessageTemplate: "Device ${deviceName} has high temperature ${temp}",
      smsProviderConfiguration: null,
    },
  });

  useEffect(() => {
    if (defaultValues) {
      form.reset(defaultValues);
    } else {
      form.reset({
        useSystemSmsSettings: true,
        numbersToTemplate: "${userPhone}",
        smsMessageTemplate: "Device ${deviceName} has high temperature ${temp}",
        smsProviderConfiguration: null,
      });
    }
  }, [defaultValues]);
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="numbersToTemplate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>شماره تلفن به الگو</FormLabel>
              <FormControl>
                <Input placeholder="شماره تلفن به الگو" {...field} />
              </FormControl>
              <FormDescription>
                شماره تلفن‌ها را با کاما از هم جدا کنید، برای مقدار فراداده از{" "}
                {"${metadataKey}"} و برای مقدار متن پیام از $[messageKey]
                استفاده کنید.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="smsMessageTemplate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>الگوی پیام</FormLabel>
              <FormControl>
                <Textarea placeholder="الگوی پیام" {...field} />
              </FormControl>
              <FormDescription>
                برای مقدار از فراداده از {"${metadataKey}"} و برای مقدار از متن
                پیام از $[messageKey] استفاده کنید.
              </FormDescription>
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

export default SendSmsForm;

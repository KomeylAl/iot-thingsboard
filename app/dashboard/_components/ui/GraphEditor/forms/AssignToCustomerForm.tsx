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
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

interface Props {
  defaultValues: any;
  onSubmit: (config: any) => void;
  onDeleteNode: () => void;
}

const AssignToCustomerForm = ({
  defaultValues,
  onSubmit,
  onDeleteNode,
}: Props) => {
  const form = useForm({
    defaultValues: defaultValues || {
      createCustomerIfNotExists: false,
      customerNamePattern: "",
    },
  });

  useEffect(() => {
    if (defaultValues) {
      form.reset(defaultValues);
    } else {
      form.reset({
        createCustomerIfNotExists: false,
        customerNamePattern: "",
      });
    }
  }, [defaultValues]);
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="customerNamePattern"
          render={({ field }) => (
            <FormItem>
              <FormLabel>الگوی نام مشتری</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="createCustomerIfNotExists"
          render={({ field }) => (
            <FormItem className="flex items-center gap-3">
              <FormControl>
                <Input
                  type="checkbox"
                  checked={field.value}
                  onChange={field.onChange}
                  className="w-4 h-4"
                />
              </FormControl>
              <FormLabel className="text-sm font-normal">
                افزودن مشتری در صورت عدم وجود
              </FormLabel>
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

export default AssignToCustomerForm;

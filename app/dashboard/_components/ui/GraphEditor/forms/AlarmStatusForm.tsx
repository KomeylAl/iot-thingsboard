import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

type Props = {
  defaultValues?: any;
  onSubmit: (data: any) => void;
  onDeleteNode: () => void;
};

const AlarmStatusForm = ({ defaultValues, onSubmit, onDeleteNode }: Props) => {
  const form = useForm({
    defaultValues: defaultValues || { alarmStatusList: [] },
  });

  console.log(defaultValues);

  useEffect(() => {
    if (defaultValues) {
      form.reset(defaultValues);
    } else {
      form.reset({ alarmStatusList: [] });
    }
  }, [defaultValues]);

  const statusOptions = [
    { label: "تصدیق نشده فعال", value: "ACTIVE_UNACK" },
    { label: "تصدیق شده فعال", value: "ACTIVE_ACK" },
    { label: "تصدیق نشده پاک شده", value: "CLEARED_UNACK" },
    { label: "تصدیق شده پاک شده", value: "CLEARED_ACK" },
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="alarmStatusList"
          render={({ field }) => (
            <FormItem>
              <FormLabel>وضعیت‌های هشدار</FormLabel>
              <div className="flex flex-col gap-2">
                {statusOptions.map((status) => (
                  <label key={status.value} className="flex items-center gap-2">
                    <Input
                      type="checkbox"
                      checked={field.value?.includes(status.value)}
                      onChange={(e) => {
                        const isChecked = e.target.checked;
                        const currentValue = field.value || [];

                        if (isChecked) {
                          field.onChange([...currentValue, status.value]);
                        } else {
                          field.onChange(
                            currentValue.filter(
                              (v: string) => v !== status.value
                            )
                          );
                        }
                      }}
                      className="w-4 h-4"
                    />
                    <span>{status.label}</span>
                  </label>
                ))}
              </div>
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

export default AlarmStatusForm;

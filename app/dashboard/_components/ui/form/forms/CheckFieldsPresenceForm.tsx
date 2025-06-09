import { Button } from "@/components/ui/button";
import { TagInput } from "@/components/ui/custom/TagInput";
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

interface CheckFieldsPresenceprops {
  defaultValues: any;
  onSubmit: (config: any) => void;
  onDeleteNode: () => void;
}

const CheckFieldsPresenceForm = ({
  defaultValues,
  onSubmit,
  onDeleteNode,
}: CheckFieldsPresenceprops) => {
  const form = useForm({
    defaultValues: defaultValues || {
      messageNames: [],
      metadataNames: [],
      checkAllKeys: false,
    },
  });

  useEffect(() => {
    if (defaultValues) {
      form.reset(defaultValues);
    } else {
      form.reset({
        messageNames: [],
        metadataNames: [],
        checkAllKeys: false,
      });
    }
  }, [defaultValues]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="messageNames"
          render={({ field }) => (
            <FormItem>
              <FormLabel>نام فیلدهای پیام</FormLabel>
              <FormControl>
                <TagInput value={field.value || []} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="metadataNames"
          render={({ field }) => (
            <FormItem>
              <FormLabel>نام فیلدهای فراداده</FormLabel>
              <FormControl>
                <TagInput value={field.value || []} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="checkAllKeys"
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
                بررسی کنید که همه فیلدهای مشخص شده وجود داشته باشند
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

export default CheckFieldsPresenceForm;

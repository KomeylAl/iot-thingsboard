import { Button } from "@/components/ui/button";
import { CodeEditorFormField } from "@/components/ui/custom/CodeEditorFormFiled";
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
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import React from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface ClearAlarmFormProps {
  defaultValues: any;
  onSubmit: (config: any) => void;
  onDeleteNode: () => void;
}

const ClearAlarmForm = ({
  defaultValues,
  onSubmit,
  onDeleteNode,
}: ClearAlarmFormProps) => {
  const form = useForm({
    defaultValues: defaultValues || {
      alarmDetailsBuildJs: "",
      scriptLand: "TBEL",
      alarmDetailsBuildTbel: "",
      alarmType: "",
    },
  });

  const scriptLang = form.watch("scriptLang");

  useEffect(() => {
    if (defaultValues) {
      form.reset(defaultValues);
    } else {
      form.reset({
        alarmDetailsBuildJs: "",
        scriptLang: "TBEL",
        alarmDetailsBuildTbel: "",
        alarmType: "",
      });
    }
  }, [defaultValues]);
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="scriptLang"
          render={({ field }) => (
            <FormItem>
              <FormLabel>انتخاب نوع اسکریپت</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex items-center gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="TBEL" id="option-tbel" />
                    <Label htmlFor="option-tbel">TBEL</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="JS" id="option-js" />
                    <Label htmlFor="option-js">JavaScript</Label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {scriptLang === "TBEL" ? (
          <CodeEditorFormField
            label="TBEL Script"
            name="alarmDetailsBuildTbel"
          />
        ) : (
          <CodeEditorFormField label="JS Script" name="alarmDetailsBuildJs" />
        )}

        <FormField
          control={form.control}
          name="alarmType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>نوع هشدار</FormLabel>
              <FormControl>
                <Input placeholder="نوع هشدار" {...field} />
              </FormControl>
              <FormDescription>
                برای مقدار از فراداده از {"${metadataKey}"} و برای مقدار از متن
                پیام از $[messageKey] استفاده کنید
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

export default ClearAlarmForm;

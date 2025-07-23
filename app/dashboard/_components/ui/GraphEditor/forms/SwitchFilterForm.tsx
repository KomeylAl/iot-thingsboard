import { Button } from "@/components/ui/button";
import { CodeEditorFormField } from "@/components/ui/custom/CodeEditorFormFiled";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import React from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface SwitchFilterFormProps {
  defaultValues: any;
  onSubmit: (config: any) => void;
  onDeleteNode: () => void;
}

const SwitchFilterForm = ({
  defaultValues,
  onSubmit,
  onDeleteNode,
}: SwitchFilterFormProps) => {
  const form = useForm({
    defaultValues: defaultValues || {
      jsScript: "",
      scriptLand: "TBEL",
      tbelScript: "",
    },
  });

  const scriptLang = form.watch("scriptLang");

  useEffect(() => {
    if (defaultValues) {
      form.reset(defaultValues);
    } else {
      form.reset({
        jsScript: "",
        scriptLang: "TBEL",
        tbelScript: "",
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
          <CodeEditorFormField label="TBEL Script" name="tbelScript" />
        ) : (
          <CodeEditorFormField label="JS Script" name="jsScript" />
        )}

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

export default SwitchFilterForm;

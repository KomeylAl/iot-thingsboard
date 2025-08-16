import { Button } from "@/components/ui/button";
import { CodeEditorFormField } from "@/components/ui/custom/CodeEditorFormFiled";
import { TagInput } from "@/components/ui/custom/TagInput";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

interface CreateAlarmFormProps {
  defaultValues: any;
  onSubmit: (config: any) => void;
  onDeleteNode: () => void;
}

const CreateAlarmForm = ({
  defaultValues,
  onSubmit,
  onDeleteNode,
}: CreateAlarmFormProps) => {
  const form = useForm({
    defaultValues: defaultValues || {
      useMessageAlarmData: false,
      propagateToTenant: false,
      propagateToOwner: false,
      propagate: false,
      overwriteAlarmDetails: false,
      dynamicSeverity: false,
      alarmDetailsBuildJs: `var details = {};
        if (metadata.prevAlarmDetails) {
            details = JSON.parse(metadata.prevAlarmDetails);
            //remove prevAlarmDetails from metadata
            delete metadata.prevAlarmDetails;
            //now metadata is the same as it comes IN this rule node
        }


        return details;`,
      alarmDetailsBuildTbel: `var details = {};
        if (metadata.prevAlarmDetails != null) {
            details = JSON.parse(metadata.prevAlarmDetails);
            //remove prevAlarmDetails from metadata
            metadata.remove('prevAlarmDetails');
            //now metadata is the same as it comes IN this rule node
        }


        return details;`,
      alarmType: "General Alarm",
      relationTypes: [],
      scriptLang: "TBEL",
      severity: "CRITICAL",
    },
  });

  const scriptLang = form.watch("scriptLang");
  const alarmPattern = form.watch("dynamicSeverity");

  useEffect(() => {
    if (defaultValues) {
      form.reset(defaultValues);
    } else {
      form.reset({
        useMessageAlarmData: false,
        propagateToTenant: false,
        propagateToOwner: false,
        propagate: false,
        overwriteAlarmDetails: false,
        dynamicSeverity: false,
        alarmDetailsBuildJs: `var details = {};
        if (metadata.prevAlarmDetails) {
            details = JSON.parse(metadata.prevAlarmDetails);
            //remove prevAlarmDetails from metadata
            delete metadata.prevAlarmDetails;
            //now metadata is the same as it comes IN this rule node
        }


        return details;`,
        alarmDetailsBuildTbel: `var details = {};
        if (metadata.prevAlarmDetails != null) {
            details = JSON.parse(metadata.prevAlarmDetails);
            //remove prevAlarmDetails from metadata
            metadata.remove('prevAlarmDetails');
            //now metadata is the same as it comes IN this rule node
        }


        return details;`,
        alarmType: "General Alarm",
        relationTypes: [],
        scriptLang: "TBEL",
        severity: "CRITICAL",
      });
    }
  }, [defaultValues]);

  const versions = [
    { label: "بحرانی", value: "CRITICAL" },
    { label: "مهم", value: "MAJOR" },
    { label: "جزئی", value: "MINOR" },
    { label: "اخطار", value: "WARNING" },
    { label: "نامشخص", value: "INDETERMINATE" },
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="useMessageAlarmData"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center gap-3">
                <FormControl>
                  <Input
                    type="checkbox"
                    checked={field.value}
                    onChange={field.onChange}
                    className="w-4 h-4"
                  />
                </FormControl>
                <FormLabel className="text-sm font-normal">
                  استفاده از داد های message alarm
                </FormLabel>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {!form.getValues("useMessageAlarmData") && (
          <div className="space-y-5">
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
              <CodeEditorFormField
                label="JS Script"
                name="alarmDetailsBuildJs"
              />
            )}
          </div>
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
                پیام از $[messageKey] استفاده کنید.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="dynamicSeverity"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center gap-3">
                <FormControl>
                  <Input
                    type="checkbox"
                    checked={field.value}
                    onChange={field.onChange}
                    className="w-4 h-4"
                  />
                </FormControl>
                <FormLabel className="text-sm font-normal">
                  استفاده از الگوی شدت هشدار
                </FormLabel>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {alarmPattern ? (
          <FormField
            control={form.control}
            name="severity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>الگوی نوع هشدار</FormLabel>
                <FormControl>
                  <Input placeholder="الگوی نوع هشدار" {...field} />
                </FormControl>
                <FormDescription>
                  برای مقدار از فراداده، از {"${metadataKey}"} و برای مقدار از
                  متن پیام از $[messageKey] استفاده کنید. شدت هشدار باید سیستمی
                  (بحرانی، مهم و غیره) باشد.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        ) : (
          <FormField
            control={form.control}
            name="severity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>شدت هشدار</FormLabel>
                <FormControl>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="شدت" className="text-right" />
                    </SelectTrigger>
                    <SelectContent>
                      {versions.map((version) => (
                        <SelectItem
                          key={version.value}
                          className="text-right"
                          value={version.value}
                        >
                          {version.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="propagate"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center gap-3">
                <FormControl>
                  <Input
                    type="checkbox"
                    checked={field.value}
                    onChange={field.onChange}
                    className="w-4 h-4"
                  />
                </FormControl>
                <FormLabel className="text-sm font-normal">
                  ارسال هشدار به موجودیت های مرتبط
                </FormLabel>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {form.getValues("propagate") && (
          <FormField
            control={form.control}
            name="relationTypes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>انواع رابطه برای انتشار</FormLabel>
                <FormControl>
                  <TagInput
                    value={field.value || []}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="propagateToOwner"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center gap-3">
                <FormControl>
                  <Input
                    type="checkbox"
                    checked={field.value}
                    onChange={field.onChange}
                    className="w-4 h-4"
                  />
                </FormControl>
                <FormLabel className="text-sm font-normal">
                  ارسال هشدار به مالک نهاد (مشتری یا مستاجر)
                </FormLabel>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="propagateToTenant"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center gap-3">
                <FormControl>
                  <Input
                    type="checkbox"
                    checked={field.value}
                    onChange={field.onChange}
                    className="w-4 h-4"
                  />
                </FormControl>
                <FormLabel className="text-sm font-normal">
                  ارسال هشدار به مستأجر
                </FormLabel>
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

export default CreateAlarmForm;

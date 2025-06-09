import React, { useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  defaultValues: any;
  onSubmit: (config: any) => void;
  onDeleteNode: () => void;
}

const DeleteRelationPresenceForm = ({
  defaultValues,
  onSubmit,
  onDeleteNode,
}: Props) => {
  const form = useForm({
    defaultValues: defaultValues || {
      deleteForSingleEntity: false,
      direction: "",
      entityNamePattern: "",
      entityType: "",
      relationType: "Contains",
    },
  });

  useEffect(() => {
    if (defaultValues) {
      form.reset(defaultValues);
    } else {
      form.reset({
        deleteForSingleEntity: false,
        direction: "",
        entityNamePattern: "",
        entityType: "",
        relationType: "Contains",
      });
    }
  }, [defaultValues]);

  const entities = [
    { label: "دستگاه", value: "DEVICE" },
    { label: "دارایی", value: "ASSET" },
    { label: "نمایش موجودی", value: "ENTTY_VIEW" },
    { label: "کاربر", value: "USER" },
    { label: "مشتری", value: "CUSTOMER" },
    { label: "داشبورد", value: "DASHBOARD" },
    { label: "لبه", value: "EDGE" },
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <div className="w-full flex items-center gap-4">
          <FormField
            control={form.control}
            name="direction"
            render={({ field }) => (
              <FormItem>
                <FormLabel>جهت</FormLabel>
                <FormControl>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="جهت" className="text-right" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem className="text-right" value="FROM">
                        از originator
                      </SelectItem>
                      <SelectItem className="text-right" value="TO">
                        به originator
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="relationType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>نوع ارتباط</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="deleteForSingleEntity"
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
                حذف ارتباط با موجودیت خاص
              </FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />

        {form.getValues("deleteForSingleEntity") && (
          <div className="w-full flex items-center gap-4">
            <FormField
              control={form.control}
              name="entityType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>نوع موجودیت</FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="نوع" className="text-right" />
                      </SelectTrigger>
                      <SelectContent>
                        {entities.map((entity) => (
                          <SelectItem
                            key={entity.value}
                            className="text-right"
                            value={entity.value}
                          >
                            {entity.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="entityNamePattern"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>عنوان موجودیت</FormLabel>
                  <FormControl>
                    <Input placeholder="عنوان موجودیت" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
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

export default DeleteRelationPresenceForm;

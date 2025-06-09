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

const CeateRelationPresenceForm = ({
  defaultValues,
  onSubmit,
  onDeleteNode,
}: Props) => {
  const form = useForm({
    defaultValues: defaultValues || {
      changeOriginatorToRelatedEntity: false,
      createEntityIfNotExists: false,
      removeCurrentRelations: false,
      direction: "",
      entityNamePattern: "",
      entityTypePattern: "",
      entityType: "",
      relationType: "Contains",
    },
  });

  useEffect(() => {
    if (defaultValues) {
      form.reset(defaultValues);
    } else {
      form.reset({
        changeOriginatorToRelatedEntity: false,
        createEntityIfNotExists: false,
        removeCurrentRelations: false,
        direction: "",
        entityNamePattern: "",
        entityTypePattern: "",
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
          <FormField
            control={form.control}
            name="entityTypePattern"
            render={({ field }) => (
              <FormItem>
                <FormLabel>نام پروفایل</FormLabel>
                <FormControl>
                  <Input placeholder="نام پروفایل" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="createEntityIfNotExists"
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
                ایجاد موجودیت در صورت عدم وجود
              </FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="removeCurrentRelations"
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
                حذف ارتباط کنونی
              </FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="changeOriginatorToRelatedEntity"
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
                تغییر مبدأ به موجودیت مرتبط
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

export default CeateRelationPresenceForm;

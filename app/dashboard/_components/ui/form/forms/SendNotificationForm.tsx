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
import { Combobox } from "@/components/ui/custom/Combobox";
import { EntityType } from "@/lib/types";
import axios from "axios";
import toast from "react-hot-toast";
import { MultiCombobox } from "@/components/ui/custom/MultiCombobox";

interface Props {
  defaultValues: any;
  onSubmit: (config: any) => void;
  onDeleteNode: () => void;
}

const SendNotificationForm = ({
  defaultValues,
  onSubmit,
  onDeleteNode,
}: Props) => {
  const form = useForm({
    defaultValues: defaultValues || {
      targets: [],
      templateId: {
        entityType: "NOTIFICATION_TEMPLATE",
        id: "",
      },
    },
  });

  const [recipentList, setRecipentList] = useState<EntityType[]>([]);

  const [templateList, setTemplateList] = useState<EntityType[]>([]);

  useEffect(() => {
    const fetchEntities = async () => {
      try {
        const response = await axios.get(
          `/api/notifications/recipients?page=0&pageSize=100`
        );
        const entities: EntityType[] = response.data.data.map((item: any) => ({
          label: item.name,
          value: item.id.id,
        }));
        setRecipentList(entities);
      } catch (error: any) {
        toast.error(error.message);
      }
    };

    fetchEntities();
  }, []);

  useEffect(() => {
    const fetchEntities = async () => {
      try {
        const response = await axios.get(
          `/api/notifications/templates?page=0&pageSize=100`
        );
        const entities: EntityType[] = response.data.data.map((item: any) => ({
          label: item.name,
          value: item.id.id,
        }));
        setTemplateList(entities);
      } catch (error: any) {
        toast.error(error.message);
      }
    };

    fetchEntities();
  }, []);

  useEffect(() => {
    if (defaultValues) {
      form.reset(defaultValues);
    } else {
      form.reset({
        targets: [],
        templateId: {
          entityType: "NOTIFICATION_TEMPLATE",
          id: "",
        },
      });
    }
  }, [defaultValues]);
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="targets"
          render={({ field }) => (
            <FormItem className="flex flex-col items-start gap-2">
              <FormLabel>گیرندگان</FormLabel>
              <FormControl>
                <MultiCombobox
                  data={recipentList}
                  placeholder="گیرندگان"
                  searchPlaceholder="جستجو..."
                  dValue={field.value || []}
                  onChange={field.onChange}
                  isMulti={true}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="templateId"
          render={({ field }) => (
            <FormItem className="flex flex-col items-start gap-2">
              <FormLabel>قالب ایمیل</FormLabel>
              <FormControl>
                <Combobox
                  data={templateList}
                  placeholder="قالب ایمیل"
                  searchPlaceholder="جستجو..."
                  value={field.value?.id || ""}
                  onChange={(value) =>
                    field.onChange({
                      entityType: "NOTIFICATION_TEMPLATE",
                      id: value,
                    })
                  }
                />
              </FormControl>
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

export default SendNotificationForm;

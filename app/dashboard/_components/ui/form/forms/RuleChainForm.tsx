import { EntityType } from "@/lib/types";
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Combobox } from "@/components/ui/custom/Combobox";

interface Props {
  defaultValues: any;
  onSubmit: (config: any) => void;
  onDeleteNode: () => void;
}

const RuleChainForm = ({ defaultValues, onSubmit, onDeleteNode }: Props) => {
  const form = useForm({
    defaultValues: defaultValues || {
      forwardMsgToDefaultRuleChain: false,
      ruleChainId: "",
    },
  });

  const [entityList, setEnttyList] = useState<EntityType[]>([]);

  useEffect(() => {
    const fetchEntities = async () => {
      try {
        const response = await axios.get(
          `/api/entity?entity=RULE_CHAIN&page=0&pageSize=100`
        );
        const entities: EntityType[] = response.data.data.map((item: any) => ({
          label: item.name,
          value: item.id.id,
        }));
        setEnttyList(entities);
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
        forwardMsgToDefaultRuleChain: false,
        ruleChainId: "",
      });
    }
  }, [defaultValues]);
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="forwardMsgToDefaultRuleChain"
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
                ارسال پیام به زنجیره پیش فرض پیام رسان مبدا
              </FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="ruleChainId"
          render={({ field }) => (
            <FormItem className="flex flex-col items-start gap-3">
              <FormLabel>انتخاب زنجیره قائده</FormLabel>
              <FormControl>
                <Combobox
                  data={entityList}
                  placeholder="انتخاب زنجیره قائده"
                  searchPlaceholder="جستجو..."
                  value={field.value} // ✅ مقدار فعلی
                  onChange={field.onChange} // ✅ بروزرسانی فرم
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

export default RuleChainForm;

"use client";

import { Resolver, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useUpdateProfile } from "@/hooks/useProfiles";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useEffect, useMemo } from "react";
import { transformToFormValues } from "@/utils/convert";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

const entityKeys = [
  "maxDevices",
  "maxDashboards",
  "maxAssets",
  "maxUsers",
  "maxCustomers",
  "maxRuleChains",
] as const;

type EntityKey = (typeof entityKeys)[number];

interface ProfileFormValues {
  name: string;
  description?: string;
  maxDevices?: number;
  maxAssets?: number;
  maxCustomers?: number;
  maxUsers?: number;
  maxDashboards?: number;
  maxRuleChains?: number;
  maxEmails?: number;
  smsEnabled?: boolean;
  maxSms?: number;
  limit1?: number;
  interval1?: number;
  limit2?: number;
  interval2?: number;
  unitPrices?: Record<EntityKey, number>;
  default?: boolean;
}

const schema = yup.object({
  name: yup.string().required("نام الزامی است"),
  description: yup.string().optional(),

  maxDevices: yup.number().optional(),
  maxAssets: yup.number().optional(),
  maxCustomers: yup.number().optional(),
  maxUsers: yup.number().optional(),
  maxDashboards: yup.number().optional(),
  maxRuleChains: yup.number().optional(),
  maxEmails: yup.number().optional().default(0),
  smsEnabled: yup.boolean().optional().default(false),
  maxSms: yup.number().optional().default(0),
  limit1: yup.number().optional().min(1),
  interval1: yup.number().optional().min(1),
  limit2: yup.number().optional().min(1),
  interval2: yup.number().optional().min(1),

  unitPrices: yup.object({
    maxDevices: yup.number().optional().default(0),
    maxAssets: yup.number().optional().default(0),
    maxCustomers: yup.number().optional().default(0),
    maxUsers: yup.number().optional().default(0),
    maxDashboards: yup.number().optional().default(0),
    maxRuleChains: yup.number().optional().default(0),
  }),
  default: yup.bool(),
});

interface EditProfileProps {
  profileData: any;
  onProfileEdited: () => void;
}

const EditProfileForm = ({
  profileData,
  onProfileEdited,
}: EditProfileProps) => {
  const { mutate: updateProfile, isPending } = useUpdateProfile(() => {
    onProfileEdited();
  });

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ProfileFormValues>({
    resolver: yupResolver(schema) as Resolver<ProfileFormValues>,
    defaultValues: {},
  });

  // Watch for all relevant values
  const smsEnabled = watch("smsEnabled");
  const unitPrices =
    (watch("unitPrices") as Record<EntityKey, number>) ??
    ({} as Record<EntityKey, number>);
  const quantities = watch(entityKeys);

  useEffect(() => {
    if (profileData) {
      reset(transformToFormValues(profileData));
    }
  }, [profileData, reset]);

  // Dynamic total price calculation
  const totalPrice = useMemo(() => {
    return entityKeys.reduce((sum, key, idx) => {
      return sum + (quantities[idx] || 0) * (unitPrices?.[key] || 0);
    }, 0);
  }, [quantities, unitPrices]);

  const onSubmit = (data: ProfileFormValues) => {
    updateProfile({
      ...data,
      set_id: profileData.id,
    });
  };

  return (
    <div className="flex flex-col items-start gap-8">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-3 w-full"
      >
        <Input {...register("name")} placeholder="عنوان پروفایل*" />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}

        <Accordion type="single" collapsible>
          <AccordionItem value="item1">
            <AccordionTrigger>کانفیگ پروفایل</AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col gap-3">
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-3">
                  <p className="font-semibold">موجودیت‌ها + قیمت گذاری</p>
                  <div className="mt-3 grid grid-cols-2 gap-3">
                    {entityKeys.map((key) => (
                      <div key={key} className="flex flex-col gap-1">
                        <Input
                          {...register(key)}
                          type="number"
                          placeholder={`تعداد ${key}`}
                        />
                        <Input
                          {...register(`unitPrices.${key}` as const)}
                          type="number"
                          placeholder={`قیمت هر ${key}`}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 p-3 border-t text-right">
                    <p className="font-semibold">
                      قیمت کل پروفایل: {totalPrice?.toLocaleString() ?? 0} تومان
                    </p>
                  </div>
                </div>

                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-3">
                  <p>حداکثر تعداد پیام</p>
                  <div className="mt-3 grid grid-cols-2 gap-3">
                    <Input
                      {...register("limit1")}
                      type="number"
                      placeholder="حداکثر پیام در بازه اول*"
                    />
                    <Input
                      {...register("interval1")}
                      type="number"
                      placeholder="زمان بازه اول (ثانیه)*"
                    />
                    <Input
                      {...register("limit2")}
                      type="number"
                      placeholder="حداکثر پیام در بازه دوم*"
                    />
                    <Input
                      {...register("interval2")}
                      type="number"
                      placeholder="زمان بازه دوم (ثانیه)*"
                    />
                  </div>
                </div>

                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-3">
                  <p>هشدارها و اعلانات</p>
                  <label className="flex items-center gap-2 mt-3">
                    <input {...register("smsEnabled")} type="checkbox" />
                    فعال سازی پیامک
                  </label>
                  <div className="mt-3 grid grid-cols-2 gap-3">
                    {smsEnabled && (
                      <Input
                        {...register("maxSms")}
                        type="number"
                        placeholder="حداکثر تعداد پیامک*"
                      />
                    )}
                    <Input
                      {...register("maxEmails")}
                      type="number"
                      placeholder="حداکثر تعداد ایمیل*"
                    />
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Textarea {...register("description")} placeholder="توضیحات" />

        <button
          type="submit"
          disabled={isPending || isSubmitting}
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          {isPending || isSubmitting ? "⏳ در حال ویرایش..." : "ویرایش پروفایل"}
        </button>
      </form>
    </div>
  );
};

export default EditProfileForm;

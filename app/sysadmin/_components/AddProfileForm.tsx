"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useStoreProfile } from "@/hooks/useProfiles";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useState } from "react";

const schema = yup.object({
  name: yup.string().required("نام الزامی است"),
  description: yup.string().optional(),

  type: yup.string().default("DEFAULT"),
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

  default: yup.bool(),
});

interface AddProfileProps {
  onProfileAdded: () => void;
}

const AddProfileForm = ({ onProfileAdded }: AddProfileProps) => {
  const { mutate: addProfile, isPending } = useStoreProfile(() => {
    onProfileAdded();
  });

  const [isSmsShow, setIsSmsShow] = useState(false);
  const toggleSmsShowe = () => setIsSmsShow(!isSmsShow);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: any) => {
    addProfile(data);
  };

  return (
    <div className="flex flex-col items-start gap-8 max-h-screen overflow-auto">
      <h1 className="font-bold text-xl">افزودن پروفایل سازمان</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-3 w-72 md:w-96"
      >
        <input
          {...register("name")}
          className="bg-gray-100 p-3 w-full rounded-lg border border-gray-200"
          placeholder="عنوان پروفایل*"
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}

        <Accordion type="single" collapsible>
          <AccordionItem value="item1">
            <AccordionTrigger>کانفیگ پروفایل</AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col gap-3">
                <div className="border border-gray-200 rounded-lg p-3">
                  <p>موجودیت ها (از 0 تا بینهایت)</p>
                  <div className="mt-3 grid grid-cols-2 gap-3">
                    <input
                      {...register("maxDevices")}
                      type="number"
                      className="bg-gray-100 p-3 w-full rounded-lg border border-gray-200"
                      placeholder="حداکثر دستگاه*"
                    />
                    <input
                      {...register("maxDashboards")}
                      type="number"
                      className="bg-gray-100 p-3 w-full rounded-lg border border-gray-200"
                      placeholder="حداکثر داشبورد*"
                    />
                    <input
                      {...register("maxAssets")}
                      type="number"
                      className="bg-gray-100 p-3 w-full rounded-lg border border-gray-200"
                      placeholder="حداکثر دارایی*"
                    />
                    <input
                      {...register("maxUsers")}
                      type="number"
                      className="bg-gray-100 p-3 w-full rounded-lg border border-gray-200"
                      placeholder="حداکثر کاربر*"
                    />
                    <input
                      {...register("maxCustomers")}
                      type="number"
                      className="bg-gray-100 p-3 w-full rounded-lg border border-gray-200"
                      placeholder="حداکثر مشتری*"
                    />
                    <input
                      {...register("maxRuleChains")}
                      type="number"
                      className="bg-gray-100 p-3 w-full rounded-lg border border-gray-200"
                      placeholder="حداکثر زنجیره قواعد*"
                    />
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-3">
                  <p>حداکثر تعداد پیام (از 0 تا بینهایت)</p>
                  <div className="mt-3 grid grid-cols-2 gap-3">
                    <input
                      {...register("limit1")}
                      type="number"
                      className="bg-gray-100 p-3 w-full rounded-lg border border-gray-200"
                      placeholder="حداکثر پیام در بازه اول*"
                    />
                    <input
                      {...register("interval1")}
                      type="number"
                      className="bg-gray-100 p-3 w-full rounded-lg border border-gray-200"
                      placeholder="زمان بازه اول (ثانیه)*"
                    />
                    <input
                      {...register("limit2")}
                      type="number"
                      className="bg-gray-100 p-3 w-full rounded-lg border border-gray-200"
                      placeholder="حداکثر پیام در بازه دوم*"
                    />
                    <input
                      {...register("interval2")}
                      type="number"
                      className="bg-gray-100 p-3 w-full rounded-lg border border-gray-200"
                      placeholder="زمان بازه دوم (ثانیه)*"
                    />
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-3">
                  <p>هشدار ها و اعلانات (از 0 تا بینهایت)</p>
                  <label className="flex items-center gap-2 mt-3">
                    <input
                      {...register("smsEnabled")}
                      type="checkbox"
                      onClick={toggleSmsShowe}
                    />
                    فعال سازی پیامک
                  </label>
                  <div className="mt-3 grid grid-cols-2 gap-3">
                    <input
                      {...register("maxSms")}
                      type="number"
                      className={`bg-gray-100 p-3 w-full rounded-lg border border-gray-200 ${
                        isSmsShow ? "block" : "hidden"
                      }`}
                      placeholder="حداکثر تعداد پیامک*"
                    />
                    <input
                      {...register("maxEmails")}
                      type="number"
                      className="bg-gray-100 p-3 w-full rounded-lg border border-gray-200"
                      placeholder="حداکثر تعداد ایمیل*"
                    />
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <textarea
          {...register("description")}
          className="bg-gray-100 p-3 w-full rounded-lg border border-gray-200"
          placeholder="توضیحات"
        />

        <button
          type="submit"
          disabled={isPending || isSubmitting}
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          {isPending || isSubmitting ? "⏳ در حال افزودن..." : "افزودن پروفایل"}
        </button>
      </form>
    </div>
  );
};

export default AddProfileForm;

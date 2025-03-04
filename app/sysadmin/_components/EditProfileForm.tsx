"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useUpdateProfile } from "@/hooks/useProfiles";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useEffect, useState } from "react";
import { transformToFormValues } from "@/utils/convert";

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
  limit1: yup.number().required("تعداد پیام در بازه اول الزامی است").min(1),
  interval1: yup.number().required("زمان بازه اول الزامی است").min(1),
  limit2: yup.number().required("تعداد پیام در بازه دوم الزامی است").min(1),
  interval2: yup.number().required("زمان بازه دوم الزامی است").min(1),

  default: yup.bool(),
});

interface EditProfileProps {
  profileData: any;
  onProfileEdited: () => void;
}

const EditProfileForm = ({ profileData, onProfileEdited }: EditProfileProps) => {
  const { mutate: upfateProfile, isPending } = useUpdateProfile(() => {
    onProfileEdited();
  });

  const [isSmsShow, setIsSmsShow] = useState(false);
  const toggleSmsShowe = () => setIsSmsShow(!isSmsShow);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {},
  });

  useEffect(() => {
   if(profileData) {
      reset(transformToFormValues(profileData));
   }
  }, [profileData, reset])

  const onSubmit = (data: any) => {
   const formattedData = {
      ...data,
      set_id: profileData.id.id,
   }
    console.log(data);
    upfateProfile(formattedData);
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
          {isPending || isSubmitting ? "⏳ در حال ویرایش..." : "ویرایش سازمان"}
        </button>
      </form>
    </div>
  );
};

export default EditProfileForm;

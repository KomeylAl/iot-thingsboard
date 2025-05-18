import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import ReactSelect from "react-select";
import { useQueues } from "@/hooks/useQueues";
import { useRuleChains } from "@/hooks/useRuleChains";
import { yupResolver } from "@hookform/resolvers/yup";
import { useUpdateDevicesProfile } from "@/hooks/useProfiles";

interface EditDeviceProfileFormProps {
  profileData: any;
  onProfileEditted: () => void;
}

const schema = yup.object({
  name: yup.string().required("نام الزامی است"),
  description: yup.string().optional(),
  defaultQueueName: yup.object().optional(),
  type: yup.string().optional().default("DEFAULT"),
  defaultRuleChainId: yup.object({
    id: yup.string().optional(),
    entityType: yup.string().optional().default("RULE_CHAIN"),
  }),
});

const EditDeviceProfileForm = ({
  profileData,
  onProfileEditted,
}: EditDeviceProfileFormProps) => {
  const { data, isLoading, error } = useRuleChains(100, 0);
  const {
    data: queues,
    isLoading: queuesLoading,
    error: queuesError,
  } = useQueues(100, 0);

  const { mutate: updateProfile, isPending } = useUpdateDevicesProfile(() =>
    onProfileEditted()
  );

  const ruleChainOptions =
    data?.data.map((profile: any) => ({
      value: profile.id.id,
      label: profile.name,
    })) || [];

  const queuesOptions =
    queues?.data.map((profile: any) => ({
      value: profile.id.id,
      label: profile.name,
    })) || [];

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {},
  });

  useEffect(() => {
    if (profileData) {
      reset(profileData);
    }
  }, [profileData, reset]);

  const onSubmit = (data: any) => {
    const formattedData = {
      ...data,
      set_id: profileData.id.id,
      defaultQueueName: data.defaultQueueName.label ?? "",
      defaultRuleChainId: data.defaultRuleChainId.value
        ? data.defaultRuleChainId.value
        : ruleChainOptions[0].value,
    };
    updateProfile(formattedData);
  };

  return (
    <div className="flex flex-col items-start gap-8 w-96 overflow-hidden">
      <h1 className="font-bold text-xl">ویرایش پروفایل دستگاه</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-3 w-72 md:w-96"
      >
        <input
          {...register("name")}
          className="bg-gray-100 p-3 w-full rounded-lg border border-gray-200"
          placeholder="نام*"
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}

        <p className="text-sm">انتخاب زنجیره قائده پیش فرض</p>
        {!isLoading && (
          <Controller
            name="defaultRuleChainId"
            control={control}
            render={({ field }) => (
              <ReactSelect
                {...field}
                className=""
                placeholder="زنجیره قائده"
                options={ruleChainOptions}
                value={
                  ruleChainOptions.find(
                    (option: any) => option.value === field.value?.id
                  )
                }
                defaultValue={  
                  ruleChainOptions.find(
                    (option: any) => option.value === field.value?.id
                  ) || null
                }
              />
            )}
          />
        )}

        <input
          {...register("type")}
          className="bg-gray-100 p-3 w-full rounded-lg border border-gray-200"
          placeholder="نوع"
        />

        <p className="text-sm">انتخاب صف پیش فرض</p>
        {!queuesLoading && (
          <Controller
            name="defaultQueueName"
            control={control}
            render={({ field }) => (
              <ReactSelect
                {...field}
                className=""
                placeholder="صف"
                options={queuesOptions}
                value={
                  queuesOptions.find(
                    (option: any) => option.value === field.value
                  )
                }
                defaultValue={  
                  queuesOptions.find(
                    (option: any) => option.value === field.value
                  ) || null
                }
              />
            )}
          />
        )}

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
          {isPending || isSubmitting ? "⏳ در حال ویرایش..." : "ویرایش پروفایل"}
        </button>
      </form>
    </div>
  );
};

export default EditDeviceProfileForm;

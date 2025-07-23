"use client";

import { useRuleChains } from "@/hooks/useRuleChains";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import ReactSelect from "react-select";
import { useQueues } from "@/hooks/useQueues";
import { useStoreDevicesProfile } from "@/hooks/useProfiles";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface AddDeviceProfileFormProps {
  onProfileAdded: () => void;
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

const AddDeviceProfileForm = ({
  onProfileAdded,
}: AddDeviceProfileFormProps) => {
  const { data, isLoading } = useRuleChains(0, 100);
  const { data: queues, isLoading: queuesLoading } = useQueues(100, 0);

  const { mutate: addDeviceProfile, isPending } = useStoreDevicesProfile(() =>
    onProfileAdded()
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
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  console.log(errors);

  const onSubmit = (data: any) => {
    const formattedData = {
      ...data,
      defaultQueueName: data.defaultQueueName.label ?? "",
      defaultRuleChainId: data.defaultRuleChainId.value
        ? data.defaultRuleChainId.value
        : ruleChainOptions[0].value,
    };
    addDeviceProfile(formattedData);
  };

  return (
    <div className="flex flex-col items-start gap-8 w-96 overflow-hidden">
      <h1 className="font-bold text-xl">افزودن پروفایل دستگاه</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-3 w-72 md:w-96"
      >
        <Input {...register("name")} placeholder="نام*" />
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
                getOptionLabel={(option) => option.label}
                getOptionValue={(option) => option.value}
                defaultValue={
                  ruleChainOptions.length > 0 ? ruleChainOptions[0] : null
                }
              />
            )}
          />
        )}

        <Input {...register("type")} placeholder="نوع" />

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
                getOptionLabel={(option) => option.label}
                getOptionValue={(option) => option.value}
                defaultValue={
                  queuesOptions.length > 0 ? queuesOptions[0] : null
                }
              />
            )}
          />
        )}

        <Textarea {...register("description")} placeholder="توضیحات" />

        <Button type="submit" disabled={isPending || isSubmitting}>
          {isPending || isSubmitting ? "⏳ در حال افزودن..." : "افزودن پروفایل"}
        </Button>
      </form>
    </div>
  );
};

export default AddDeviceProfileForm;

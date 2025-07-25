"use client";

import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ReactSelect from "react-select";
import { useEffect, useState } from "react";
import { useUpdateRuleChain } from "@/hooks/useRuleChains";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const schema = yup.object({
  name: yup.string().required("نام الزامی است"),
  debugMode: yup.boolean().optional(),
  additionalInfo: yup.object({
    description: yup.string().optional(),
  }),
});

interface EditRuleChainProps {
  ruleChainData: any;
  onRuleChainUpdated: () => void;
}

const EditRuleChainForm = ({
  ruleChainData,
  onRuleChainUpdated,
}: EditRuleChainProps) => {
  const { mutate: updateRuleChain, isPending } = useUpdateRuleChain(() => {
    onRuleChainUpdated();
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {},
  });

  const [isDebudCheked, setIsDebudCheked] = useState(false);
  const toggleDebugMode = () => setIsDebudCheked(!isDebudCheked);

  useEffect(() => {
    if (ruleChainData) {
      reset(ruleChainData);
    }
  }, [ruleChainData, reset]);

  const onSubmit = (data: any) => {
    const formattedData = {
      ...data,
      set_id: ruleChainData.id.id,
    };
    updateRuleChain(formattedData);
  };

  return (
    <div className="flex flex-col items-start gap-8">
      <h1 className="font-bold text-xl">افزودن زنجیره</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-3 w-72 md:w-96"
      >
        <Input
          {...register("name")}
          className="bg-gray-100 p-3 w-full rounded-lg border border-gray-200"
          placeholder="نام*"
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}

        <label className="flex items-center gap-2 mt-3">
          <Input
            {...register("debugMode")}
            type="checkbox"
            onClick={toggleDebugMode}
          />
          حالت اشکال زدایی
        </label>

        <Textarea
          {...register("additionalInfo.description")}
          className="bg-gray-100 p-3 w-full rounded-lg border border-gray-200"
          placeholder="توضیحات"
        />

        <Button
          type="submit"
          disabled={isPending || isSubmitting}
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          {isPending || isSubmitting ? "در حال ویرایش..." : "ویرایش زنجیره"}
        </Button>
      </form>
    </div>
  );
};

export default EditRuleChainForm;

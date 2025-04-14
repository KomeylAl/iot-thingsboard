"use client";

import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";

const schema = yup.object({
  name: yup.string().required("نام الزامی است"),
  debugMode: yup.boolean().optional(),
  additionalInfo: yup.object({
    description: yup.string().optional(),
  }),
});

interface AddRuleChainProps {
  onRuleChainAdded: () => void;
}

const AddRuleChainForm = ({ onRuleChainAdded }: AddRuleChainProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [isDebudCheked, setIsDebudCheked] = useState(false);
  const toggleDebugMode = () => setIsDebudCheked(!isDebudCheked);

  const { mutate: addRuleChain, isPending } = useMutation({
    mutationFn: async (ruleChainData) => {
      const res = await axios.post("/api/rule-chains", ruleChainData);
      return res.data;
    },
    onSuccess: () => {
      reset();
      toast.success("زنجیره جدید با موفقیت اضافه شد");
      onRuleChainAdded();
    },
    onError: (error) => {
    },
  });

  const onSubmit = (data: any) => {
    addRuleChain(data);
  };

  return (
    <div className="flex flex-col items-start gap-8">
      <h1 className="font-bold text-xl">افزودن زنجیره</h1>
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

        <label className="flex items-center gap-2 mt-3">
          <input
            {...register("debugMode")}
            type="checkbox"
            onClick={toggleDebugMode}
          />
          حالت اشکال زدایی
        </label>

        <textarea
          {...register("additionalInfo.description")}
          className="bg-gray-100 p-3 w-full rounded-lg border border-gray-200"
          placeholder="توضیحات"
        />

        <button
          type="submit"
          disabled={isPending || isSubmitting}
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          {isPending || isSubmitting ? "⏳ در حال افزودن..." : "افزودن زنجیره"}
        </button>
      </form>
    </div>
  );
};

export default AddRuleChainForm;

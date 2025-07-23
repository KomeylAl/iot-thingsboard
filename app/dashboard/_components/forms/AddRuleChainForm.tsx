"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useStoreRuleChain } from "@/hooks/useRuleChains";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

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
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { mutate: addRuleChain, isPending } =
    useStoreRuleChain(onRuleChainAdded);

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
        <Input {...register("name")} placeholder="نام*" />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}

        <label className="flex items-center gap-2 mt-3">
          <Checkbox
            {...register("debugMode", { setValueAs: (v) => v === true })}
          />
          حالت اشکال زدایی
        </label>
        {errors.debugMode && (
          <p className="text-red-500 text-sm">{errors.debugMode.message}</p>
        )}

        <Textarea
          {...register("additionalInfo.description")}
          placeholder="توضیحات"
        />

        <Button type="submit" disabled={isPending}>
          {isPending ? "⏳ در حال افزودن..." : "افزودن زنجیره"}
        </Button>
      </form>
    </div>
  );
};

export default AddRuleChainForm;

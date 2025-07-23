"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useStoreAssetsProfile } from "@/hooks/useProfiles";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object({
  name: yup.string().required("نام الزامی است"),
  description: yup.string().optional(),
});

interface AddAssetProfileProps {
  onProfileAdded: () => void;
}

const AddAssetProfileForm = ({ onProfileAdded }: AddAssetProfileProps) => {
  const { mutate: addProfile, isPending } = useStoreAssetsProfile(() => {
    onProfileAdded();
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: any) => {
    addProfile(data);
  };

  return (
    <div className="flex flex-col items-start gap-8">
      <h1 className="font-bold text-xl">افزودن پروفایل</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-3 w-72 md:w-96"
      >
        <Input {...register("name")} placeholder="نام*" />
        {errors.name && (
          <p className="text-red-500 text-sm">
            {errors.name.message as string}
          </p>
        )}

        <Textarea {...register("description")} placeholder="توضیحات" />

        <Button type="submit" disabled={isPending || isSubmitting}>
          {isPending || isSubmitting ? "⏳ در حال افزودن..." : "افزودن پروفایل"}
        </Button>
      </form>
    </div>
  );
};

export default AddAssetProfileForm;

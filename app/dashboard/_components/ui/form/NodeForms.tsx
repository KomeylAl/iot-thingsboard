// ادامه فرم‌ها برای نودهای باقی‌مانده

// TbCreateAlarmNodeForm.tsx
"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export type TbCreateAlarmNodeConfig = {
  alarmType: string;
  severity: string;
};

type TbCreateAlarmNodeFormProps = {
  defaultValues?: TbCreateAlarmNodeConfig;
  onSubmit: (data: TbCreateAlarmNodeConfig) => void;
};

export function TbCreateAlarmNodeForm({
  defaultValues,
  onSubmit,
}: TbCreateAlarmNodeFormProps) {
  const { register, handleSubmit } = useForm<TbCreateAlarmNodeConfig>({
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label>Alarm Type</Label>
        <Input {...register("alarmType")} placeholder="e.g. HighTemperature" />
      </div>
      <div>
        <Label>Severity</Label>
        <Input {...register("severity")} placeholder="e.g. CRITICAL" />
      </div>
      <Button type="submit">Save</Button>
    </form>
  );
}

export type TbSendSmsNodeConfig = {
  phoneNumberPattern: string;
  message: string;
};

type TbSendSmsNodeFormProps = {
  defaultValues?: TbSendSmsNodeConfig;
  onSubmit: (data: TbSendSmsNodeConfig) => void;
};

export function TbSendSmsNodeForm({
  defaultValues,
  onSubmit,
}: TbSendSmsNodeFormProps) {
  const { register, handleSubmit } = useForm<TbSendSmsNodeConfig>({
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label>Phone Number Pattern</Label>
        <Input
          {...register("phoneNumberPattern")}
          placeholder="e.g. ${phone}"
        />
      </div>
      <div>
        <Label>Message</Label>
        <Input {...register("message")} placeholder="Enter SMS text..." />
      </div>
      <Button type="submit">Save</Button>
    </form>
  );
}

// TbNotificationNodeForm.tsx

export type TbNotificationNodeConfig = {
  templateName: string;
  userFilter: string;
};

type TbNotificationNodeFormProps = {
  defaultValues?: TbNotificationNodeConfig;
  onSubmit: (data: TbNotificationNodeConfig) => void;
};

export function TbNotificationNodeForm({
  defaultValues,
  onSubmit,
}: TbNotificationNodeFormProps) {
  const { register, handleSubmit } = useForm<TbNotificationNodeConfig>({
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label>Template Name</Label>
        <Input {...register("templateName")} placeholder="e.g. alertTemplate" />
      </div>
      <div>
        <Label>User Filter</Label>
        <Input {...register("userFilter")} placeholder="e.g. tenant_admin" />
      </div>
      <Button type="submit">Save</Button>
    </form>
  );
}

// TbClearAlarmNodeForm.tsx

export type TbClearAlarmNodeConfig = {
  alarmType: string;
};

type TbClearAlarmNodeFormProps = {
  defaultValues?: TbClearAlarmNodeConfig;
  onSubmit: (data: TbClearAlarmNodeConfig) => void;
};

export function TbClearAlarmNodeForm({
  defaultValues,
  onSubmit,
}: TbClearAlarmNodeFormProps) {
  const { register, handleSubmit } = useForm<TbClearAlarmNodeConfig>({
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label>Alarm Type</Label>
        <Input {...register("alarmType")} placeholder="e.g. HighTemperature" />
      </div>
      <Button type="submit">Save</Button>
    </form>
  );
}

// TODO: اضافه‌کردن دیالوگ تنظیمات فرم برای نودها هنگام افزودن یا کلیک بر روی آن‌ها

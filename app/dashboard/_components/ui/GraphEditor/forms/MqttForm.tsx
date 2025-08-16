import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

interface MqttFormProps {
  defaultValues: any;
  onSubmit: (config: any) => void;
  onDeleteNode: () => void;
}

const MqttForm = ({ defaultValues, onSubmit, onDeleteNode }: MqttFormProps) => {
  const form = useForm({
    defaultValues: defaultValues || {
      appendClientIdSuffix: false,
      cleanSession: false,
      parseToPlainText: false,
      retainedMessage: false,
      ssl: false,
      clientId: "",
      host: "",
      protocolVersion: "MQTT_3_1_1",
      topicPattern: "my-topic",
      connectTimeoutSec: 10,
      port: 1883,
      credentials: {
        type: "anonymous",
      },
    },
  });

  useEffect(() => {
    if (defaultValues) {
      form.reset(defaultValues);
    } else {
      form.reset({
        appendClientIdSuffix: false,
        cleanSession: false,
        parseToPlainText: false,
        retainedMessage: false,
        ssl: false,
        clientId: "",
        host: "",
        protocolVersion: "MQTT_3_1_1",
        topicPattern: "my-topic",
        connectTimeoutSec: 10,
        port: 1883,
        credentials: {
          type: "anonymous",
        },
      });
    }
  }, [defaultValues]);

  const versions = [
    { label: "MQTT 3.1.1", value: "MQTT_3_1_1" },
    { label: "MQTT 3.1", value: "MQTT_3_1" },
    { label: "MQTT 5.0", value: "MQTT_5_0" },
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="topicPattern"
          render={({ field }) => (
            <FormItem>
              <FormLabel>الگوی تاپیک</FormLabel>
              <FormControl>
                <Input placeholder="الگوی تاپیک" {...field} />
              </FormControl>
              <FormDescription>
                برای مقدار از فراداده از {"${metadataKey}"} و برای مقدار از متن
                پیام از $[messageKey] استفاده کنید.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="w-full flex items-center gap-4">
          <FormField
            control={form.control}
            name="host"
            render={({ field }) => (
              <FormItem>
                <FormLabel>هاست</FormLabel>
                <FormControl>
                  <Input placeholder="هاست" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="port"
            render={({ field }) => (
              <FormItem>
                <FormLabel>پورت</FormLabel>
                <FormControl>
                  <Input placeholder="پورت" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="connectTimeoutSec"
            render={({ field }) => (
              <FormItem>
                <FormLabel>تایم اوت اتصال</FormLabel>
                <FormControl>
                  <Input placeholder="تایم اوت اتصال" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="clientId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ID کلاینت</FormLabel>
              <FormControl>
                <Input placeholder="ID کلاینت" {...field} />
              </FormControl>
              <FormDescription>
                اختیاری. برای شناسه کلاینت تولید شده خودکار، خالی بگذارید. هنگام
                مشخص کردن شناسه کلاینت دقت کنید. اکثر کارگزاران MQTT اجازه اتصال
                چندگانه با شناسه کلاینت یکسان را نمی‌دهند. برای اتصال به چنین
                کارگزارانی، شناسه کلاینت mqtt شما باید منحصر به فرد باشد. هنگامی
                که پلتفرم در حالت میکروسرویس اجرا می‌شود، کپی گره قاعده در هر
                میکروسرویس راه‌اندازی می‌شود. این امر به طور خودکار منجر به
                چندین کلاینت mqtt با شناسه یکسان می‌شود و ممکن است باعث خرابی
                گره قاعده شود. برای جلوگیری از چنین خرابی‌هایی، گزینه "افزودن
                شناسه سرویس به عنوان پسوند به شناسه کلاینت" را در زیر فعال کنید.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="appendClientIdSuffix"
          render={({ field }) => (
            <FormItem className="">
              <div className="flex items-center gap-3">
                <FormControl>
                  <Input
                    type="checkbox"
                    checked={field.value}
                    onChange={field.onChange}
                    className="w-4 h-4"
                  />
                </FormControl>
                <FormLabel className="text-sm font-normal">
                  افزودن ID سرویس به عنوان پسوند به ID کلاینت
                </FormLabel>
              </div>
              <FormDescription>
                اختیاری. زمانی اعمال می‌شود که "شناسه کلاینت" به صراحت مشخص شده
                باشد. در صورت انتخاب، شناسه سرویس به عنوان پسوند به شناسه کلاینت
                اضافه می‌شود. به جلوگیری از خرابی‌ها هنگام اجرای پلتفرم در حالت
                میکروسرویس‌ها کمک می‌کند.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="parseToPlainText"
          render={({ field }) => (
            <FormItem className="">
              <div className="flex items-center gap-3">
                <FormControl>
                  <Input
                    type="checkbox"
                    checked={field.value}
                    onChange={field.onChange}
                    className="w-4 h-4"
                  />
                </FormControl>
                <FormLabel className="text-sm font-normal">
                  تجزیه به متن ساده
                </FormLabel>
              </div>
              <FormDescription>
                در صورت انتخاب، متن پیام بدنه درخواست از رشته JSON به متن ساده
                تبدیل می‌شود، مثلاً msg = "Hello,\t"world"" به Hello, "world"
                تجزیه می‌شود.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="protocolVersion"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ورژن پروتکل</FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="نوع" className="text-right" />
                  </SelectTrigger>
                  <SelectContent>
                    {versions.map((version) => (
                      <SelectItem
                        key={version.value}
                        className="text-right"
                        value={version.value}
                      >
                        {version.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="cleanSession"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center gap-3">
                <FormControl>
                  <Input
                    type="checkbox"
                    checked={field.value}
                    onChange={field.onChange}
                    className="w-4 h-4"
                  />
                </FormControl>
                <FormLabel className="text-sm font-normal">
                  Clean session
                </FormLabel>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="retainedMessage"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center gap-3">
                <FormControl>
                  <Input
                    type="checkbox"
                    checked={field.value}
                    onChange={field.onChange}
                    className="w-4 h-4"
                  />
                </FormControl>
                <FormLabel className="text-sm font-normal">Retained</FormLabel>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="ssl"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center gap-3">
                <FormControl>
                  <Input
                    type="checkbox"
                    checked={field.value}
                    onChange={field.onChange}
                    className="w-4 h-4"
                  />
                </FormControl>
                <FormLabel className="text-sm font-normal">
                  Enable SSL
                </FormLabel>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center gap-4">
          <Button type="submit">ذخیره تغییرات</Button>
          <Button variant="destructive" onClick={onDeleteNode}>
            حذف نود
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default MqttForm;

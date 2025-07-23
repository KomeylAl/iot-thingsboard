import { Button } from "@/components/ui/button";
import React from "react";

interface Props {
  onDeleteNode: () => void;
}

const SendEmailForm = ({ onDeleteNode }: Props) => {
  return (
    <div>
      این نود از تنظیمات پیش فرض TB تبعیت میکند. برای تنظیمات دلخواه SMTP باید
      ابتدا از طریق داشبورد اصلی وارد شده، تنظیمات SMTP دلخوان خود را ایجاد کرده
      و سپس نود Send Email را تنظیم کنید.
      <Button variant="destructive" className="mt-5" onClick={onDeleteNode}>
        حذف نود
      </Button>
    </div>
  );
};

export default SendEmailForm;

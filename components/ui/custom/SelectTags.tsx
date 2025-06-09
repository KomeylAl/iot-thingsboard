import { useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

type Option = {
  label: string;
  value: string;
};

type Props = {
  options: Option[];
  value: string[]; // حتی در حالت single هم آرایه‌ای نگه می‌داریم برای سادگی
  onChange: (value: string[]) => void;
  placeholder?: string;
  multiple?: boolean;
};

export default function MultiSelectSearchable({
  options,
  value,
  onChange,
  placeholder = "انتخاب کنید...",
  multiple = false,
}: Props) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(search.toLowerCase())
  );

  const toggleValue = (val: string) => {
    if (multiple) {
      if (value.includes(val)) {
        onChange(value.filter((v) => v !== val));
      } else {
        onChange([...value, val]);
      }
    } else {
      onChange([val]);
      setOpen(false); // در حالت تکی، popover رو ببند
    }
  };

  const removeValue = (val: string) => {
    onChange(value.filter((v) => v !== val));
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div
          className="w-full min-h-10 justify-center flex-wrap items-center overflow-y-auto max-h-[100px] px-2 gap-1 border border-gray-200 rounded-lg "
        >
          {value.length === 0 ? (
            <span className="text-muted-foreground">{placeholder}</span>
          ) : multiple ? (
            <div className="flex flex-wrap gap-1">
              {options
                .filter((opt) => value.includes(opt.value))
                .map((opt) => (
                  <Badge
                    key={opt.value}
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    {opt.label}
                    <X
                      className="h-3 w-3 cursor-pointer z-[500]"
                      onMouseDown={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                      }}
                      onClick={() => removeValue(opt.value)}
                    />
                  </Badge>
                ))}
            </div>
          ) : (
            <span>
              {options.find((opt) => opt.value === value[0])?.label ??
                placeholder}
            </span>
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-full p-2">
        <Input
          placeholder="جستجو..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-2"
        />
        <div className="max-h-40 overflow-y-auto space-y-1">
          {filteredOptions.length === 0 ? (
            <div className="text-sm text-muted-foreground px-2 py-1">
              گزینه‌ای یافت نشد.
            </div>
          ) : (
            filteredOptions.map((option) => {
              const selected = value.includes(option.value);
              return (
                <div
                  key={option.value}
                  onClick={() => toggleValue(option.value)}
                  className={cn(
                    "cursor-pointer px-2 py-1 rounded-md text-sm flex items-center",
                    selected
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted"
                  )}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selected ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {option.label}
                </div>
              );
            })
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}

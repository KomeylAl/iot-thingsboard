import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

type TagInputProps = {
  value: string[];
  onChange: (value: string[]) => void;
};

export function TagInput({ value, onChange }: TagInputProps) {
  const [tags, setTags] = useState<string[]>([]);
  const [input, setInput] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === "Enter" || e.key === ",") && input.trim()) {
      e.preventDefault();
      if (!value.includes(input.trim())) {
        onChange([...value, input.trim()]);
      }
      setInput("");
    }
  };

  const removeTag = (tag: string) => {
    onChange(value.filter((t) => t !== tag));
  };

  return (
    <div className="w-full border p-2 rounded-lg flex flex-wrap gap-2 items-center">
      {value.map((tag) => (
        <Badge key={tag} className="flex items-center gap-1">
          {tag}
          <X
            className="w-3 h-3 cursor-pointer"
            onClick={() => removeTag(tag)}
          />
        </Badge>
      ))}
      <Input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        className="flex-1 border-none outline-none shadow-none focus:outline-none focus:border-none ring-0 focus:ring-0 focus-visible:ring-0 p-0 h-auto"
        placeholder="افزودن مقدار..."
      />
    </div>
  );
}

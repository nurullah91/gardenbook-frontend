"use client";

import { Input } from "@nextui-org/input";
import { useFormContext } from "react-hook-form";

interface IProps {
  variant?: "flat" | "bordered" | "faded" | "underlined";
  size?: "sm" | "md" | "lg";
  required?: boolean;
  type?: string;
  label: string;
  name: string;
}

export default function GBInput({
  variant = "bordered",
  size = "md",
  required = false,
  type = "text",
  label,
  name,
}: IProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="mt-3">
      <Input
        {...register(name)}
        errorMessage={errors?.[name] ? (errors?.[name]?.message as string) : ""}
        isInvalid={!!errors[name]}
        label={label}
        required={required}
        size={size}
        type={type}
        variant={variant}
      />
    </div>
  );
}

"use client";

import { Input } from "@heroui/input";
import { Controller, useFormContext } from "react-hook-form";

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
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="mt-3">
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            errorMessage={
              errors?.[name] ? (errors?.[name]?.message as string) : ""
            }
            isInvalid={!!errors[name]}
            label={label}
            required={required}
            size={size}
            type={type}
            variant={variant}
          />
        )}
      />
    </div>
  );
}

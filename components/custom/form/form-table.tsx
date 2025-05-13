"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { cn } from "@/lib/utils";
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
import { FormFieldSchema, memberDataSchema } from "@/data/schema/form-schema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { formatToRupiah, parseRupiahToNumber } from "@/helper/formCurrency";

type FormTableProps = {
  schema: FormFieldSchema[];
  zodSchema: z.ZodSchema<any>;
  onSubmit: (data: any) => void;
  defaultValues?: Record<string, any>;
};

function getDefaultValues(schema: FormFieldSchema[]) {
  const defaults: Record<string, any> = {};
  schema.forEach((field) => {
    switch (field.type) {
      case "text":
        defaults[field.name] = "";
        break;
      case "number":
      //@ts-ignore
      case "currency":
        defaults[field.name] = 0;
        break;
      case "date":
        defaults[field.name] = "";
        break;
      case "select":
      case "radio":
        defaults[field.name] = "";
        break;
      case "checkbox":
        defaults[field.name] = false;
        break;
      default:
        defaults[field.name] = "";
    }
  });
  return defaults;
}

export function FormTable({
  schema,
  zodSchema,
  onSubmit,
  defaultValues,
}: FormTableProps) {
  const form = useForm<z.infer<typeof zodSchema>>({
    resolver: zodResolver(zodSchema),
    defaultValues: defaultValues || getDefaultValues(schema),
  });

  const handleSubmit = async (data: z.infer<typeof zodSchema>) => {
    try {
      await onSubmit(data);
      // toast.success("Form submitted successfully");
    } catch (error) {
      // toast.error("Something went wrong");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        {schema.map((field) => (
          <FormField
            key={field.name}
            control={form.control}
            name={field.name}
            render={({ field: formField }) => (
              <FormItem>
                <FormLabel>{field.label}</FormLabel>
                <FormControl>
                  {field.type === "text" || field.type === "number" ? (
                    <Input type={field.type} {...formField} />
                  ) : //@ts-ignore
                  field.type === "currency" ? (
                    <Input
                      type="text"
                      value={formatToRupiah(formField.value || 0)}
                      onChange={(e) => {
                        const parsed = parseRupiahToNumber(e.target.value);
                        formField.onChange(parsed);
                      }}
                    />
                  ) : field.type === "date" ? (
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !formField.value && "text-muted-foreground"
                            )}
                          >
                            {formField.value ? (
                              format(new Date(formField.value), "PPP")
                            ) : (
                              <span>{`Select ${field.label}`}</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={
                            formField.value
                              ? new Date(formField.value)
                              : undefined
                          }
                          onSelect={(date) =>
                            formField.onChange(
                              date?.toISOString().split("T")[0]
                            )
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  ) : field.type === "select" ? (
                    <Select
                      onValueChange={formField.onChange}
                      defaultValue={formField.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder={`Select ${field.label}`} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {field.options?.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : field.type === "checkbox" ? (
                    <input
                      type="checkbox"
                      checked={!!formField.value}
                      onChange={(e) => formField.onChange(e.target.checked)}
                    />
                  ) : field.type === "radio" && field.options ? (
                    field.options.map((option) => (
                      <label key={option.value}>
                        <input
                          type="radio"
                          value={option.value}
                          checked={formField.value === option.value}
                          onChange={() => formField.onChange(option.value)}
                        />
                        {option.label}
                      </label>
                    ))
                  ) : null}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

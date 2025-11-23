import React from "react";

import { MultiSelect } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";

import { AdFilterState, AdStatus } from "@/entities/filter/model/types";

interface FilterByStatusProps {
  form: UseFormReturnType<AdFilterState>;
}

const statusOptions: { value: AdStatus; label: string }[] = [
  { value: "pending", label: "На модерации" },
  { value: "approved", label: "Одобрено" },
  { value: "rejected", label: "Отклонено" },
  { value: "draft", label: "Черновик" },
];

export const FilterByStatus: React.FC<FilterByStatusProps> = ({ form }) => {
  return (
    <MultiSelect
      label="Фильтр по статусу"
      placeholder="Выберите статус"
      data={statusOptions}
      {...form.getInputProps("status")}
      clearable
    />
  );
};


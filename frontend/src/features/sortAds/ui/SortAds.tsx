import React from "react";

import { NativeSelect } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";

import { AdFilterState, SortField, SortOrder } from "@/entities/filter/model/types";

interface SortAdsProps {
  form: UseFormReturnType<AdFilterState>;
}

const sortOptions = [
  { value: "", label: "Без сортировки" },
  { value: "createdAt_desc", label: "По дате (новые)" },
  { value: "createdAt_asc", label: "По дате (старые)" },
  { value: "price_desc", label: "По цене (убывание)" },
  { value: "price_asc", label: "По цене (возрастание)" },
  { value: "priority_desc", label: "По приоритету (высокий)" },
  { value: "priority_asc", label: "По приоритету (низкий)" },
];

export const SortAds: React.FC<SortAdsProps> = ({ form }) => {
  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const [field, order] = event.currentTarget.value.split("_") as [
      SortField | undefined,
      SortOrder | undefined,
    ];
    form.setValues({
      sortBy: field,
      sortOrder: order,
    });
  };

  const currentSortValue =
    form.values.sortBy && form.values.sortOrder
      ? `${form.values.sortBy}_${form.values.sortOrder}`
      : "";

  return (
    <NativeSelect
      label="Сортировка"
      data={sortOptions}
      value={currentSortValue}
      onChange={handleSortChange}
    />
  );
};

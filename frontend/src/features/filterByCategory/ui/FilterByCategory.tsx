import React from "react";

import { NativeSelect } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";

import { Category } from "@/entities/category/model/types";
import { AdFilterState } from "@/entities/filter/model/types";

interface FilterByCategoryProps {
  form: UseFormReturnType<AdFilterState>;
}

const categories: Category[] = [
  { id: 0, name: "Электроника" },
  { id: 1, name: "Недвижимость" },
  { id: 2, name: "Транспорт" },
  { id: 3, name: "Работа" },
  { id: 4, name: "Услуги" },
  { id: 5, name: "Животные" },
  { id: 6, name: "Мода" },
  { id: 7, name: "Детское" },
];

export const FilterByCategory: React.FC<FilterByCategoryProps> = ({ form }) => {
  const categoryOptions = categories.map((category) => ({
    value: category.id.toString(),
    label: category.name,
  }));

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.currentTarget.value;
    form.setFieldValue("categoryId", value ? parseInt(value, 10) : undefined);
  };

  return (
    <NativeSelect
      label="Фильтр по категории"
      data={[{ value: "", label: "Все категории" }, ...categoryOptions]}
      value={form.values.categoryId?.toString() || ""}
      onChange={handleChange}
    />
  );
};

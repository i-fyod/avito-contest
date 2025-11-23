import React from "react";

import { TextInput } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";

import { AdFilterState } from "@/entities/filter/model/types";

interface SearchByTitleProps {
  form: UseFormReturnType<AdFilterState>;
}

export const SearchByTitle: React.FC<SearchByTitleProps> = ({ form }) => {
  return (
    <TextInput
      label="Поиск по названию"
      placeholder="Название объявления"
      {...form.getInputProps("search")}
      __clearable
    />
  );
};

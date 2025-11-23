import React from "react";

import { Group, NumberInput } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";

import { AdFilterState } from "@/entities/filter/model/types";

interface FilterByPriceProps {
  form: UseFormReturnType<AdFilterState>;
}

export const FilterByPrice: React.FC<FilterByPriceProps> = ({ form }) => {
  return (
    <Group grow>
      <NumberInput
        label="Цена от"
        placeholder="Минимальная цена"
        min={0}
        value={form.values.minPrice ?? ""}
        onChange={(value) =>
          form.setFieldValue("minPrice", value === "" ? undefined : Number(value))
        }
        __clearable
      />
      <NumberInput
        label="Цена до"
        placeholder="Максимальная цена"
        min={0}
        value={form.values.maxPrice ?? ""}
        onChange={(value) =>
          form.setFieldValue("maxPrice", value === "" ? undefined : Number(value))
        }
        __clearable
      />
    </Group>
  );
};

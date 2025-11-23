import React from "react";
import { useSearchParams } from "react-router-dom";

import { Box, Button, Group, Stack } from "@mantine/core";
import { useForm } from "@mantine/form";

import { AdFilterState, AdStatus, SortField, SortOrder } from "@/entities/filter/model/types";

import { FilterByCategory } from "@/features/filterByCategory";
import { FilterByPrice } from "@/features/filterByPrice";
import { FilterByStatus } from "@/features/filterByStatus";
import { ResetFilters } from "@/features/resetFilters";
import { SearchByTitle } from "@/features/searchByTitle";
import { SortAds } from "@/features/sortAds";

const paramsToFilters = (searchParams: URLSearchParams): AdFilterState => {
  const filters: AdFilterState = {};

  const search = searchParams.get("search");
  if (search) filters.search = search;

  const status = searchParams.getAll("status") as AdStatus[];
  if (status.length > 0) filters.status = status;

  const categoryId = searchParams.get("categoryId");
  if (categoryId) filters.categoryId = parseInt(categoryId, 10);

  const minPrice = searchParams.get("minPrice");
  if (minPrice) filters.minPrice = parseInt(minPrice, 10);

  const maxPrice = searchParams.get("maxPrice");
  if (maxPrice) filters.maxPrice = parseInt(maxPrice, 10);

  const sortBy = searchParams.get("sortBy") as SortField;
  if (sortBy) filters.sortBy = sortBy;

  const sortOrder = searchParams.get("sortOrder") as SortOrder;
  if (sortOrder) filters.sortOrder = sortOrder;

  return filters;
};

const cleanObject = (obj: Record<string, any>) => {
  const cleaned = { ...obj };
  Object.keys(cleaned).forEach((key) => {
    if (
      cleaned[key] === undefined ||
      cleaned[key] === null ||
      cleaned[key] === "" ||
      (Array.isArray(cleaned[key]) && cleaned[key].length === 0)
    ) {
      delete cleaned[key];
    }
  });
  return cleaned;
};

export const Filters: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialFilters = paramsToFilters(searchParams);

  const form = useForm<AdFilterState>({
    mode: "uncontrolled",
    initialValues: {
      search: "",
      status: [],
      categoryId: undefined,
      minPrice: undefined,
      maxPrice: undefined,
      sortBy: undefined,
      sortOrder: undefined,
      ...initialFilters,
    },
  });

  const handleSubmit = (values: AdFilterState) => {
    const cleanedValues = cleanObject(values);
    setSearchParams({ ...cleanedValues, page: "1" }, { replace: true });
  };

  const handleReset = () => {
    form.reset();
    setSearchParams({ page: "1" }, { replace: true });
  };

  return (
    <Box py="md" px="lg">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack gap="md">
          <Group grow>
            <SearchByTitle form={form} />
            <FilterByCategory form={form} />
            <FilterByStatus form={form} />
          </Group>
          <FilterByPrice form={form} />
          <Group justify="space-between">
            <SortAds form={form} />
            <Group>
              <ResetFilters onReset={handleReset} />
              <Button type="submit">Применить фильтры</Button>
            </Group>
          </Group>
        </Stack>
      </form>
    </Box>
  );
};

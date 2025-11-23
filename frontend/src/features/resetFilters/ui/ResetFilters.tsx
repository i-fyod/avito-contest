import React from "react";

import { Button } from "@mantine/core";

interface ResetFiltersProps {
  onReset: () => void;
}

export const ResetFilters: React.FC<ResetFiltersProps> = ({ onReset }) => {
  return (
    <Button variant="outline" onClick={onReset}>
      Сбросить фильтры
    </Button>
  );
};

import { Group, Pagination as MantinePagination, Text } from "@mantine/core";

interface PaginationProps {
  total: number;
  page: number;
  onChange: (page: number) => void;
  limit: number;
  totalAds: number;
}

export const Pagination = ({ total, page, onChange, limit, totalAds }: PaginationProps) => {
  const firstAdIndex = (page - 1) * limit + 1;
  const lastAdIndex = Math.min(page * limit, totalAds);

  return (
    <Group justify="space-between" pt="md">
      <Text c="dimmed" size="sm">
        Отображены с {firstAdIndex} по {lastAdIndex} из {totalAds} объявлений
      </Text>
      <MantinePagination total={total} value={page} onChange={onChange} withEdges />
    </Group>
  );
};

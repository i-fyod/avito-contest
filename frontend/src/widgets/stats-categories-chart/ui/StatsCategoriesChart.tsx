import { ListFilter } from "lucide-react";

import { DonutChart } from "@mantine/charts";
import { Card, Center, Divider, Group, Text, Title, useMantineTheme } from "@mantine/core";

import { CategoriesData } from "@/shared/api/stats/types";

interface StatsCategoriesChartProps {
  categoriesData: CategoriesData | null;
}

export const StatsCategoriesChart = ({ categoriesData }: StatsCategoriesChartProps) => {
  const theme = useMantineTheme();

  const categoryChartData = categoriesData
    ? Object.entries(categoriesData)
        .sort(([, a], [, b]) => b - a)
        .map(([name, value], index) => ({
          name,
          value,
          color: [
            theme.colors.blue[6],
            theme.colors.violet[6],
            theme.colors.grape[6],
            theme.colors.pink[6],
            theme.colors.cyan[6],
            theme.colors.indigo[6],
            theme.colors.teal[6],
            theme.colors.lime[6],
            theme.colors.yellow[6],
          ][index % 9],
        }))
    : [];

  if (categoryChartData.length === 0) {
    return null;
  }

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Group gap="xs" mb="xs">
        <ListFilter size={20} color={theme.colors.grape[6]} />
        <Title order={3} size="h4">
          Категории объявлений
        </Title>
      </Group>
      <Text size="xs" c="dimmed" mb="md">
        Распределение проверенных объявлений по категориям
      </Text>
      <Divider mb="lg" />
      <Center>
        <DonutChart
          h={360}
          data={categoryChartData}
          withLabels
          labelsType="value"
          withLabelsLine
          thickness={35}
          size={280}
        />
      </Center>
    </Card>
  );
};

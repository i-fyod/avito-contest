import { BarChart as BarChartIcon } from "lucide-react";

import { BarChart } from "@mantine/charts";
import { Card, Divider, Group, Text, Title, useMantineTheme } from "@mantine/core";

import { ActivityData } from "@/shared/api/stats/types";

interface StatsActivityChartProps {
  activityData: ActivityData[];
}

export const StatsActivityChart = ({ activityData }: StatsActivityChartProps) => {
  const theme = useMantineTheme();

  if (activityData.length === 0) {
    return null;
  }

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Group gap="xs" mb="xs">
        <BarChartIcon size={20} color={theme.colors.blue[6]} />
        <Title order={3} size="h4">
          График активности
        </Title>
      </Group>
      <Text size="xs" c="dimmed" mb="md">
        Количество проверенных объявлений по дням
      </Text>
      <Divider mb="lg" />
      <BarChart
        h={320}
        data={activityData}
        dataKey="date"
        series={[
          { name: "approved", color: "teal.6", label: "Одобрено" },
          { name: "requestChanges", color: "orange.6", label: "На доработку" },
          { name: "rejected", color: "red.6", label: "Отклонено" },
        ]}
        yAxisProps={{ allowDecimals: false }}
        type="stacked"
        withLegend
        legendProps={{ verticalAlign: "bottom", height: 50 }}
        gridAxis="xy"
      />
    </Card>
  );
};

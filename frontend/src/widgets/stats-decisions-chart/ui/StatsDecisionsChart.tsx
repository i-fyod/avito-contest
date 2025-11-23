import { PieChart as PieChartIcon } from "lucide-react";

import { DonutChart } from "@mantine/charts";
import { Card, Center, Divider, Group, Text, Title, useMantineTheme } from "@mantine/core";

import { DecisionsData } from "@/shared/api/stats/types";

interface StatsDecisionsChartProps {
  decisionsData: DecisionsData | null;
}

export const StatsDecisionsChart = ({ decisionsData }: StatsDecisionsChartProps) => {
  const theme = useMantineTheme();

  const decisionChartData = decisionsData
    ? [
        { name: "Одобрено", value: decisionsData.approved, color: theme.colors.teal[6] },
        { name: "Отклонено", value: decisionsData.rejected, color: theme.colors.red[6] },
        {
          name: "На доработку",
          value: decisionsData.requestChanges,
          color: theme.colors.orange[6],
        },
      ]
    : [];

  const totalDecisions = decisionsData
    ? decisionsData.approved + decisionsData.rejected + decisionsData.requestChanges
    : 0;

  if (totalDecisions === 0) {
    return null;
  }

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Group gap="xs" mb="xs">
        <PieChartIcon size={20} color={theme.colors.violet[6]} />
        <Title order={3} size="h4">
          Распределение решений
        </Title>
      </Group>
      <Text size="xs" c="dimmed" mb="md">
        Соотношение типов принятых решений
      </Text>
      <Divider mb="lg" />
      <Center>
        <DonutChart
          h={320}
          data={decisionChartData}
          withLabels
          labelsType="percent"
          withLabelsLine
          thickness={40}
        />
      </Center>
    </Card>
  );
};

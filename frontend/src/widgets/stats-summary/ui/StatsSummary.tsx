import { CheckCircle, Clock, TrendingUp, XCircle } from "lucide-react";

import { SimpleGrid, useMantineTheme } from "@mantine/core";
import { StatCard } from "@/shared/ui";

import { DecisionsData, StatsSummary } from "@/shared/api/stats/types";
import { formatAverageReviewTime } from "@/shared/lib/stats/formatAverageReviewTime";

interface StatsSummaryProps {
  summaryStats: StatsSummary | null;
  decisionsData: DecisionsData | null;
}

export const StatsSummaryCards = ({ summaryStats, decisionsData }: StatsSummaryProps) => {
  const theme = useMantineTheme();

  if (!summaryStats) {
    return null;
  }

  return (
    <SimpleGrid cols={{ base: 1, xs: 2, md: 4 }} spacing="md">
      <StatCard
        title="Всего проверено"
        value={summaryStats.totalReviewed.toLocaleString()}
        subtitle="объявлений за период"
        icon={<TrendingUp size={20} color={theme.colors.blue[6]} />}
        variant="default"
      />

      <StatCard
        title="Одобрено"
        value={summaryStats.approvedPercentage.toFixed(1)}
        valueUnit="%"
        subtitle={`${decisionsData?.approved || 0} объявлений`}
        icon={<CheckCircle size={20} color={theme.colors.teal[7]} />}
        color="teal"
        variant="gradient"
      />

      <StatCard
        title="Отклонено"
        value={summaryStats.rejectedPercentage.toFixed(1)}
        valueUnit="%"
        subtitle={`${decisionsData?.rejected || 0} объявлений`}
        icon={<XCircle size={20} color={theme.colors.red[7]} />}
        color="red"
        variant="gradient"
      />

      <StatCard
        title="Среднее время"
        value={formatAverageReviewTime(summaryStats.averageReviewTime)}
        valueUnit="мин"
        subtitle="на одно объявление"
        icon={<Clock size={20} color={theme.colors.orange[7]} />}
        color="orange"
        variant="gradient"
      />
    </SimpleGrid>
  );
};

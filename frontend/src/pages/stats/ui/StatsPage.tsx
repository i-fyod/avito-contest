import { Box, SimpleGrid, Stack } from "@mantine/core";

import { useStats } from "@/features/stats/lib/useStats";

import { StatsActivityChart } from "@/widgets/stats-activity-chart/ui/StatsActivityChart";
import { StatsCategoriesChart } from "@/widgets/stats-categories-chart/ui/StatsCategoriesChart";
import { StatsDecisionsChart } from "@/widgets/stats-decisions-chart/ui/StatsDecisionsChart";
import { StatsHeader } from "@/widgets/stats-header/ui/StatsHeader";
import { StatsSummaryCards } from "@/widgets/stats-summary/ui/StatsSummary";

import { ErrorState } from "@/shared/ui";
import { LoadingState } from "@/shared/ui";

export const StatsPage = () => {
  const {
    selectedPeriod,
    setSelectedPeriod,
    summaryStats,
    activityData,
    decisionsData,
    categoriesData,
    loading,
    error,
  } = useStats();

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState message={error} />;
  }

  return (
    <Box bg="gray.0" mih="100vh" p={{ base: "md", sm: "xl" }}>
      <Stack gap="xl" maw={1400} mx="auto">
        <StatsHeader selectedPeriod={selectedPeriod} setSelectedPeriod={setSelectedPeriod} />
        <StatsSummaryCards summaryStats={summaryStats} decisionsData={decisionsData} />

        <SimpleGrid cols={{ base: 1, lg: 2 }} spacing="md">
          <StatsActivityChart activityData={activityData} />
          <StatsDecisionsChart decisionsData={decisionsData} />
        </SimpleGrid>

        <StatsCategoriesChart categoriesData={categoriesData} />
      </Stack>
    </Box>
  );
};

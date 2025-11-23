import { ArrowLeft, CalendarDays } from "lucide-react";

import { useNavigate } from "react-router-dom";

import {
  ActionIcon,
  Badge,
  Box,
  Flex,
  Group,
  Paper,
  SegmentedControl,
  Text,
  Title,
  Tooltip,
} from "@mantine/core";

import { Period } from "@/shared/api/stats/types";
import { getPeriodLabel } from "@/shared/lib/stats/getPeriodLabel";

interface StatsHeaderProps {
  selectedPeriod: Period;
  setSelectedPeriod: (period: Period) => void;
}

export const StatsHeader = ({ selectedPeriod, setSelectedPeriod }: StatsHeaderProps) => {
  const navigate = useNavigate();

  return (
    <Paper shadow="xs" p="lg" radius="md" withBorder>
      <Flex
        direction={{ base: "column", sm: "row" }}
        justify="space-between"
        align={{ base: "start", sm: "center" }}
        gap="md"
        mb="md">
        <Box>
          <Title order={1} size="h2" mb={4}>
            📊 Статистика модератора
          </Title>
          <Text c="dimmed" size="sm">
            Аналитика вашей работы за выбранный период
          </Text>
        </Box>

        <SegmentedControl
          value={selectedPeriod}
          onChange={(value) => setSelectedPeriod(value as Period)}
          data={[
            { label: "Сегодня", value: "today" },
            { label: "7 дней", value: "week" },
            { label: "30 дней", value: "month" },
          ]}
          color="blue"
          size="sm"
          radius="md"
        />
      </Flex>
      <Group align="center">
        <Tooltip label="Вернуться к объявлениям" position="right" withArrow>
          <ActionIcon
            variant="light"
            color="blue"
            size="lg"
            radius="md"
            onClick={() => navigate("/list")}
            styles={{
              root: {
                transition: "all 0.2s ease",
                "&:hover": {
                  transform: "translateX(-4px)",
                },
              },
            }}>
            <ArrowLeft size={20} />
          </ActionIcon>
        </Tooltip>
        <Badge size="lg" variant="light" color="blue" leftSection={<CalendarDays size={14} />}>
          {getPeriodLabel(selectedPeriod)}
        </Badge>
      </Group>
    </Paper>
  );
};

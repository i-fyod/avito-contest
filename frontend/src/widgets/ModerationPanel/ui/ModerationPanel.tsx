import { AlertTriangle, CheckCircle, ChevronLeft, ChevronRight, Gavel, X } from "lucide-react";

import React from "react";

import { Button, Card, Group, Stack, Title, useMantineTheme } from "@mantine/core";

import { Ad } from "@/entities/ad/model/types";

interface ModerationPanelProps {
  onApproveClick: () => void;
  onRejectClick: () => void;
  onReviseClick?: () => void;
  onPreviousClick?: () => void;
  onNextClick?: () => void;
  disablePrevious?: boolean;
  disableNext?: boolean;
  isApproveLoading: boolean;
  isReviseLoading: boolean;
  isRejectLoading: boolean;
  currentAdStatus: Ad["status"];
}

export const ModerationPanel: React.FC<ModerationPanelProps> = ({
  onApproveClick,
  onRejectClick,
  onReviseClick = () => {},
  onPreviousClick = () => {},
  onNextClick = () => {},
  disablePrevious = false,
  disableNext = false,
  isApproveLoading,
  isReviseLoading,
  isRejectLoading,
  currentAdStatus,
}) => {
  const theme = useMantineTheme();

  const isApproved = currentAdStatus === "approved";
  const isRejected = currentAdStatus === "rejected";
  const isPending = currentAdStatus === "pending";

  return (
    <Card withBorder p="md" radius="md" style={{ position: "sticky", top: theme.spacing.lg }}>
      <Group gap="sm" align="center" mb="md">
        <Gavel />
        <Title order={4}>Действия модератора</Title>
      </Group>
      <Stack>
        <Button
          color="green"
          leftSection={<CheckCircle size={18} />}
          onClick={onApproveClick}
          loading={isApproveLoading}
          disabled={isApproved}>
          Одобрить
        </Button>
        <Button
          color="red"
          leftSection={<X size={18} />}
          onClick={onRejectClick}
          loading={isRejectLoading}
          disabled={isRejected}>
          Отклонить
        </Button>
        <Button
          color="yellow"
          leftSection={<AlertTriangle size={18} />}
          onClick={onReviseClick}
          loading={isReviseLoading}
          disabled={isPending || currentAdStatus === "draft"}>
          Вернуть на доработку
        </Button>
      </Stack>
      <Group justify="space-between" mt="xl">
        <Button
          variant="subtle"
          leftSection={<ChevronLeft size={16} />}
          onClick={onPreviousClick}
          disabled={disablePrevious}>
          Предыдущее
        </Button>
        <Button
          variant="subtle"
          rightSection={<ChevronRight size={16} />}
          onClick={onNextClick}
          disabled={disableNext}>
          Следующее
        </Button>
      </Group>
    </Card>
  );
};

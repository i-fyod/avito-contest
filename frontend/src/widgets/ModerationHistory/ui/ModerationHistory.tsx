import { CheckCircle, Edit, History, X } from "lucide-react";

import React from "react";

import { Group, Paper, Text, Timeline, Title } from "@mantine/core";

import { Ad, ModerationHistory as ModerationHistoryType } from "@/entities/ad/model/types";

import { formatRelativeTime } from "@/shared/lib/helpers/formatRelativeTime";

interface ModerationHistoryProps {
  moderationHistory: Ad["moderationHistory"];
}

export const ModerationHistory: React.FC<ModerationHistoryProps> = ({ moderationHistory }) => {
  const getModerationEventProps = (event: ModerationHistoryType) => {
    const { action, moderatorName, timestamp, comment } = event;
    const formattedTimestamp = formatRelativeTime(timestamp);

    switch (action) {
      case "approved":
        return {
          icon: <CheckCircle size={16} />,
          color: "green",
          title: `Одобрено ${moderatorName || "системой"}`,
          status: `${formattedTimestamp}${comment ? ` - "${comment}"` : ""}`,
        };
      case "rejected":
        return {
          icon: <X size={16} />,
          color: "red",
          title: `Отклонено ${moderatorName || "системой"}`,
          status: `${formattedTimestamp}${comment ? ` - "${comment}"` : ""}`,
        };
      case "requestChanges":
        return {
          icon: <Edit size={16} />,
          color: "blue",
          title: `Возвращено на доработку ${moderatorName || "системой"}`,
          status: `${formattedTimestamp}${comment ? ` - "${comment}"` : ""}`,
        };
      default:
        return {
          icon: null,
          color: "gray",
          title: "Неизвестное действие",
          status: formattedTimestamp,
        };
    }
  };

  return (
    <Paper withBorder p="md" radius="md">
      <Group gap="sm" align="center" mb="md">
        <History />
        <Title order={4}>История модерации</Title>
      </Group>
      {moderationHistory.length === 0 ? (
        <Text c="dimmed" ta="center">
          История модерации пуста.
        </Text>
      ) : (
        <Timeline active={moderationHistory.length} bulletSize={24} lineWidth={2}>
          {moderationHistory.map((event: ModerationHistoryType, index: number) => {
            const { icon, color, title, status } = getModerationEventProps(event);
            return (
              <Timeline.Item key={index} bullet={icon} title={title} color={color}>
                <Text c="dimmed" size="xs">
                  {status}
                </Text>
              </Timeline.Item>
            );
          })}
        </Timeline>
      )}
    </Paper>
  );
};

import { useNavigate } from "react-router-dom";

import { Badge, Flex, Group, Paper, Stack, Text, Title } from "@mantine/core";

import { AdCard } from "@/entities/ad/model/types";

import { formatRelativeTime } from "@/shared/lib/helpers";
import { priorityMap, statusMap } from "@/shared/lib/mappers/adMappers.tsx";
import { Image } from "@/shared/ui";

interface CardProps {
  ad: AdCard;
}

export function Card({ ad }: CardProps) {
  const navigate = useNavigate();
  const relativeTime = formatRelativeTime(ad.createdAt);

  const status = statusMap[ad.status];
  const priority = priorityMap[ad.priority];

  const handleNavigate = () => {
    navigate(`/item/${ad.id}`);
  };

  return (
    <Paper
      p="md"
      bdrs="md"
      style={{
        cursor: "pointer",
        boxShadow: "0 3px 15px -1px rgba(50, 50, 71, 0.02), 0 0 4px 0 rgba(12, 26, 75, 0.05)",
      }}
      withBorder
      onClick={handleNavigate}>
      <Flex direction="row" align="center" justify="space-between" gap="md" wrap="wrap">
        <Group align="start" gap="md" style={{ flex: 1, minWidth: 260 }}>
          <Image src={ad.images?.[0]} w={120} h={120} />
          <Stack gap={4}>
            <Title order={3} c="dark.7">
              {ad.title}
            </Title>

            <Group gap={8}>
              <Badge variant="light" color={priority.c} leftSection={priority.icon}>
                {priority.label}
              </Badge>
              <Badge variant="light" color={status.c} leftSection={status.icon}>
                {status.label}
              </Badge>
            </Group>
            <Text fz="sm" c="gray.6">
              {ad.category} • {relativeTime}
            </Text>
            <Text fw={600} fz="lg" c="dark.6" mt={4}>
              {ad.price.toLocaleString("ru-RU")} ₽
            </Text>
          </Stack>
        </Group>
      </Flex>
    </Paper>
  );
}

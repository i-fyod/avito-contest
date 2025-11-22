import {
  Paper,
  Flex,
  Text,
  Group,
  Stack,
  Button,
  Badge,
  Title,
} from '@mantine/core';
import { ArrowRight } from 'lucide-react';
import { CardProps } from '@/entities/ad/model/types';
import { formatRelativeTime } from '@/shared/lib/helpers';
import { priorityMap, statusMap } from '@/shared/lib/mappers/adMappers.tsx';
import { Image } from "@/shared/ui"

export function Card({
  ad,
  onOpen,
}: CardProps) {
  const relativeTime = formatRelativeTime(ad.createdAt);

  const status = statusMap[ad.status];
  const priority = priorityMap[ad.priority];

  return (
    <Paper
      p="md"
      bdrs="md"
      style={{ boxShadow: "0 3px 15px -1px rgba(50, 50, 71, 0.02), 0 0 4px 0 rgba(12, 26, 75, 0.05)" }}
      withBorder
    >
      <Flex
        direction="row"
        align="center"
        justify="space-between"
        gap="md"
        wrap="wrap"
      >
        <Group align="start" gap="md" style={{ flex: 1, minWidth: 260 }}>
          <Image src={ad.images?.[0]} w={120} h={120} />
          <Stack gap={4}>
            <Title
              order={3}
              c="dark.7"
            >
              {ad.title}
            </Title>

            <Group gap={8}>
              <Badge variant="light" color={priority.c} leftSection={priority.icon}>{priority.label}</Badge>
              <Badge variant="light" color={status.c} leftSection={status.icon}>{status.label}</Badge>
            </Group>
            <Text fz="sm" c="gray.6">
              {ad.category} • {relativeTime}
            </Text>
            <Text fw={600} fz="lg" c="dark.6" mt={4}>
              {ad.price.toLocaleString('ru-RU')} ₽
            </Text>
          </Stack>
        </Group>

        <Button
          radius="md"
          size="sm"
          variant="filled"
          color="green"
          rightSection={<ArrowRight size={16} />}
          fw={600}
          onClick={() => onOpen?.(ad)}
        >
          Открыть
        </Button>
      </Flex>
    </Paper>
  );
}

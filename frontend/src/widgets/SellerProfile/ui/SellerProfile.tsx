import { Star, User } from "lucide-react";

import React from "react";

import { Group, Paper, Stack, Text, Title, useMantineTheme } from "@mantine/core";

import { Ad } from "@/entities/ad/model/types";

import { formatRelativeTime } from "@/shared/lib/helpers/formatRelativeTime";

interface SellerProfileProps {
  seller: Ad["seller"];
}

export const SellerProfile: React.FC<SellerProfileProps> = ({ seller }) => {
  const theme = useMantineTheme();
  return (
    <Paper withBorder p="md" radius="md">
      <Group gap="sm" align="center" mb="md">
        <User />
        <Title order={4}>Информация о продавце</Title>
      </Group>
      <Stack gap="sm">
        <Group justify="space-between">
          <Text fw={500}>Имя:</Text> <Text>{seller.name}</Text>
        </Group>
        <Group justify="space-between">
          <Text fw={500}>Рейтинг:</Text>{" "}
          <Group gap={4} align="center">
            {seller.rating} <Star size={16} color={theme.colors.yellow[6]} />
          </Group>
        </Group>
        <Group justify="space-between">
          <Text fw={500}>Активные объявления:</Text> <Text>{seller.totalAds}</Text>
        </Group>
        <Group justify="space-between">
          <Text fw={500}>На сайте с:</Text> <Text>{formatRelativeTime(seller.registeredAt)}</Text>
        </Group>
      </Stack>
    </Paper>
  );
};

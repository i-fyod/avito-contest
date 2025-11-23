import { FileText, List } from "lucide-react";

import React from "react";

import { Divider, Group, Paper, Stack, Text, Title } from "@mantine/core";

import { Ad } from "@/entities/ad/model/types";

import { CharacteristicsTable } from "@/features/CharacteristicsTable";
import { ImageGallery } from "@/features/ImageGallery";

interface AdInfoProps {
  images: Ad["images"];
  description: Ad["description"];
  characteristics: Ad["characteristics"];
}

export const AdInfo: React.FC<AdInfoProps> = ({ images, description, characteristics }) => {
  return (
    <Stack>
      <ImageGallery images={images} />
      <Paper withBorder p="md" radius="md">
        <Group gap="sm" align="center" mb="md">
          <FileText />
          <Title order={4}>Полное описание</Title>
        </Group>
        <Text c="dimmed" mb="lg">
          {description}
        </Text>
        <Divider my="md" />
        <Group gap="sm" align="center" mb="md">
          <List />
          <Title order={5}>Характеристики товара</Title>
        </Group>
        <CharacteristicsTable characteristics={characteristics} />
      </Paper>
    </Stack>
  );
};

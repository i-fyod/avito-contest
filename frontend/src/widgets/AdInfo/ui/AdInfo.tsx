import { FileText, List } from "lucide-react";

import React from "react";

import { Divider, Group, Stack, Text, Title } from "@mantine/core";

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
    <Stack gap="md">
      <ImageGallery images={images} />
      <Group gap="xs" align="center" mb="sm">
        <FileText size={20} />
        <Title order={4} size="h5">
          Полное описание
        </Title>
      </Group>
      <Text c="dimmed" size="sm" style={{ lineHeight: 1.6, whiteSpace: "pre-wrap" }}>
        {description}
      </Text>
      <Divider />
      <Group gap="xs" align="center" mb="sm">
        <List size={20} />
        <Title order={4} size="h5">
          Характеристики товара
        </Title>
      </Group>
      <CharacteristicsTable characteristics={characteristics} />
    </Stack>
  );
};

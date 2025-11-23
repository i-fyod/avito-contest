import React from "react";

import { Paper, SimpleGrid, Text } from "@mantine/core";

import { Ad } from "@/entities/ad/model/types";

interface CharacteristicsTableProps {
  characteristics: Ad["characteristics"];
}

export const CharacteristicsTable: React.FC<CharacteristicsTableProps> = ({ characteristics }) => {
  return (
    <SimpleGrid cols={{ base: 1, sm: 2 }}>
      {Array.isArray(characteristics)
        ? characteristics.map((char) => (
            <Paper key={char.key} p="sm" bg="gray.0" radius="sm">
              <Text fw={500}>
                {char.key}:{" "}
                <Text span c="dimmed" inherit>
                  {char.value}
                </Text>
              </Text>
            </Paper>
          ))
        : Object.entries(characteristics).map(([key, value]) => (
            <Paper key={key} p="sm" bg="gray.0" radius="sm">
              <Text fw={500}>
                {key}:{" "}
                <Text span c="dimmed" inherit>
                  {String(value)}
                </Text>
              </Text>
            </Paper>
          ))}
    </SimpleGrid>
  );
};

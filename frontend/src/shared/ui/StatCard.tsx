import { ReactNode } from "react";

import { Card, Group, MantineColor, Text, useMantineTheme } from "@mantine/core";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon: ReactNode;
  color?: MantineColor;
  variant?: "default" | "gradient";
  valueUnit?: string;
}

export const StatCard = ({
  title,
  value,
  subtitle,
  icon,
  color = "blue",
  variant = "default",
  valueUnit,
}: StatCardProps) => {
  const theme = useMantineTheme();

  const getCardStyle = () => {
    if (variant === "gradient") {
      return {
        background: `linear-gradient(135deg, ${theme.colors[color][0]} 0%, ${theme.colors[color][1]} 100%)`,
      };
    }
    return undefined;
  };

  const getTextColor = () => {
    return variant === "gradient" ? `${color}.8` : "dark";
  };

  const getSubtitleColor = () => {
    return variant === "gradient" ? `${color}.7` : "dimmed";
  };

  return (
    <Card shadow="sm" padding="xl" radius="md" withBorder style={getCardStyle()}>
      <Group justify="space-between" mb="xs">
        <Text
          size="xs"
          tt="uppercase"
          fw={700}
          c={variant === "gradient" ? `${color}.8` : "dimmed"}>
          {title}
        </Text>
        {icon}
      </Group>
      <Group align="baseline" gap={valueUnit ? 4 : 0}>
        <Text fz={42} fw={900} c={getTextColor()} lh={1}>
          {value}
        </Text>
        {valueUnit && (
          <Text size="xl" fw={700} c={getSubtitleColor()}>
            {valueUnit}
          </Text>
        )}
      </Group>
      <Text size="xs" c={getSubtitleColor()} mt="sm" fw={variant === "gradient" ? 500 : undefined}>
        {subtitle}
      </Text>
    </Card>
  );
};

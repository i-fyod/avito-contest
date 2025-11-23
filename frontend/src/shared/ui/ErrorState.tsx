import { XCircle } from "lucide-react";
import { Center, Paper, Stack, Text, useMantineTheme } from "@mantine/core";

interface ErrorStateProps {
  message: string;
}

export const ErrorState = ({ message }: ErrorStateProps) => {
  const theme = useMantineTheme();
  return (
    <Center style={{ height: "100vh" }}>
      <Paper shadow="md" p="xl" radius="md" withBorder>
        <Stack align="center" gap="md">
          <XCircle size={48} color={theme.colors.red[6]} />
          <Text c="red" size="lg" fw={500}>
            {message}
          </Text>
        </Stack>
      </Paper>
    </Center>
  );
};

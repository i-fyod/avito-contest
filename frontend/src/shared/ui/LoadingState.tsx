import { Center, Loader, Stack, Text } from "@mantine/core";

export const LoadingState = () => (
  <Center style={{ height: "100vh" }}>
    <Stack align="center" gap="md">
      <Loader size="xl" type="bars" />
      <Text size="lg" fw={500} c="dimmed">
        Загрузка статистики...
      </Text>
    </Stack>
  </Center>
);

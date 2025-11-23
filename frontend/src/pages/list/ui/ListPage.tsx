import { BarChart3, ListFilter } from "lucide-react";

import { useNavigate } from "react-router-dom";

import {
  Alert,
  Badge,
  Box,
  Button,
  Flex,
  Group,
  Loader,
  Paper,
  Stack,
  Text,
  Title,
} from "@mantine/core";

import { Pagination } from "@/features/pagination";

import { Card } from "@/widgets/card";
import { Filters } from "@/widgets/filters";

import { useAdsData } from "@/shared/lib/hooks/useAdsData";

export const ListPage = () => {
  const { ads, pagination, loading, error, activePage, setPage, limit } = useAdsData();
  const navigate = useNavigate();

  return (
    <Box p={{ base: "md", sm: "xl" }} bg="#f8f9fa" mih="100vh">
      <Stack gap="xl" maw={1400} mx="auto">
        <Paper shadow="xs" p="lg" radius="md" withBorder>
          <Flex
            direction={{ base: "column", sm: "row" }}
            justify="space-between"
            align={{ base: "start", sm: "center" }}
            gap="md">
            <Box>
              <Title order={1} size="h2" mb={4}>
                📋 Объявления на модерации
              </Title>
              <Text c="dimmed" size="sm">
                Проверяйте и принимайте решения по объявлениям
              </Text>
            </Box>

            <Button
              leftSection={<BarChart3 size={18} />}
              onClick={() => navigate("/stats")}
              size="md">
              Моя статистика
            </Button>
          </Flex>

          {pagination && (
            <Group mt="md" gap="xs">
              <Badge size="lg" variant="light" color="blue" leftSection={<ListFilter size={14} />}>
                Всего объявлений: {pagination.totalItems}
              </Badge>
              <Badge size="lg" variant="light" color="gray">
                Страница {activePage} из {pagination.totalPages}
              </Badge>
            </Group>
          )}
        </Paper>

        <Paper shadow="xs" p="lg" radius="md" withBorder>
          <Filters />
        </Paper>

        {loading && (
          <Paper shadow="sm" p="xl" radius="md" withBorder>
            <Stack align="center" gap="md">
              <Loader size="xl" type="bars" />
              <Text size="lg" fw={500} c="dimmed">
                Загрузка объявлений...
              </Text>
            </Stack>
          </Paper>
        )}

        {error && (
          <Paper shadow="md" p="xl" radius="md" withBorder>
            <Alert title="Ошибка" color="red" variant="light">
              {error}
            </Alert>
          </Paper>
        )}

        {!loading && !error && ads.length > 0 && (
          <>
            <Stack gap="md">
              {ads.map((ad) => (
                <Card key={ad.id} ad={ad} />
              ))}
            </Stack>
            {pagination && (
              <Paper shadow="xs" p="md" radius="md" withBorder>
                <Pagination
                  total={pagination.totalPages}
                  page={activePage}
                  onChange={setPage}
                  limit={limit}
                  totalAds={pagination.totalItems}
                />
              </Paper>
            )}
          </>
        )}

        {!loading && !error && ads.length === 0 && (
          <Paper shadow="md" p="xl" radius="md" withBorder>
            <Alert title="Ничего не найдено" color="blue" variant="light">
              Попробуйте изменить параметры фильтрации.
            </Alert>
          </Paper>
        )}
      </Stack>
    </Box>
  );
};

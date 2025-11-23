import { Alert, Box, Loader, Stack } from "@mantine/core";

import { Pagination } from "@/features/pagination";

import { Card } from "@/widgets/card";
import { Filters } from "@/widgets/filters";

import { useAdsData } from "@/shared/lib/hooks/useAdsData";

export const ListPage = () => {
  const { ads, pagination, loading, error, activePage, setPage, limit } = useAdsData();

  return (
    <Box w="70%" m="0 auto" py="xl">
      <Filters />
      {loading && <Loader m="0 auto" />}
      {error && (
        <Alert title="Ошибка" color="red" withCloseButton>
          {error}
        </Alert>
      )}
      {!loading && !error && ads.length > 0 && (
        <>
          <Stack gap="lg">
            {ads.map((ad) => (
              <Card key={ad.id} ad={ad} />
            ))}
          </Stack>
          {pagination && (
            <Pagination
              total={pagination.totalPages}
              page={activePage}
              onChange={setPage}
              limit={limit}
              totalAds={pagination.totalItems}
            />
          )}
        </>
      )}
      {!loading && !error && ads.length === 0 && (
        <Alert title="Ничего не найдено" color="blue">
          Попробуйте изменить параметры фильтрации.
        </Alert>
      )}
    </Box>
  );
};

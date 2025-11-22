import { useEffect, useState } from "react"
import { Card } from "@/widgets/card"
import { Box, Stack, Loader, Alert } from "@mantine/core"
import axios from "axios"
import { AdCardData } from "@/entities/ad/model/types"
import { Pagination } from "@/features/pagination"

interface PaginationState {
  currentPage: number
  totalPages: number
  totalItems: number
  itemsPerPage: number
}

export const ListPage = () => {
  const [ads, setAds] = useState<AdCardData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activePage, setPage] = useState(1)
  const [pagination, setPagination] = useState<PaginationState | null>(null)
  const limit = 10

  useEffect(() => {
    const fetchAds = async () => {
      try {
        setLoading(true)
        const response = await axios.get("/api/v1/ads", {
          params: { page: activePage, limit },
        })
        setAds(response.data.ads)
        setPagination(response.data.pagination)
        setError(null)
      } catch (err) {
        setError("Не удалось загрузить объявления.")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchAds()
  }, [activePage])

  return (
    <Box w="70%" m="0 auto" py="xl">
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
              page={pagination.currentPage}
              onChange={setPage}
              limit={pagination.itemsPerPage}
              totalAds={pagination.totalItems}
            />
          )}
        </>
      )}
    </Box>
  )
}

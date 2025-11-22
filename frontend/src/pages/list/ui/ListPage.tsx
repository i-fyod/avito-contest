import { useEffect, useState } from "react"
import { Card } from "@/widgets/card"
import { Box, Stack, Loader, Alert } from "@mantine/core"
import axios from "axios"
import { AdCardData } from "@/entities/ad/model/types"

export const ListPage = () => {
  const [ads, setAds] = useState<AdCardData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchAds = async () => {
      try {
        setLoading(true)
        const response = await axios.get("/api/v1/ads")
        setAds(response.data.ads)
        setError(null)
      } catch (err) {
        setError("Не удалось загрузить объявления.")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchAds()
  }, [])

  return (
    <Box w="70%" m="0 auto" py="xl">
      {loading && <Loader m="0 auto" />}
      {error && (
        <Alert title="Ошибка" color="red" withCloseButton>
          {error}
        </Alert>
      )}
      {!loading && !error && (
        <Stack gap="lg">
          {ads.map((ad) => (
            <Card key={ad.id} ad={ad} />
          ))}
        </Stack>
      )}
    </Box>
  )
}

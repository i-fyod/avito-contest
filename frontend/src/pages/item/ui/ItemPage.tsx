import { AlertCircle, ArrowLeft, Eye } from "lucide-react";

import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  Alert,
  Badge,
  Box,
  Button,
  Flex,
  Grid,
  Group,
  Loader,
  Paper,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import { RejectAdModal } from "@/features/rejectAdModal";

import { AdInfo } from "@/widgets/AdInfo";
import { ModerationHistory } from "@/widgets/ModerationHistory";
import { ModerationPanel } from "@/widgets/ModerationPanel";
import { SellerProfile } from "@/widgets/SellerProfile";

import { approveAd, requestAdChanges } from "@/shared/api";
import { useAdDetails } from "@/shared/lib/hooks/useAdDetails";

export const ItemPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const adId = Number(id);

  const { ad, loading, error, refetch } = useAdDetails(adId);

  const [modalOpened, { open: openModal, close: closeModal }] = useDisclosure(false);
  const [isApproveLoading, setIsApproveLoading] = useState(false);
  const [isReviseLoading, setIsReviseLoading] = useState(false);
  const [isRejectLoading, setIsRejectLoading] = useState(false);
  const [approvalError, setApprovalError] = useState<string | null>(null);
  const [reviseError, setReviseError] = useState<string | null>(null);

  const handleApprove = async () => {
    setIsApproveLoading(true);
    setApprovalError(null);
    try {
      await approveAd(adId);
      refetch();
    } catch (err) {
      setApprovalError("Ошибка при одобрении объявления. Пожалуйста, попробуйте снова.");
    } finally {
      setIsApproveLoading(false);
    }
  };

  const handleRevise = async () => {
    setIsReviseLoading(true);
    setReviseError(null);
    try {
      await requestAdChanges(adId);
      refetch();
    } catch (err) {
      setReviseError("Ошибка при возврате на доработку. Пожалуйста, попробуйте снова.");
    } finally {
      setIsReviseLoading(false);
    }
  };

  const handleReject = async () => {
    setIsRejectLoading(true);
    openModal();
  };

  const calculatedPreviousAdId = adId - 1 > 0 ? adId - 1 : null;
  const calculatedNextAdId = adId + 1;

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { color: string; label: string }> = {
      pending: { color: "yellow", label: "На модерации" },
      approved: { color: "teal", label: "Одобрено" },
      rejected: { color: "red", label: "Отклонено" },
      changes_requested: { color: "orange", label: "На доработке" },
    };

    const config = statusConfig[status] || { color: "gray", label: status };
    return (
      <Badge size="lg" variant="light" color={config.color}>
        {config.label}
      </Badge>
    );
  };

  if (loading) {
    return (
      <Box p={{ base: "md", sm: "xl" }} style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
        <Paper shadow="sm" p="xl" radius="md" withBorder maw={1400} mx="auto">
          <Stack align="center" gap="md">
            <Loader size="xl" type="bars" />
            <Text size="lg" fw={500} c="dimmed">
              Загрузка объявления...
            </Text>
          </Stack>
        </Paper>
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={{ base: "md", sm: "xl" }} style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
        <Paper shadow="md" p="xl" radius="md" withBorder maw={1400} mx="auto">
          <Alert icon={<AlertCircle />} title="Ошибка" color="red" variant="light">
            {error?.message}
          </Alert>
        </Paper>
      </Box>
    );
  }

  if (!ad) {
    return (
      <Box p={{ base: "md", sm: "xl" }} style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
        <Paper shadow="md" p="xl" radius="md" withBorder maw={1400} mx="auto">
          <Alert icon={<AlertCircle />} title="Не найдено" color="yellow" variant="light">
            Не удалось найти детали объявления.
          </Alert>
        </Paper>
      </Box>
    );
  }

  return (
    <>
      <RejectAdModal
        adId={adId}
        opened={modalOpened}
        onClose={() => {
          closeModal();
          setIsRejectLoading(false);
        }}
        onRejectSuccess={() => {
          refetch();
          setIsRejectLoading(false);
        }}
      />

      <Box p={{ base: "md", sm: "xl" }} style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
        <Stack gap="xl" maw={1400} mx="auto">
          <Paper shadow="xs" p="lg" radius="md" withBorder>
            <Flex
              direction={{ base: "column", sm: "row" }}
              justify="space-between"
              align={{ base: "start", sm: "center" }}
              gap="md">
              <Box style={{ flex: 1 }}>
                <Group gap="xs" mb="xs">
                  <Eye size={20} />
                  <Text size="sm" c="dimmed" fw={500}>
                    Просмотр объявления #{adId}
                  </Text>
                </Group>
                <Title order={2} size="h3" lineClamp={2}>
                  {ad.title}
                </Title>
                <Group mt="sm" gap="xs">
                  {getStatusBadge(ad.status)}
                  <Badge size="lg" variant="outline" color="gray">
                    ID: {adId}
                  </Badge>
                </Group>
              </Box>

              <Button
                variant="light"
                color="blue"
                leftSection={<ArrowLeft size={18} />}
                onClick={() => navigate("/list")}
                styles={{
                  root: {
                    transition: "all 0.2s ease",
                    "&:hover": {
                      transform: "translateX(-4px)",
                    },
                  },
                }}>
                К списку
              </Button>
            </Flex>
            {(approvalError || reviseError) && (
              <Stack gap="xs" mt="md">
                {approvalError && (
                  <Alert
                    color="red"
                    title="Ошибка одобрения"
                    icon={<AlertCircle />}
                    variant="light">
                    {approvalError}
                  </Alert>
                )}
                {reviseError && (
                  <Alert
                    color="red"
                    title="Ошибка доработки"
                    icon={<AlertCircle />}
                    variant="light">
                    {reviseError}
                  </Alert>
                )}
              </Stack>
            )}
          </Paper>

          <Grid gutter="md">
            <Grid.Col span={{ base: 12, lg: 8 }}>
              <Paper shadow="sm" p="lg" radius="md" withBorder>
                <AdInfo
                  images={ad.images}
                  description={ad.description}
                  characteristics={ad.characteristics}
                />
              </Paper>
            </Grid.Col>

            <Grid.Col span={{ base: 12, lg: 4 }}>
              <Stack gap="md">
                <SellerProfile seller={ad.seller} />

                <ModerationHistory moderationHistory={ad.moderationHistory} />

                <ModerationPanel
                  onApproveClick={handleApprove}
                  onRejectClick={handleReject}
                  onReviseClick={handleRevise}
                  onPreviousClick={() => {
                    if (calculatedPreviousAdId) {
                      navigate(`/item/${calculatedPreviousAdId}`);
                    }
                  }}
                  onNextClick={() => {
                    navigate(`/item/${calculatedNextAdId}`);
                  }}
                  disablePrevious={calculatedPreviousAdId === null}
                  disableNext={false}
                  isApproveLoading={isApproveLoading}
                  isReviseLoading={isReviseLoading}
                  isRejectLoading={isRejectLoading}
                  currentAdStatus={ad.status}
                />
              </Stack>
            </Grid.Col>
          </Grid>
        </Stack>
      </Box>
    </>
  );
};

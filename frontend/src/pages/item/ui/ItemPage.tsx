import { AlertCircle, ArrowLeft } from "lucide-react";

import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Alert, Button, Container, Grid, Group, Loader, Stack, Title } from "@mantine/core";
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

  if (loading) {
    return (
      <Container style={{ textAlign: "center", paddingTop: "5rem" }}>
        <Loader />
      </Container>
    );
  }

  if (error) {
    return (
      <Container pt="lg">
        <Alert icon={<AlertCircle />} title="Ошибка" color="red">
          {error?.message}
        </Alert>
      </Container>
    );
  }

  if (!ad) {
    return (
      <Container pt="lg">
        <Alert icon={<AlertCircle />} title="Не найдено" color="yellow">
          Не удалось найти детали объявления.
        </Alert>
      </Container>
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

      <Container fluid p="lg">
        <header>
          <Group justify="space-between" mb="xl">
            <Title order={2}>{ad.title}</Title>
            <Group>
              {approvalError && (
                <Alert color="red" title="Ошибка" icon={<AlertCircle />} variant="light">
                  {approvalError}
                </Alert>
              )}
              {reviseError && (
                <Alert color="red" title="Ошибка" icon={<AlertCircle />} variant="light">
                  {reviseError}
                </Alert>
              )}
              <Button
                onClick={() => navigate("/list")}
                leftSection={<ArrowLeft size={16} />}
                variant="default">
                Назад к списку
              </Button>
            </Group>
          </Group>
        </header>

        <Grid>
          <Grid.Col span={{ base: 12, lg: 8 }}>
            <AdInfo
              images={ad.images}
              description={ad.description}
              characteristics={ad.characteristics}
            />
          </Grid.Col>

          <Grid.Col span={{ base: 12, lg: 4 }}>
            <Stack>
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
      </Container>
    </>
  );
};

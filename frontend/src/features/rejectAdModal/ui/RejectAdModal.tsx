import { AlertCircle } from "lucide-react";

import React, { useEffect, useState } from "react";

import {
  Alert,
  Button,
  Group,
  Modal,
  Radio,
  Stack,
  Text,
  Textarea,
  Title,
  useMantineTheme,
} from "@mantine/core";

import { rejectAd } from "@/shared/api";

interface RejectAdModalProps {
  adId: number;
  opened: boolean;
  onClose: () => void;
  onRejectSuccess: () => void;
}

const REJECTION_REASONS = [
  "Запрещенный товар",
  "Неверная категория",
  "Некорректное описание",
  "Проблемы с фото",
  "Подозрение на мошенничество",
  "Другое",
];

export const RejectAdModal: React.FC<RejectAdModalProps> = ({
  adId,
  opened,
  onClose,
  onRejectSuccess,
}) => {
  const theme = useMantineTheme();
  const [selectedReason, setSelectedReason] = useState<string | null>(null);
  const [otherReasonComment, setOtherReasonComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rejectionError, setRejectionError] = useState<string | null>(null);

  const handleReject = async () => {
    if (!selectedReason || (selectedReason === "Другое" && !otherReasonComment.trim())) {
      setRejectionError(
        "Пожалуйста, выберите причину отклонения или укажите комментарий для 'Другое'."
      );
      return;
    }

    setIsSubmitting(true);
    setRejectionError(null);
    try {
      await rejectAd(adId, {
        reason: selectedReason,
        comment: selectedReason === "Другое" ? otherReasonComment.trim() : undefined,
      });
      onRejectSuccess();
      onClose();
    } catch (err) {
      setRejectionError("Ошибка при отклонении объявления. Пожалуйста, попробуйте снова.");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (!opened) {
      setSelectedReason(null);
      setOtherReasonComment("");
      setRejectionError(null);
    }
  }, [opened]);

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={
        <Group>
          <AlertCircle size={24} color={theme.colors.red[6]} />
          <Title order={3} c="red">
            Причина отклонения
          </Title>
        </Group>
      }>
      <Text size="sm" c="dimmed" mb="lg">
        Пожалуйста, выберите хотя бы одну причину. Это будет отправлено пользователю.
      </Text>
      <Stack>
        <Radio.Group
          value={selectedReason}
          onChange={setSelectedReason}
          name="rejectionReason"
          label="Причина"
          withAsterisk>
          {REJECTION_REASONS.map((reason) => (
            <Radio key={reason} value={reason} label={reason} my="xs" />
          ))}
        </Radio.Group>

        {selectedReason === "Другое" && (
          <Textarea
            label="Комментарий"
            placeholder="Пожалуйста, укажите причину"
            value={otherReasonComment}
            onChange={(event) => setOtherReasonComment(event.currentTarget.value)}
            autosize
            minRows={2}
            mt="md"
          />
        )}

        {rejectionError && (
          <Alert color="red" title="Ошибка" icon={<AlertCircle />} mt="md">
            {rejectionError}
          </Alert>
        )}
      </Stack>
      <Group justify="flex-end" mt="xl">
        <Button variant="default" onClick={onClose} disabled={isSubmitting}>
          Отмена
        </Button>
        <Button
          color="red"
          onClick={handleReject}
          loading={isSubmitting}
          disabled={!selectedReason || (selectedReason === "Другое" && !otherReasonComment.trim())}>
          Подтвердить отклонение
        </Button>
      </Group>
    </Modal>
  );
};

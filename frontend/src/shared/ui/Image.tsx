import { useState } from 'react';
import { Image as MantineImage, Flex, Text, ImageProps } from '@mantine/core';

interface CustomImageProps extends ImageProps {
  src?: string | null;
}

export function Image({ src, w = 120, h = 120, ...props }: CustomImageProps) {
  const [error, setError] = useState(!src);

  if (error) {
    return (
      <Flex
        w={w}
        h={h}
        bg="gray.1"
        bdrs="md"
        justify="center"
        align="center"
        style={{ overflow: 'hidden' }}
      >
        <Text fz={12} fw={500} c="gray.6">
          Фотография
        </Text>
      </Flex>
    );
  }

  return (
    <MantineImage
      src={src}
      w={w}
      h={h}
      radius="md"
      onError={() => setError(true)}
      {...props}
    />
  );
}

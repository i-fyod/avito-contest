import { Image as ImageIcon } from "lucide-react";

import React, { useEffect, useState } from "react";

import { Box, Group, Image, SimpleGrid, Title } from "@mantine/core";

import { Ad } from "@/entities/ad/model/types";

interface ImageGalleryProps {
  images: Ad["images"];
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (images && images.length > 0) {
      setSelectedImage(images[0]);
    }
  }, [images]);

  return (
    <>
      <Group gap="sm" align="center" mb="md">
        <ImageIcon />
        <Title order={4}>Галерея изображений ({images.length})</Title>
      </Group>
      <Box mb="md">
        <Image
          radius="md"
          src={selectedImage}
          alt="Выбранное изображение"
          mah={400}
          bd="2px solid blue.6"
        />
      </Box>
      <SimpleGrid cols={4} spacing="sm">
        {images.map((image: string, index: number) => (
          <Box
            key={index}
            onClick={() => setSelectedImage(image)}
            bdrs="sm"
            bd={`2px solid ${selectedImage === image ? "blue.6" : "transparent"}`}
            style={{
              cursor: "pointer",
              overflow: "hidden",
            }}>
            <Image src={image} alt={`Изображение ${index + 1}`} radius="xs" />
          </Box>
        ))}
      </SimpleGrid>
    </>
  );
};

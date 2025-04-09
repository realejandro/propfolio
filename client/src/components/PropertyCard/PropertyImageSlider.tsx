import { Box, Image, IconButton } from '@chakra-ui/react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { useState } from 'react';

interface PropertyImageSliderProps {
  photos: string[];
}

const PropertyImageSlider = ({ photos }: PropertyImageSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  if (!photos || photos.length === 0) return null;

  return (
    <Box position="relative" w="100%" h="300px" bg="gray.400" borderRadius="md" mb={3}>
      <Image
        src={photos[currentIndex]}
        alt={`Property image ${currentIndex + 1}`}
        objectFit="contain"
        borderRadius="md"
        boxSize="100%"
        maxH="300px"
        mx="auto"
      />

      {photos.length > 1 && (
        <>
          <IconButton
            aria-label="Previous image"
            onClick={handlePrev}
            position="absolute"
            top="50%"
            left="2"
            transform="translateY(-50%)"
            bg="whiteAlpha.800"
            _hover={{ bg: 'white' }}
            size="sm"
            borderRadius="full"
          >
            <FaArrowLeft />
          </IconButton>

          <IconButton
            aria-label="Next image"
            onClick={handleNext}
            position="absolute"
            top="50%"
            right="2"
            transform="translateY(-50%)"
            bg="whiteAlpha.800"
            _hover={{ bg: 'white' }}
            size="sm"
            borderRadius="full"
            >
            <FaArrowRight />
          </IconButton>
        </>
      )}
    </Box>
  );
};

export default PropertyImageSlider;

/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Box, Heading, Text, Badge, Flex } from '@chakra-ui/react';
import {
  FaRulerCombined,
  FaBed,
  FaBath,
  FaDollarSign,
  FaCommentDots,
  FaStickyNote,
} from 'react-icons/fa';
import { Property } from '../../models/Property';

interface PropertyDetailsProps {
  property: Property;
}

type InfoRow = {
  icon: JSX.Element;
  label: string;
  value: string | number | JSX.Element;
};

const isInfoRow = (item: any): item is InfoRow =>
  item && typeof item === 'object' && 'label' in item && 'value' in item;

const PropertyDetails = ({ property }: PropertyDetailsProps) => {
  const rows: (InfoRow | false)[] = [
    {
      icon: <FaRulerCombined />,
      label: 'Square Footage',
      value: `${property.squareFootage} sqft`,
    },
    {
      icon: <FaBed />,
      label: 'Bedrooms',
      value: property.bedrooms,
    },
    {
      icon: <FaBath />,
      label: 'Bathrooms',
      value: property.bathrooms,
    },
    property.description
      ? {
          icon: <FaCommentDots />,
          label: 'Description',
          value: property.description,
        }
      : false,
    property.notes
      ? {
          icon: <FaStickyNote />,
          label: 'Notes',
          value: property.notes,
        }
      : false,
    property.status === 'rented' && property.income !== undefined
      ? {
          icon: <FaDollarSign />,
          label: 'Monthly Income',
          value: `$${property.income.toLocaleString()}`,
        }
      : false,
  ];

  return (
    <Box
      bg="gray.50"
      p={4}
      borderRadius="md"
      maxH="340px"
      overflow="hidden"
      _hover={{ overflowY: 'auto' }}
      pr={2}
      css={css`
        &::-webkit-scrollbar {
          width: 8px;
        }
      
        &::-webkit-scrollbar-thumb {
          background-color: rgba(100, 100, 100, 0.6); /* more visible gray */
          border-radius: 6px;
          transition: background-color 0.3s ease;
        }
      
        &::-webkit-scrollbar-thumb:hover {
          background-color: rgba(80, 80, 80, 0.8); /* darker on hover */
        }
      
        &::-webkit-scrollbar-track {
          background-color: transparent;
        }
      `} 
    >
      {/* Header: Location + Status */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Heading size="md" textTransform="uppercase">
          {property.location}
        </Heading>
        <Badge
          colorScheme={
            property.status === 'available'
              ? 'green'
              : property.status === 'rented'
              ? 'yellow'
              : 'gray'
          }
        >
          {property.status}
        </Badge>
      </Box>

      {/* Info Rows */}
      {rows.filter(isInfoRow).map((field, idx) => (
        <Flex key={idx} align="start" gap={3} mb={2}>
          <Box mt={1} color="gray.600">
            {field.icon}
          </Box>
          <Text lineHeight="short">
            <Text
              as="span"
              fontWeight="semibold"
              color="gray.700"
              display="inline-block"
              minW="130px"
            >
              {field.label}:
            </Text>{' '}
            {field.value}
          </Text>
        </Flex>
      ))}
    </Box>
  );
};

export default PropertyDetails;


















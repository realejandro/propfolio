import {
    Box,
    Text,
    Heading,
    Button,
    Image,
    Badge,
  } from '@chakra-ui/react';
  import { Property } from '../models/Property';
  
  interface PropertyCardProps {
    property: Property;
    onEdit: (property: Property) => void;
    onDelete: (id: string) => void;
  }
  
  const PropertyCard = ({ property, onEdit, onDelete }: PropertyCardProps) => {
    return (
      <Box
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        boxShadow="sm"
        p={4}
        bg="white"
      >
        {/* Layout container with column direction and spacing */}
        <Box display="flex" flexDirection="column" gap={3}>
          
          {/* Optional Property Image */}
          {property.photo && (
            <Image
              src={property.photo}
              alt="Property image"
              borderRadius="md"
              objectFit="cover"
              w="100%"
              h="200px"
            />
          )}
  
          {/* Heading + Status badge row */}
          <Box display="flex" justifyContent="space-between" alignItems="flex-start">
            <Heading size="md">
              ${property.price.toLocaleString()}
            </Heading>
            <Badge colorScheme={
              property.status === 'available'
                ? 'green'
                : property.status === 'rented'
                ? 'yellow'
                : 'red'
            }>
              {property.status}
            </Badge>
          </Box>
  
          <Text><strong>Square Footage:</strong> {property.squareFootage} sqft</Text>
          <Text><strong>Bedrooms:</strong> {property.bedrooms}</Text>
          <Text><strong>Bathrooms:</strong> {property.bathrooms}</Text>
  
          {property.description && (
            <Text fontStyle="italic" color="gray.600">
              {property.description}
            </Text>
          )}
  
          {/* Action Buttons Row */}
          <Box display="flex" gap={3} pt={2}>
            <Button size="sm" colorScheme="blue" onClick={() => onEdit(property)}>
              Edit
            </Button>
            <Button size="sm" colorScheme="red" onClick={() => onDelete(property._id)}>
              Delete
            </Button>
          </Box>
        </Box>
      </Box>
    );
  };
  
  export default PropertyCard;
  
  
import {
  Box,
  Text,
  Heading,
  Button,
  Image,
  Badge,
  Input,
  Textarea,
  Fieldset,
  Field,
  NativeSelect,
} from '@chakra-ui/react';
import { useToast } from '@chakra-ui/toast';
import { useState } from 'react';
import { Property } from '../models/Property';
import { useMutation } from '@apollo/client';
import { UPDATE_PROPERTY } from '../utils/mutations';

interface PropertyCardProps {
  property: Property;
  onDelete: (id: string) => void;
}

const PropertyCard = ({ property, onDelete }: PropertyCardProps) => {
  const toast = useToast();
  const [isEditing, setIsEditing] = useState(false);

  const [editValues, setEditValues] = useState({
    squareFootage: property.squareFootage,
    bedrooms: property.bedrooms,
    bathrooms: property.bathrooms,
    price: property.price,
    status: property.status,
    location: property.location,
    description: property.description || '',
  });

  const [updateProperty] = useMutation(UPDATE_PROPERTY);

  const handleEditChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setEditValues((prev) => ({
      ...prev,
      [name]: ['squareFootage', 'bedrooms', 'bathrooms', 'price'].includes(name)
        ? parseInt(value) || 0
        : value,
    }));
  };

  const handleSave = async () => {
    try {
      await updateProperty({
        variables: {
          id: property._id,
          input: {
            ...editValues,
          },
        },
      });

      toast({
        title: 'Property updated!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      setIsEditing(false);
    } catch (err) {
      console.error('Error updating property', err);
      toast({
        title: 'Failed to update property.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="sm"
      p={4}
      bg="white"
    >
      <Box display="flex" flexDirection="column" gap={3}>
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

        <Box display="flex" justifyContent="space-between" alignItems="flex-start">
          {isEditing ? (
            <Input
              name="price"
              value={editValues.price.toString()}
              onChange={handleEditChange}
              type="number"
              placeholder="Price"
            />
          ) : (
            <Heading size="md">${property.price.toLocaleString()}</Heading>
          )}
          <Badge
            colorScheme={
              property.status === 'available'
                ? 'green'
                : property.status === 'rented'
                ? 'yellow'
                : 'red'
            }
          >
            {property.status}
          </Badge>
        </Box>

        {isEditing ? (
          <>
            <Fieldset.Root>
              <Field.Root>
                <Field.Label>Square Footage</Field.Label>
                <Input
                  name="squareFootage"
                  value={editValues.squareFootage.toString()}
                  onChange={handleEditChange}
                />
              </Field.Root>
              <Field.Root>
                <Field.Label>Bedrooms</Field.Label>
                <Input
                  name="bedrooms"
                  value={editValues.bedrooms.toString()}
                  onChange={handleEditChange}
                />
              </Field.Root>
              <Field.Root>
                <Field.Label>Bathrooms</Field.Label>
                <Input
                  name="bathrooms"
                  value={editValues.bathrooms.toString()}
                  onChange={handleEditChange}
                />
              </Field.Root>
              <Field.Root>
                <Field.Label>Location</Field.Label>
                <Input
                  name="location"
                  value={editValues.location}
                  onChange={handleEditChange}
                  placeholder="Enter location"
                />
              </Field.Root>
              <Field.Root>
                <Field.Label>Status</Field.Label>
                <NativeSelect.Root>
                  <NativeSelect.Field
                    name="status"
                    value={editValues.status}
                    onChange={handleEditChange}
                  >
                    <option value="available">Available</option>
                    <option value="rented">Rented</option>
                    <option value="sold">Sold</option>
                  </NativeSelect.Field>
                  <NativeSelect.Indicator />
                </NativeSelect.Root>
              </Field.Root>
              <Field.Root>
                <Field.Label>Description</Field.Label>
                <Textarea
                  name="description"
                  value={editValues.description}
                  onChange={handleEditChange}
                  placeholder="Description"
                />
              </Field.Root>
            </Fieldset.Root>
          </>
        ) : (
          <>
            <Text><strong>Square Footage:</strong> {property.squareFootage} sqft</Text>
            <Text><strong>Bedrooms:</strong> {property.bedrooms}</Text>
            <Text><strong>Bathrooms:</strong> {property.bathrooms}</Text>
            <Text><strong>Location:</strong> {property.location}</Text>
            {property.description && (
              <Text fontStyle="italic" color="gray.600">
                {property.description}
              </Text>
            )}
          </>
        )}

        <Box display="flex" gap={3} pt={2}>
          {isEditing ? (
            <>
              <Button size="sm" colorScheme="green" onClick={handleSave}>
                Save
              </Button>
              <Button size="sm" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
            </>
          ) : (
            <>
              <Button size="sm" colorScheme="blue" onClick={() => setIsEditing(true)}>
                Edit
              </Button>
              <Button size="sm" colorScheme="red" onClick={() => onDelete(property._id)}>
                Delete
              </Button>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default PropertyCard;





  
  
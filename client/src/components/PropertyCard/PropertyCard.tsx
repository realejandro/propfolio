import { Box } from '@chakra-ui/react';
import { useToast } from '@chakra-ui/toast';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_PROPERTY } from '../../utils/graphql/mutations';
import { Property } from '../../models/Property';

import PropertyImageSlider from './PropertyImageSlider';
import EditPropertyForm from './EditPropertyForm';
import PropertyDetails from './PropertyDetails';
import PropertyActions from './PropertyActions';

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
    income: property.income || 0,
    status: property.status,
    location: property.location,
    description: property.description || '',
    notes: property.notes || '',
  });

  const [updateProperty] = useMutation(UPDATE_PROPERTY);

  const handleEditChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const numberFields = ['squareFootage', 'bedrooms', 'bathrooms', 'income'];

    setEditValues((prev) => ({
      ...prev,
      [name]: numberFields.includes(name)
        ? parseInt(value) || 0
        : value,
    }));
  };

  const handleSave = async () => {
    try {
      await updateProperty({
        variables: {
          id: property._id,
          input: { ...editValues },
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
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" boxShadow="sm" p={4} bg="white">
      <Box display="flex" flexDirection="column">
        <PropertyImageSlider photos={property.photos} />

        <Box mb={0}>
          {isEditing ? (
            <EditPropertyForm editValues={editValues} handleEditChange={handleEditChange} />
          ) : (
            <PropertyDetails property={property} />
          )}
        </Box>

        <PropertyActions
          propertyId={property._id}
          isEditing={isEditing}
          onEdit={() => setIsEditing(true)}
          onCancel={() => setIsEditing(false)}
          onSave={handleSave}
          onDelete={() => onDelete(property._id)}
        />
      </Box>
    </Box>
  );
};

export default PropertyCard;

















  
  
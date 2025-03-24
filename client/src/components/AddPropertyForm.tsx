import { useState } from 'react';
import {
  Box,
  Input,
  Textarea,
  Button,
  Fieldset,
  Field,
  Alert,
  NativeSelect,
} from '@chakra-ui/react';
import { useToast } from '@chakra-ui/toast';
import { useMutation } from '@apollo/client';
import { ADD_PROPERTY } from '../utils/mutations';
import { PropertyInput } from '../models/Property';

interface AddPropertyFormProps {
  onPropertyAdded?: () => void; // Optional callback
}

// Predefined image options for the photo field
const predefinedImages = [
  '/assets/images/house1.jpg',
  '/assets/images/house2.jpg',
  '/assets/images/apartment1.jpg',
  '/assets/images/apartment2.jpg',
  '/assets/images/house3.jpg',
];

const AddPropertyForm = ({ onPropertyAdded }: AddPropertyFormProps) => {
  const toast = useToast();

  const [formState, setFormState] = useState<PropertyInput>({
    squareFootage: 0,
    bedrooms: 0,
    bathrooms: 0,
    price: 0,
    status: 'available',
    photo: '',
    description: '',
  });

  const [addProperty, { error }] = useMutation(ADD_PROPERTY);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: ['price', 'squareFootage', 'bedrooms', 'bathrooms'].includes(name)
        ? Number(value)
        : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await addProperty({ variables: { input: formState } });

      toast({
        title: 'Property Added!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      onPropertyAdded?.();

      setFormState({
        squareFootage: 0,
        bedrooms: 0,
        bathrooms: 0,
        price: 0,
        status: 'available',
        photo: '',
        description: '',
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box as="form" onSubmit={handleSubmit} p={4} bg="white" borderRadius="md" boxShadow="md">
      {error && (
        <Alert.Root status="error" mb={4}>
          <span style={{ fontWeight: 'bold', marginRight: '8px' }}>⚠️</span>
          Failed to add property. Please try again.
        </Alert.Root>
      )}

      <Fieldset.Root>
        <Fieldset.Legend>Add New Property</Fieldset.Legend>

        <Field.Root>
          <Field.Label>Square Footage</Field.Label>
          <Input type="number" name="squareFootage" value={formState.squareFootage} onChange={handleChange} />
        </Field.Root>

        <Field.Root>
          <Field.Label>Bedrooms</Field.Label>
          <Input type="number" name="bedrooms" value={formState.bedrooms} onChange={handleChange} />
        </Field.Root>

        <Field.Root>
          <Field.Label>Bathrooms</Field.Label>
          <Input type="number" name="bathrooms" value={formState.bathrooms} onChange={handleChange} />
        </Field.Root>

        <Field.Root>
          <Field.Label>Price</Field.Label>
          <Input type="number" name="price" value={formState.price} onChange={handleChange} />
        </Field.Root>

        <Field.Root>
          <Field.Label>Status</Field.Label>
          <Input type="text" name="status" value={formState.status} onChange={handleChange} />
        </Field.Root>

        <Field.Root>
          <Field.Label>Choose Photo</Field.Label>
          <NativeSelect.Root>
            <NativeSelect.Field name="photo" value={formState.photo} onChange={handleChange}>
              <option value="">Select an image</option>
              {predefinedImages.map((src, index) => (
                <option key={index} value={src}>
                  Image {index + 1}
                </option>
              ))}
            </NativeSelect.Field>
            <NativeSelect.Indicator />
          </NativeSelect.Root>
        </Field.Root>

        <Field.Root>
          <Field.Label>Description</Field.Label>
          <Textarea name="description" value={formState.description} onChange={handleChange} placeholder="Optional" />
        </Field.Root>
      </Fieldset.Root>

      <Button mt={4} colorScheme="teal" type="submit" w="full">
        Add Property
      </Button>
    </Box>
  );
};

export default AddPropertyForm;


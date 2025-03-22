import { useState } from 'react';
import {
  Box,
  Input,
  Textarea,
  Button,
  Fieldset,
  Field,
  Alert,
} from '@chakra-ui/react';
import { useToast } from '@chakra-ui/toast';
import { useMutation } from '@apollo/client';
import { ADD_PROPERTY } from '../utils/mutations';
import { PropertyInput } from '../models/Property';

interface AddPropertyFormProps {
  onPropertyAdded?: () => void; // Optional callback
}

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: name === 'price' || name === 'squareFootage' || name === 'bedrooms' || name === 'bathrooms'
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

      onPropertyAdded?.(); // Optional callback after mutation

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
          <Field.Label>Photo URL</Field.Label>
          <Input type="text" name="photo" value={formState.photo} onChange={handleChange} placeholder="Optional" />
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



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
  Text,
} from '@chakra-ui/react';
import { useToast } from '@chakra-ui/toast';
import { useMutation } from '@apollo/client';
import { ADD_PROPERTY } from '../utils/mutations';
import { PropertyInput } from '../models/Property';

interface AddPropertyFormProps {
  onPropertyAdded?: () => void;
}

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
    location: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [addProperty, { error }] = useMutation(ADD_PROPERTY);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (["price", "squareFootage", "bedrooms", "bathrooms"].includes(name)) {
      const parsed = parseInt(value);

      if (isNaN(parsed) || parsed <= 0 || value.includes('.')) {
        setErrors((prev) => ({ ...prev, [name]: 'Must be a positive whole number greater than zero' }));
      } else {
        setErrors((prev) => ({ ...prev, [name]: '' }));
        setFormState((prev) => ({ ...prev, [name]: parsed }));
      }
    } else if (name === 'location') {
      const isValid = /^[a-zA-Z0-9\s,]{3,100}$/.test(value);
      if (!isValid) {
        setErrors((prev) => ({ ...prev, location: 'Enter 3–100 characters (letters, numbers, commas)' }));
      } else {
        setErrors((prev) => ({ ...prev, location: '' }));
      }
      setFormState((prev) => ({ ...prev, location: value }));
    } else {
      setFormState((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const requiredFields = ["squareFootage", "bedrooms", "bathrooms", "price"];
    let formIsValid = true;
    const newErrors: { [key: string]: string } = {};

    requiredFields.forEach((field) => {
      const value = formState[field as keyof PropertyInput];
      if (typeof value !== "number" || value <= 0 || !Number.isInteger(value)) {
        newErrors[field] = "Must be a positive whole number greater than zero";
        formIsValid = false;
      }
    });

    if (!formState.location || formState.location.length < 3 || formState.location.length > 100) {
      newErrors.location = "Enter 3–100 characters (letters, numbers, commas)";
      formIsValid = false;
    }

    if (!formIsValid) {
      setErrors(newErrors);
      return;
    }

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
        location: '',
      });
      setErrors({});
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
          <Field.Label>Location</Field.Label>
          <Input
            name="location"
            value={formState.location}
            onChange={handleChange}
            type="text"
            placeholder="e.g. 123 Main St, Springfield"
          />
          {errors.location && <Text color="red.500" fontSize="sm">{errors.location}</Text>}
        </Field.Root>

        <Field.Root>
          <Field.Label>Square Footage</Field.Label>
          <Input
            name="squareFootage"
            value={formState.squareFootage || ''}
            onChange={handleChange}
            type="text"
            inputMode="numeric"
          />
          {errors.squareFootage && <Text color="red.500" fontSize="sm">{errors.squareFootage}</Text>}
        </Field.Root>

        <Field.Root>
          <Field.Label>Bedrooms</Field.Label>
          <Input
            name="bedrooms"
            value={formState.bedrooms || ''}
            onChange={handleChange}
            type="text"
            inputMode="numeric"
          />
          {errors.bedrooms && <Text color="red.500" fontSize="sm">{errors.bedrooms}</Text>}
        </Field.Root>

        <Field.Root>
          <Field.Label>Bathrooms</Field.Label>
          <Input
            name="bathrooms"
            value={formState.bathrooms || ''}
            onChange={handleChange}
            type="text"
            inputMode="numeric"
          />
          {errors.bathrooms && <Text color="red.500" fontSize="sm">{errors.bathrooms}</Text>}
        </Field.Root>

        <Field.Root>
          <Field.Label>Price</Field.Label>
          <Input
            name="price"
            value={formState.price || ''}
            onChange={handleChange}
            type="text"
            inputMode="numeric"
          />
          {errors.price && <Text color="red.500" fontSize="sm">{errors.price}</Text>}
        </Field.Root>

        <Field.Root>
          <Field.Label>Status</Field.Label>
          <NativeSelect.Root>
            <NativeSelect.Field name="status" value={formState.status} onChange={handleChange}>
              <option value="available">Available</option>
              <option value="rented">Rented</option>
              <option value="sold">Sold</option>
            </NativeSelect.Field>
            <NativeSelect.Indicator />
          </NativeSelect.Root>
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





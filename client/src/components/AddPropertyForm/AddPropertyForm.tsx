import { useState } from 'react';
import {
  Box,
  Button,
  Fieldset,
  Alert,
} from '@chakra-ui/react';
import { useToast } from '@chakra-ui/toast';
import { useMutation } from '@apollo/client';
import { ADD_PROPERTY } from '../../utils/graphql/mutations';
import { PropertyInput } from '../../models/Property';
import { QUERY_ME } from '../../utils/graphql/queries';
import { useNavigate } from 'react-router-dom';
import { validatePropertyForm } from '../../utils/form/validatePropertyForm';
import PropertyFieldInputs from '../AddPropertyForm/PropertyFieldInputs';
import PropertyFileUpload from '../AddPropertyForm/PropertyFileUpload';

interface AddPropertyFormProps {
  onPropertyAdded?: () => void;
}

const AddPropertyForm = ({ onPropertyAdded }: AddPropertyFormProps) => {
  const toast = useToast();
  const navigate = useNavigate();

  const [formState, setFormState] = useState<PropertyInput>({
    squareFootage: 0,
    bedrooms: 0,
    bathrooms: 0,
    income: 0,
    status: 'available',
    photos: [],
    description: '',
    location: '',
    notes: '',
  });

  const [uploading, setUploading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const [addProperty, { error }] = useMutation(ADD_PROPERTY, {
    refetchQueries: [{ query: QUERY_ME }],
    awaitRefetchQueries: true,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (['income', 'squareFootage', 'bedrooms', 'bathrooms'].includes(name)) {
      const parsed = parseInt(value);
      if (isNaN(parsed) || parsed < 0 || value.includes('.')) {
        setErrors((prev) => ({ ...prev, [name]: 'Must be a positive whole number' }));
      } else {
        setErrors((prev) => ({ ...prev, [name]: '' }));
        setFormState((prev) => ({ ...prev, [name]: parsed }));
      }
    } else if (name === 'location') {
      const isValid = /^[a-zA-Z0-9\s,]{3,100}$/.test(value);
      setErrors((prev) => ({ ...prev, location: isValid ? '' : 'Enter 3–100 characters (letters, numbers, commas)' }));
      setFormState((prev) => ({ ...prev, location: value }));
    } else {
      setFormState((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (uploading) {
      toast({
        title: 'Uploading images...',
        description: 'Please wait for image upload to finish before submitting.',
        status: 'info',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const { isValid, errors: validationErrors } = validatePropertyForm(formState);
    if (!isValid) {
      setErrors(validationErrors);
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
      navigate('/properties');

      setFormState({
        squareFootage: 0,
        bedrooms: 0,
        bathrooms: 0,
        income: 0,
        status: 'available',
        photos: [],
        description: '',
        location: '',
        notes: '',
      });
      setErrors({});
    } catch (err) {
      console.error('❌ Mutation error:', err);
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

        <PropertyFieldInputs
          formState={formState}
          errors={errors}
          handleChange={handleChange}
        />

        <PropertyFileUpload
          uploading={uploading}
          setUploading={setUploading}
          photos={formState.photos}
          setPhotos={(urls) => setFormState((prev) => ({ ...prev, photos: urls }))}
        />
      </Fieldset.Root>

      <Button mt={4} colorScheme="teal" type="submit" w="full" disabled={uploading}>
        Add Property
      </Button>
    </Box>
  );
};

export default AddPropertyForm;














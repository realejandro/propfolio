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
  Spinner,
} from '@chakra-ui/react';
import { useToast } from '@chakra-ui/toast';
import { useMutation } from '@apollo/client';
import { ADD_PROPERTY } from '../utils/mutations';
import { PropertyInput } from '../models/Property';
import { QUERY_ME } from '../utils/queries';
import { useNavigate } from 'react-router-dom';

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
    price: 0,
    status: 'available',
    photos: [],
    description: '',
    location: '',
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

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
  
    console.log('📤 Starting file upload...');
    setUploading(true);
    const uploadedUrls: string[] = [];
  
    for (const file of Array.from(files)) {
      const formData = new FormData();
      formData.append('images', file); // ✅ FIXED field name
  
      try {
        const res = await fetch('http://localhost:3001/api/upload-multiple', {
          method: 'POST',
          body: formData,
        });
        
        const data = await res.json();
        if (res.ok && data.url) {
          console.log(`✅ Uploaded ${file.name}:`, data.url);
          uploadedUrls.push(data.url);
        } else if (res.ok && data.urls) {
          // ✅ Cloudinary multiple-upload returns "urls" array
          data.urls.forEach((url: string) => {
            console.log(`✅ Uploaded:`, url);
            uploadedUrls.push(url);
          });
        } else {
          throw new Error(data.message || 'Upload failed');
        }
      } catch (error) {
        console.error('Upload error:', error);
        toast({
          title: 'Upload failed',
          description: 'One or more images failed to upload.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    }
  
    console.log('✅ All uploaded URLs:', uploadedUrls);
    setFormState((prev) => ({ ...prev, photos: [...prev.photos, ...uploadedUrls] }));
    setUploading(false);
  };
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('🚦Submitting form. Uploading =', uploading);
    console.log('📦 Final formState before mutation:', formState);

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
      navigate('/properties');

      setFormState({
        squareFootage: 0,
        bedrooms: 0,
        bathrooms: 0,
        price: 0,
        status: 'available',
        photos: [],
        description: '',
        location: '',
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

        {/* Existing form fields below (unchanged) */}
        <Field.Root>
          <Field.Label>Location</Field.Label>
          <Input name="location" value={formState.location} onChange={handleChange} />
          {errors.location && <Text color="red.500" fontSize="sm">{errors.location}</Text>}
        </Field.Root>

        <Field.Root>
          <Field.Label>Square Footage</Field.Label>
          <Input name="squareFootage" value={formState.squareFootage || ''} onChange={handleChange} />
          {errors.squareFootage && <Text color="red.500" fontSize="sm">{errors.squareFootage}</Text>}
        </Field.Root>

        <Field.Root>
          <Field.Label>Bedrooms</Field.Label>
          <Input name="bedrooms" value={formState.bedrooms || ''} onChange={handleChange} />
          {errors.bedrooms && <Text color="red.500" fontSize="sm">{errors.bedrooms}</Text>}
        </Field.Root>

        <Field.Root>
          <Field.Label>Bathrooms</Field.Label>
          <Input name="bathrooms" value={formState.bathrooms || ''} onChange={handleChange} />
          {errors.bathrooms && <Text color="red.500" fontSize="sm">{errors.bathrooms}</Text>}
        </Field.Root>

        <Field.Root>
          <Field.Label>Price</Field.Label>
          <Input name="price" value={formState.price || ''} onChange={handleChange} />
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

        {/* ✅ Image Upload Field */}
        <Field.Root>
          <Field.Label>Upload Photos</Field.Label>
          <Input
            type="file"
            accept=".jpg,.png"
            multiple
            onChange={handleFileUpload}
            disabled={uploading}
          />
          {uploading && <Spinner size="sm" mt={2} />}
        </Field.Root>

        <Field.Root>
          <Field.Label>Description</Field.Label>
          <Textarea name="description" value={formState.description} onChange={handleChange} />
        </Field.Root>
      </Fieldset.Root>

      <Button
        mt={4}
        colorScheme="teal"
        type="submit"
        w="full"
        disabled={uploading} // ✅ Ensures form can't submit during uploads
      >
        Add Property
      </Button>
    </Box>
  );
};

export default AddPropertyForm;








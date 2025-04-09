import { useState } from 'react';
import {
  Box,
  Input,
  Textarea,
  Button,
  Fieldset,
  Field,
  Alert,
  Text,
} from '@chakra-ui/react';
import { useToast } from '@chakra-ui/toast';
import { useMutation } from '@apollo/client';
import { ADD_ROOM } from '../utils/graphql/mutations';
import { QUERY_ROOMS_BY_PROPERTY } from '../utils/graphql/queries';
import { RoomInput } from '../models/Room';
import { useNavigate } from 'react-router-dom';

interface AddRoomFormProps {
  propertyId: string;
  onRoomAdded?: () => void;
}

const AddRoomForm = ({ propertyId, onRoomAdded }: AddRoomFormProps) => {
  const toast = useToast();
  const navigate = useNavigate();

  const [formState, setFormState] = useState<RoomInput>({
    propertyId,
    title: '',
    squareFootage: 0,
    photo: '',
    description: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [addRoom, { error }] = useMutation(ADD_ROOM, {
    refetchQueries: [
      {
        query: QUERY_ROOMS_BY_PROPERTY,
        variables: { propertyId },
      },
    ],
    awaitRefetchQueries: true,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name === 'squareFootage') {
      const parsed = parseInt(value);
      if (isNaN(parsed) || parsed <= 0 || value.includes('.')) {
        setErrors((prev) => ({
          ...prev,
          squareFootage: 'Must be a positive whole number greater than zero',
        }));
      } else {
        setErrors((prev) => ({ ...prev, squareFootage: '' }));
        setFormState((prev) => ({ ...prev, squareFootage: parsed }));
      }
    } else {
      setFormState((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formState.squareFootage || formState.squareFootage <= 0) {
      setErrors({
        squareFootage: 'Must be a positive whole number greater than zero',
      });
      return;
    }

    try {
      await addRoom({ variables: { input: formState } });

      toast({
        title: 'Room Added!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      onRoomAdded?.();

      navigate(`/properties/${propertyId}/rooms`);

      setFormState({
        propertyId,
        title: '',
        squareFootage: 0,
        photo: '',
        description: '',
      });
      setErrors({});
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box
      as="form"
      onSubmit={handleSubmit}
      p={4}
      bg="white"
      borderRadius="md"
      boxShadow="md"
    >
      {error && (
        <Alert.Root status="error" mb={4}>
          <span style={{ fontWeight: 'bold', marginRight: '8px' }}>⚠️</span>
          Failed to add room. Please try again.
        </Alert.Root>
      )}

      <Fieldset.Root>
        <Fieldset.Legend>Add New Room</Fieldset.Legend>

        <Field.Root>
          <Field.Label>Room Name</Field.Label>
          <Input
            name="title"
            value={formState.title}
            onChange={handleChange}
            type="text"
            placeholder="e.g. Kitchen, Bedroom 1"
          />
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
          {errors.squareFootage && (
            <Text color="red.500" fontSize="sm">
              {errors.squareFootage}
            </Text>
          )}
        </Field.Root>

        <Field.Root>
          <Field.Label>Photo URL</Field.Label>
          <Input
            name="photo"
            value={formState.photo}
            onChange={handleChange}
            type="text"
            placeholder="Optional"
          />
        </Field.Root>

        <Field.Root>
          <Field.Label>Description</Field.Label>
          <Textarea
            name="description"
            value={formState.description}
            onChange={handleChange}
            placeholder="Optional"
          />
        </Field.Root>
      </Fieldset.Root>

      <Button mt={4} colorScheme="teal" type="submit" w="full">
        Add Room
      </Button>
    </Box>
  );
};

export default AddRoomForm;


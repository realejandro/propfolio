import {
    Box,
    Text,
    Heading,
    Button,
    Image,
    Input,
    Textarea,
    Fieldset,
    Field,
  } from '@chakra-ui/react';
  import { useToast } from '@chakra-ui/toast';
  import { useState } from 'react';
  import { useMutation } from '@apollo/client';
  import { Room } from '../models/Room';
  import { UPDATE_ROOM } from '../utils/graphql/mutations';
  
  interface RoomCardProps {
    room: Room;
    onDelete: (id: string) => void;
  }
  
  const RoomCard = ({ room, onDelete }: RoomCardProps) => {
    const toast = useToast();
    const [isEditing, setIsEditing] = useState(false);
  
    const [editValues, setEditValues] = useState({
      title: room.title || '',
      squareFootage: room.squareFootage.toString(),
      description: room.description || '',
      photo: room.photo || '',
    });
  
    const [updateRoom] = useMutation(UPDATE_ROOM);
  
    const handleEditChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      const { name, value } = e.target;
      setEditValues((prev) => ({
        ...prev,
        [name]: name === 'squareFootage' ? value.replace(/\D/, '') : value,
      }));
    };
  
    const handleSave = async () => {
      try {
        await updateRoom({
          variables: {
            id: room._id,
            input: {
              title: editValues.title,
              squareFootage: parseInt(editValues.squareFootage),
              description: editValues.description,
              photo: editValues.photo,
              propertyId: room.propertyId,
            },
          },
        });
  
        toast({
          title: 'Room updated!',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
  
        setIsEditing(false);
      } catch (err) {
        console.error('Error updating room', err);
        toast({
          title: 'Failed to update room.',
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
          {room.photo && !isEditing && (
            <Image
              src={room.photo}
              alt="Room image"
              borderRadius="md"
              objectFit="cover"
              w="100%"
              h="200px"
            />
          )}
  
          {isEditing ? (
            <Fieldset.Root>
              <Field.Root>
                <Field.Label>Room Title</Field.Label>
                <Input
                  name="title"
                  value={editValues.title}
                  onChange={handleEditChange}
                  placeholder="e.g. Kitchen, Bedroom 1"
                />
              </Field.Root>
              <Field.Root>
                <Field.Label>Square Footage</Field.Label>
                <Input
                  name="squareFootage"
                  value={editValues.squareFootage}
                  onChange={handleEditChange}
                  placeholder="Enter square footage"
                />
              </Field.Root>
              <Field.Root>
                <Field.Label>Photo URL</Field.Label>
                <Input
                  name="photo"
                  value={editValues.photo}
                  onChange={handleEditChange}
                  placeholder="https://example.com/image.jpg"
                />
              </Field.Root>
              <Field.Root>
                <Field.Label>Description</Field.Label>
                <Textarea
                  name="description"
                  value={editValues.description}
                  onChange={handleEditChange}
                  placeholder="Describe the room"
                />
              </Field.Root>
            </Fieldset.Root>
          ) : (
            <>
              <Heading size="sm">{room.title || 'Untitled Room'}</Heading>
              <Text><strong>Square Footage:</strong> {room.squareFootage} sqft</Text>
              {room.description && (
                <Text fontStyle="italic" color="gray.600">
                  {room.description}
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
                <Button size="sm" colorScheme="red" onClick={() => onDelete(room._id)}>
                  Delete
                </Button>
              </>
            )}
          </Box>
        </Box>
      </Box>
    );
  };
  
  export default RoomCard;
  
  
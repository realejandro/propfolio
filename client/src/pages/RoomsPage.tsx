import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ROOMS_BY_PROPERTY } from '../utils/queries';
import { DELETE_ROOM } from '../utils/mutations';
import {
  Box,
  Heading,
  Spinner,
  Text,
} from '@chakra-ui/react';
import { useToast } from '@chakra-ui/toast';
import RoomCard from '../components/RoomCard';
import { Room } from '../models/Room';

const RoomsPage = () => {
  const toast = useToast();
  const { propertyId } = useParams();

  const { data, loading, error, refetch } = useQuery(QUERY_ROOMS_BY_PROPERTY, {
    variables: { propertyId },
    skip: !propertyId,
  });

  const [deleteRoom] = useMutation(DELETE_ROOM);

  const rooms: Room[] = data?.getRoomsByProperty || [];

  const handleDelete = async (roomId: string) => {
    try {
      await deleteRoom({ variables: { id: roomId } });
      toast({
        title: 'Room deleted.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      refetch();
    } catch (err) {
      console.error('Error deleting room:', err);
      toast({
        title: 'Failed to delete room.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  if (loading) return <Spinner size="xl" mt={10} />;
  if (error) return <Text color="red.500">Error loading rooms for this property.</Text>;

  return (
    <Box maxW="900px" mx="auto" py={8} px={[4, 6]}>
      <Heading mb={6}>Rooms for Property</Heading>
      {rooms.length === 0 ? (
        <Text>No rooms added yet for this property.</Text>
      ) : (
        rooms.map((room) => (
          <Box key={room._id} mb={4}>
            <RoomCard room={room} onDelete={handleDelete} />
          </Box>
        ))
      )}
    </Box>
  );
};

export default RoomsPage;



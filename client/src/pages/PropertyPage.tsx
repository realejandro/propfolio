import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { Box, Heading, Spinner, Text } from '@chakra-ui/react';
import { QUERY_ME } from '../utils/queries';
import { DELETE_PROPERTY } from '../utils/mutations';
import PropertyCard from '../components/PropertyCard';
import Auth from '../utils/auth';
import { Property } from '../models/Property';

const PropertyPage = () => {
  const navigate = useNavigate();

  // 🔐 Redirect if not logged in
  useEffect(() => {
    if (!Auth.loggedIn()) {
      navigate('/');
    }
  }, [navigate]);

  const { loading, data, error, refetch } = useQuery(QUERY_ME);
  const [deleteProperty] = useMutation(DELETE_PROPERTY);

  const user = data?.me;
  const properties: Property[] = user?.savedProperties || [];

  const handleDelete = async (id: string) => {
    try {
      await deleteProperty({
        variables: { id },
      });
      refetch(); // Refresh list after deletion
    } catch (err) {
      console.error('Failed to delete property:', err);
    }
  };

  if (loading) return <Spinner size="xl" mt={10} />;
  if (error) return <Text color="red.500">Failed to load properties.</Text>;

  return (
    <Box p={8} maxW="900px" mx="auto">
      <Heading mb={6}>My Saved Properties</Heading>

      {properties.length === 0 ? (
        <Text>No properties saved yet. Add one to get started!</Text>
      ) : (
        properties.map((property) => (
          <Box key={property._id} mb={6}>
            <PropertyCard
              property={property}
              onDelete={handleDelete}
            />
          </Box>
        ))
      )}
    </Box>
  );
};

export default PropertyPage;

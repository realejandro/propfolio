import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import {
  Heading,
  Spinner,
  Text,
  SimpleGrid,
  Container,
} from '@chakra-ui/react';
import { QUERY_ME } from '../utils/queries';
import { DELETE_PROPERTY } from '../utils/mutations';
import PropertyCard from '../components/PropertyCard';
import Auth from '../utils/auth';
import { Property } from '../models/Property';

const PropertyPage = () => {
  const navigate = useNavigate();

  // 🔐 Redirect unauthenticated users to homepage
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
      refetch(); // Refresh properties list after deletion
    } catch (err) {
      console.error('Failed to delete property:', err);
    }
  };

  // 🌀 Show loading spinner
  if (loading) return <Spinner size="xl" mt={10} />;

  // ❌ Error state
  if (error) return <Text color="red.500">Failed to load properties.</Text>;

  return (
    <Container
      maxW="container.lg" // Limit width for larger screens
      px={[4, 6, 8]}       // Responsive horizontal padding: [mobile, tablet, desktop]
      py={[6, 8]}          // Responsive vertical padding
    >
      <Heading
        mb={6}
        fontSize={['2xl', '3xl']} // Responsive font size for heading
      >
        My Saved Properties
      </Heading>

      {properties.length === 0 ? (
        <Text fontSize={['md', 'lg']}> {/* Responsive text size */}
          No properties saved yet. Add one to get started!
        </Text>
      ) : (
        <SimpleGrid
          columns={{ base: 1, md: 2 }} // Responsive: 1 column on mobile, 2 on medium+
          gap={6}                      // Space between grid items
        >
          {properties.map((property) => (
            <PropertyCard
              key={property._id}
              property={property}
              onDelete={handleDelete}
            />
          ))}
        </SimpleGrid>
       )}
    </Container>
  );
};

export default PropertyPage;


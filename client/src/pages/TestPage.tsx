import { Box, Heading } from '@chakra-ui/react';
import PropertyCard from '../components/PropertyCard';
import { Property } from '../models/Property';

const mockProperties: Property[] = [
  {
    _id: '1',
    location: '123 Main St, Suburbia, CA',
    squareFootage: 1500,
    bedrooms: 3,
    bathrooms: 2,
    price: 350000,
    status: 'available',
    photo: '/assets/images/house1.jpg',
    description: 'A cozy family home in the suburbs.',
    userId: 'user123',
  },
  {
    _id: '2',
    location: '456 Elm St, Downtown, CA',
    squareFootage: 950,
    bedrooms: 2,
    bathrooms: 1,
    price: 275000,
    status: 'rented',
    photo: '/assets/images/apartment1.jpg',
    description: 'Modern apartment with great city views.',
    userId: 'user123',
  },
  {
    _id: '3',
    location: '789 Oak St, Countryside, CA',
    squareFootage: 2000,
    bedrooms: 4,
    bathrooms: 3,
    price: 499000,
    status: 'sold',
    photo: '/assets/images/house3.jpg',
    description: 'Spacious home perfect for large families.',
    userId: 'user123',
  },
];

const TestPage = () => {
  return (
    <Box p={8} maxW="600px" mx="auto">
      <Heading mb={6}>🧪 Test Page</Heading>

      {mockProperties.map((property) => (
        <Box key={property._id} mb={6}>
          <PropertyCard
            property={property}
            onDelete={() => console.log('Delete', property._id)}
          />
        </Box>
      ))}
    </Box>
  );
};

export default TestPage;
  




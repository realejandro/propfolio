import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Heading, Container } from '@chakra-ui/react';
import Auth from '../utils/auth/auth';
import AddPropertyForm from '../components/AddPropertyForm/AddPropertyForm';

const AddPropertyPage = () => {
  const navigate = useNavigate();

  // 🔐 Redirect to homepage if not logged in
  useEffect(() => {
    if (!Auth.loggedIn()) {
      navigate('/');
    }
  }, [navigate]);

  return (
    // ✅ Full-page light background
    <Box minH="100vh" bg="gray.50" py={[8, 10, 12]} px={4}>
      <Container
        maxW="container.md"
        px={[4, 6, 8]}   // Inner padding
      >
        <Box textAlign="center" mb={6}>
          <Heading fontSize={['2xl', '3xl']} fontWeight="bold">
            Add a New Property
          </Heading>
        </Box>

        {/* ✅ Card-style wrapper around the form */}
        <Box
          bg="white"
          border="1px solid"
          borderColor="gray.200"
          borderRadius="lg"
          boxShadow="base"
          p={[4, 6, 8]}
        >
          <AddPropertyForm />
        </Box>
      </Container>
    </Box>
  );
};

export default AddPropertyPage;



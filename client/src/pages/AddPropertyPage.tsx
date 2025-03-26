import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Heading, Container } from '@chakra-ui/react';
import Auth from '../utils/auth';
import AddPropertyForm from '../components/AddPropertyForm';

const AddPropertyPage = () => {
  const navigate = useNavigate();

  // 🔐 Redirect to homepage if not logged in
  useEffect(() => {
    if (!Auth.loggedIn()) {
      navigate('/');
    }
  }, [navigate]);

  return (
    <Container
      maxW="container.md"  // Constrain width for readability
      px={[4, 6, 8]}       // Responsive horizontal padding: [mobile, tablet, desktop]
      py={[6, 8]}          // Responsive vertical padding
    >
      <Box textAlign="center" mb={6}>
        <Heading fontSize={['2xl', '3xl']}>Add a New Property</Heading>
      </Box>

      <AddPropertyForm />
    </Container>
  );
};

export default AddPropertyPage;

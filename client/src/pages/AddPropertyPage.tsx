import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Heading } from '@chakra-ui/react';
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
    <Box maxW="600px" mx="auto" py={8} px={4}>
      <Heading mb={6}>Add a New Property</Heading>
      <AddPropertyForm />
    </Box>
  );
};

export default AddPropertyPage;
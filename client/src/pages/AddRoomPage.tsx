import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Heading, Container } from '@chakra-ui/react';
import Auth from '../utils/auth/auth';
import AddRoomForm from '../components/AddRoomForm';

const AddRoomPage = () => {
  const navigate = useNavigate();
  const { propertyId } = useParams();

  // 🔐 Redirect to homepage if not logged in
  useEffect(() => {
    if (!Auth.loggedIn()) {
      navigate('/');
    }
  }, [navigate]);

  return (
    <Container
      maxW="container.md"       // Keep it clean on large screens
      px={[4, 6, 8]}            // Responsive horizontal padding
      py={[6, 8]}               // Responsive vertical padding
    >
      <Box textAlign="center" mb={6}>
        <Heading fontSize={['2xl', '3xl']}>Add a New Room</Heading>
      </Box>

      {/* Pass propertyId down to the form */}
      {propertyId && <AddRoomForm propertyId={propertyId} />}
    </Container>
  );
};

export default AddRoomPage;

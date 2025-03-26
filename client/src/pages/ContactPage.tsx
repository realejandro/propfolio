import { Box, Container, Heading, Text, SimpleGrid } from '@chakra-ui/react';
import ContactForm from '../components/ContactForm';

const ContactPage = () => {
  return (
    <Container maxW="container.xl" py={8}>
      <Heading as="h1" mb={6} textAlign="center">Contact Us</Heading>
      
      <SimpleGrid columns={{ base: 1, md: 2 }} gap="10">
        <Box>
          <Text mb={4}>
            Have questions about our properties? We're here to help.
          </Text>
          
          <Box mt={6}>
            <Heading as="h3" size="sm" mb={2}>Contact Information</Heading>
            <Text>Phone: (312) 555-1234</Text>
            <Text>Email: info@realestateportfolio.com</Text>
          </Box>
        </Box>
        
        <ContactForm />
      </SimpleGrid>
    </Container>
  );
};

export default ContactPage;
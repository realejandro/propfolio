import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
} from '@chakra-ui/react';
import ContactForm from '../components/ContactForm';

const ContactPage = () => {
  return (
    <Container
      maxW="container.xl"
      px={[4, 6, 8]} // Responsive horizontal padding
      py={[6, 10]}  // Responsive vertical padding
    >
      <Heading
        as="h1"
        mb={8}
        textAlign="center"
        fontSize={['2xl', '3xl', '4xl']} // Responsive heading size
      >
        Contact Us
      </Heading>

      <SimpleGrid
        columns={{ base: 1, md: 2 }} // Stack on mobile, side-by-side on tablet+
        gap={10}                     // Space between columns
      >
        {/* Info Column */}
        <Box>
          <Text mb={4} fontSize={['md', 'lg']}>
            Have questions about signing up or using our application? We're here to help.
          </Text>

          <Box mt={6}>
            <Heading as="h3" size="sm" mb={2}>
              Contact Information
            </Heading>
            <Text>📞 Phone: (312) 555-1234</Text>
            <Text>📧 Email: info@realestateportfolio.com</Text>
          </Box>
        </Box>

        {/* Contact Form */}
        <ContactForm />
      </SimpleGrid>
    </Container>
  );
};

export default ContactPage;

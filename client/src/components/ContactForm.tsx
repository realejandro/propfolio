import { useState } from 'react';
import {
  Box,
  Input,
  Textarea,
  Button,
  Fieldset,
  Field,
} from '@chakra-ui/react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormData({ name: '', email: '', message: '' });
  };
  
  return (
    <Box as="form" onSubmit={handleSubmit} p={4} bg="white" borderRadius="md" boxShadow="md">
      <Fieldset.Root>
        <Fieldset.Legend>Contact Us</Fieldset.Legend>

        <Field.Root>
          <Field.Label>Name</Field.Label>
          <Input 
            type="text" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            required 
          />
        </Field.Root>

        <Field.Root>
          <Field.Label>Email</Field.Label>
          <Input 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            required 
          />
        </Field.Root>

        <Field.Root>
          <Field.Label>Message</Field.Label>
          <Textarea 
            name="message" 
            value={formData.message} 
            onChange={handleChange} 
            required 
          />
        </Field.Root>
      </Fieldset.Root>

      <Button mt={4} colorScheme="teal" type="submit" w="full">
        Send Message
      </Button>
    </Box>
  );
};

export default ContactForm;
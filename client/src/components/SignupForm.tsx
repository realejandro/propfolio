import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Alert,
  AlertIcon,
  CloseButton,
  VStack,
} from '@chakra-ui/react';
import { CREATE_USER } from '../utils/mutations';
import Auth from '../utils/auth';
import type { User } from '../models/User';
import { useMutation } from '@apollo/client';

const SignupForm = ({}: { handleModalClose: () => void }) => {
  const [userFormData, setUserFormData] = useState<User>({
    username: '',
    email: '',
    password: '',
    savedProperties: [],
  });
  const [showAlert, setShowAlert] = useState(false);
  const [createUser] = useMutation(CREATE_USER);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const { data } = await createUser({
        variables: { ...userFormData },
      });

      Auth.login(data.token);
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    setUserFormData({
      username: '',
      email: '',
      password: '',
      savedProperties: [],
    });
  };

  return (
    <Box as="form" onSubmit={handleFormSubmit} noValidate>
      <VStack spacing={4} align="stretch">
        {showAlert && (
          <Alert status="error" borderRadius="md">
            <AlertIcon />
            Something went wrong with your signup!
            <CloseButton
              position="absolute"
              right="8px"
              top="8px"
              onClick={() => setShowAlert(false)}
            />
          </Alert>
        )}

        <FormControl isRequired isInvalid={!userFormData.username}>
          <FormLabel htmlFor="username">Username</FormLabel>
          <Input
            type="text"
            id="username"
            name="username"
            placeholder="Your username"
            value={userFormData.username}
            onChange={handleInputChange}
          />
          {!userFormData.username && (
            <FormErrorMessage>Username is required!</FormErrorMessage>
          )}
        </FormControl>

        <FormControl isRequired isInvalid={!userFormData.email}>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input
            type="email"
            id="email"
            name="email"
            placeholder="Your email address"
            value={userFormData.email}
            onChange={handleInputChange}
          />
          {!userFormData.email && (
            <FormErrorMessage>Email is required!</FormErrorMessage>
          )}
        </FormControl>

        <FormControl isRequired isInvalid={!userFormData.password}>
          <FormLabel htmlFor="password">Password</FormLabel>
          <Input
            type="password"
            id="password"
            name="password"
            placeholder="Your password"
            value={userFormData.password}
            onChange={handleInputChange}
          />
          {!userFormData.password && (
            <FormErrorMessage>Password is required!</FormErrorMessage>
          )}
        </FormControl>

        <Button
          type="submit"
          colorScheme="green"
          isDisabled={
            !(
              userFormData.username &&
              userFormData.email &&
              userFormData.password
            )
          }
        >
          Submit
        </Button>
      </VStack>
    </Box>
  );
};

export default SignupForm;

import { useState } from "react";
import { Heading, Text, Button, VStack, Container } from "@chakra-ui/react";
import SignupForm from "../components/SignupForm";
import LoginForm from "../components/LoginForm";

const HomePage = () => {
  // State to track whether user is in "login" or "signup" mode
  const [isSignUp, setIsSignUp] = useState(false);

  // Placeholder function for handleModalClose (if required)
  const handleModalClose = () => {};

  return (
    <Container centerContent maxW="lg" py={10}>
      <VStack spacing={6} p={8} boxShadow="lg" borderRadius="lg" bg="white" w="100%" maxW="400px">
        {/* Welcome Message */}
        <Heading size="lg" textAlign="center">Welcome to Your Real Estate Portfolio</Heading>
        <Text textAlign="center" color="gray.600">
          Thank you for visiting! This platform helps independent realtors manage their
          property portfolio. Sign up to get started or log in to continue managing your listings.
        </Text>

        <Heading size="md" textAlign="center">
          {isSignUp ? "Sign Up" : "Log In"}
        </Heading>

        {/* Render SignupForm or LoginForm based on state */}
        {isSignUp ? (
          <SignupForm handleModalClose={handleModalClose} />
        ) : (
          <LoginForm handleModalClose={handleModalClose} />
        )}

        {/* Toggle Button */}
        <Text>
          {isSignUp ? "Already have an account?" : "Don't have an account?"}
          <Button variant="link" colorScheme="blue" ml={1} onClick={() => setIsSignUp(!isSignUp)}>
            {isSignUp ? "Log In" : "Sign Up"}
          </Button>
        </Text>
      </VStack>
    </Container>
  );
};

export default HomePage;



import { Box, Container, Separator, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { TestComponent } from './TestComponent';
import { ModalLogin } from './ModalLogin';
import { ModalSignUp } from './ModalSignUp';

const AppNavbar = () => {
  // set modal display state
  const [showModal, setShowModal] = useState(false);

  return (
    <Container fluid display="flex" justifyContent="space-between" spaceX="8" css={{backgroundColor:"red"}}>
       <Box>
        <Text css={{ padding:"1px"}}>Propfolio</Text>
       </Box>
       <Box display="flex" flexDirection="row" justifyContent="end">
        <ModalLogin />
        <Separator orientation="vertical" height="4" />
        <ModalSignUp/>
       </Box>
    </Container>
  );
};

export default AppNavbar;

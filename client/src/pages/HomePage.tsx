import React from 'react'
import { TestComponent } from '../components/TestComponent'
import Auth from '../utils/auth'
import { Box, Container, Image } from '@chakra-ui/react'

export const HomePage = () => {

  if(Auth.getToken()) {
    console.log( Auth.getToken() )
  }

  return (
    <Container fluid>
      <Box >
        <Image
          htmlWidth="100%"
          htmlHeight="400px"
          src="https://i.pravatar.cc/400?u=1"
        />
      </Box>
    </Container>
  )
}

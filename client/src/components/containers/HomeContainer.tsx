import { Container, Box } from '@chakra-ui/react'
import { Hero } from '../../components/Hero'

export const HomeContainer = () => {
  return (
    <Container maxW="container.xl" py={8}>
      <Box>
        <Hero />
      </Box>
    </Container>
  )
} 
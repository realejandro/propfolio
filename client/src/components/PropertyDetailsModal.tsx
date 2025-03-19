import { 
  Button,
  Text,
  Box,
  Image,
  Grid,
  GridItem,
  Badge,
  Flex,
  Heading,
  VStack,
  HStack
} from '@chakra-ui/react'
import { 
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton
} from '@chakra-ui/modal'
import { useDisclosure } from '@chakra-ui/hooks'
import { FaBed, FaBath, FaRuler, FaCalendarAlt, FaCheckCircle } from 'react-icons/fa'

interface PropertyDetailsProps {
  property: {
    id: string;
    title: string;
    price: number;
    address: string;
    beds: number;
    baths: number;
    sqft: number;
    yearBuilt: number;
    description: string;
    features: string[];
    imageUrl: string;
    status: 'For Sale' | 'For Rent' | 'Sold' | 'Pending';
  }
}

function PropertyDetailsModal({ property }: PropertyDetailsProps) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  // Format price with commas and dollar sign
  const formatPrice = (price: number) => {
    return `$${price.toLocaleString()}`;
  }

  // Generate badge color based on property status
  const getBadgeColor = (status: string) => {
    switch(status) {
      case 'For Sale': return 'green';
      case 'For Rent': return 'blue';
      case 'Sold': return 'red';
      case 'Pending': return 'orange';
      default: return 'gray';
    }
  }

  return (
    <>
      <Button colorScheme="teal" onClick={onOpen}>View Property Details</Button>

      <Modal size="xl" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Flex justify="space-between" align="center">
              <Text>{property.title}</Text>
              <Badge colorScheme={getBadgeColor(property.status)} fontSize="0.8em" p="1">
                {property.status}
              </Badge>
            </Flex>
            <Text fontSize="lg" fontWeight="normal" color="gray.500">{property.address}</Text>
          </ModalHeader>
          <ModalCloseButton />
          
          <ModalBody>
            <Image 
              src={property.imageUrl} 
              alt={property.title}
              borderRadius="md"
              objectFit="cover"
              w="100%"
              h="300px"
              mb={4}
            />
            
            <Heading size="lg" mb={2}>{formatPrice(property.price)}</Heading>
            
            {/* Property specs */}
            <Grid templateColumns="repeat(4, 1fr)" gap={4} mb={4}>
              <GridItem>
                <Flex direction="column" align="center">
                  <Flex align="center">
                    <Box as={FaBed} color="teal.500" mr={2} />
                    <Text fontWeight="bold">{property.beds}</Text>
                  </Flex>
                  <Text fontSize="sm">Beds</Text>
                </Flex>
              </GridItem>
              <GridItem>
                <Flex direction="column" align="center">
                  <Flex align="center">
                    <Box as={FaBath} color="teal.500" mr={2} />
                    <Text fontWeight="bold">{property.baths}</Text>
                  </Flex>
                  <Text fontSize="sm">Baths</Text>
                </Flex>
              </GridItem>
              <GridItem>
                <Flex direction="column" align="center">
                  <Flex align="center">
                    <Box as={FaRuler} color="teal.500" mr={2} />
                    <Text fontWeight="bold">{property.sqft.toLocaleString()}</Text>
                  </Flex>
                  <Text fontSize="sm">Sq Ft</Text>
                </Flex>
              </GridItem>
              <GridItem>
                <Flex direction="column" align="center">
                  <Flex align="center">
                    <Box as={FaCalendarAlt} color="teal.500" mr={2} />
                    <Text fontWeight="bold">{property.yearBuilt}</Text>
                  </Flex>
                  <Text fontSize="sm">Year Built</Text>
                </Flex>
              </GridItem>
            </Grid>
            
            <Box borderTopWidth="1px" borderBottomWidth="1px" py={4} my={4}>
              <Text mb={4}>{property.description}</Text>
            </Box>
            
            {/* Features */}
            <Heading size="md" mb={2}>Features</Heading>
            <VStack align="stretch" gap={2} mb={4}>
              {property.features.map((feature, index) => (
                <HStack key={index}>
                  <Box as={FaCheckCircle} color="teal.500" />
                  <Text>{feature}</Text>
                </HStack>
              ))}
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme="teal">Contact Agent</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

// Example usage with sample property
function PropertyModalExample() {
  const sampleProperty = {
    id: "123",
    title: "Modern Luxury Home",
    price: 1250000,
    address: "123 Main Street, Anytown, ST 12345",
    beds: 4,
    baths: 3,
    sqft: 2800,
    yearBuilt: 2020,
    description: "This beautiful modern home features an open floor plan, gourmet kitchen with high-end appliances, hardwood floors throughout, and a spacious backyard with covered patio. The primary suite includes a walk-in closet and spa-like bathroom with double vanity.",
    features: [
      "Gourmet Kitchen",
      "Hardwood Floors",
      "Smart Home Features",
      "Large Backyard", 
      "Two-Car Garage",
      "Energy Efficient Windows"
    ],
    imageUrl: "https://bit.ly/2Z4KKcF",
    status: "For Sale" as const
  }

  return <PropertyDetailsModal property={sampleProperty} />
}

export default PropertyModalExample 
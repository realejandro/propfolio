import { 
  Box, 
  VStack, 
  Heading, 
  Text,
  Stack,
  Flex
} from '@chakra-ui/react'
import {
  Checkbox,
  CheckboxGroup
} from '@chakra-ui/checkbox'
import {
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb
} from '@chakra-ui/slider'
import { FaDollarSign } from 'react-icons/fa'
import { useState } from 'react'

function PropertyFilters() {
  const [priceRange, setPriceRange] = useState([500000, 1500000]);
  
  // Format price with commas and dollar sign
  const formatPrice = (price: number) => {
    return `$${price.toLocaleString()}`;
  };

  return (
    <Box p={5} borderWidth="1px" borderRadius="lg">
      <Heading size="md" mb={4}>Property Filters</Heading>
      <Box borderBottomWidth="1px" mb={4}></Box>
      
      <VStack align="stretch" gap={6}>
        {/* Property Type */}
        <Box>
          <Text fontWeight="semibold" mb={2}>Property Type</Text>
          <CheckboxGroup colorScheme="teal" defaultValue={["house"]}>
            <Stack gap={2}>
              <Checkbox value="house">House</Checkbox>
              <Checkbox value="apartment">Apartment</Checkbox>
              <Checkbox value="condo">Condo</Checkbox>
              <Checkbox value="townhouse">Townhouse</Checkbox>
            </Stack>
          </CheckboxGroup>
        </Box>
        
        {/* Price Range */}
        <Box>
          <Text fontWeight="semibold" mb={2}>Price Range</Text>
          <Box px={2} mb={2}>
            <RangeSlider 
              aria-label={['min', 'max']} 
              min={100000}
              max={3000000}
              step={50000}
              defaultValue={priceRange}
              onChange={(val) => setPriceRange(val)}
            >
              <RangeSliderTrack bg='blue.100'>
                <RangeSliderFilledTrack bg='teal.500' />
              </RangeSliderTrack>
              <RangeSliderThumb boxSize={6} index={0}>
                <Box color='teal.500' as={FaDollarSign} />
              </RangeSliderThumb>
              <RangeSliderThumb boxSize={6} index={1}>
                <Box color='teal.500' as={FaDollarSign} />
              </RangeSliderThumb>
            </RangeSlider>
          </Box>
          <Flex justify="space-between">
            <Text>{formatPrice(priceRange[0])}</Text>
            <Text>{formatPrice(priceRange[1])}</Text>
          </Flex>
        </Box>
        
        {/* Amenities */}
        <Box>
          <Text fontWeight="semibold" mb={2}>Amenities</Text>
          <CheckboxGroup colorScheme="teal">
            <Stack gap={2}>
              <Checkbox value="pool">Swimming Pool</Checkbox>
              <Checkbox value="garage">Garage</Checkbox>
              <Checkbox value="garden">Garden</Checkbox>
              <Checkbox value="ac" defaultChecked>Air Conditioning</Checkbox>
              <Checkbox value="fireplace">Fireplace</Checkbox>
            </Stack>
          </CheckboxGroup>
        </Box>
        
        {/* Preferences */}
        <Box>
          <Text fontWeight="semibold" mb={2}>Preferences</Text>
          <VStack align="stretch">
            <Checkbox colorScheme="green" defaultChecked>
              Show only verified properties
            </Checkbox>
            <Checkbox colorScheme="green">
              Include properties with virtual tours
            </Checkbox>
            <Checkbox isDisabled>
              Include properties under construction (Coming soon)
            </Checkbox>
          </VStack>
        </Box>
        
        {/* Terms and Conditions */}
        <Box pt={2}>
          <Checkbox size="sm">
            I agree to receive notifications about new properties matching my criteria
          </Checkbox>
        </Box>
      </VStack>
    </Box>
  )
}

export default PropertyFilters 
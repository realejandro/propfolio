import { Center, type CenterProps, Box } from '@chakra-ui/react'

export const ImagePlaceholder = (props: CenterProps) => (
  <Center 
    w="full" 
    h="full" 
    bg="#f2f2f2" 
    color="#b3b3b3"
    borderRadius="md"
    position="relative"
    overflow="hidden"
    {...props}
  >
    <Box
      position="absolute"
      inset="0"
      bgGradient="linear(to-br, gray.100, gray.200)"
    />
    <Box zIndex="1">
      <svg 
        stroke="currentColor" 
        fill="none" 
        strokeWidth="2" 
        viewBox="0 0 24 24" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        height="48px" 
        width="48px" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
        <circle cx="9" cy="9" r="2"></circle>
        <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path>
      </svg>
    </Box>
  </Center>
) 
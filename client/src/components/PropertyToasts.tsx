import { 
  Button, 
  Wrap, 
  WrapItem,
  Box
} from '@chakra-ui/react'
import { useToast } from '@chakra-ui/toast'

type ToastStatus = 'success' | 'error' | 'warning' | 'info' | 'loading';

interface PropertyNotification {
  title: string;
  description: string;
  status: ToastStatus;
}

function PropertyToasts() {
  const toast = useToast()
  
  const propertyNotifications: PropertyNotification[] = [
    {
      title: 'Property Saved',
      description: 'This property has been added to your saved list',
      status: 'success'
    },
    {
      title: 'Offer Rejected',
      description: 'Your offer on 123 Main St has been rejected',
      status: 'error'
    },
    {
      title: 'Price Drop Alert',
      description: 'A property in your wishlist has decreased in price',
      status: 'warning'
    },
    {
      title: 'New Properties',
      description: '5 new properties match your search criteria',
      status: 'info'
    }
  ]

  return (
    <Box p={5}>
      <Wrap gap={4}>
        {propertyNotifications.map((notification, i) => (
          <WrapItem key={i}>
            <Button
              colorScheme={notification.status === 'success' ? 'green' : 
                          notification.status === 'error' ? 'red' :
                          notification.status === 'warning' ? 'yellow' : 'blue'}
              onClick={() =>
                toast({
                  title: notification.title,
                  description: notification.description,
                  status: notification.status,
                  duration: 5000,
                  isClosable: true,
                  position: 'bottom-right'
                })
              }
            >
              Show {notification.title} notification
            </Button>
          </WrapItem>
        ))}
      </Wrap>
    </Box>
  )
}

export default PropertyToasts 
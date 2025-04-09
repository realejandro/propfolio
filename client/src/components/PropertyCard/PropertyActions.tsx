import { Box, Button, Wrap, WrapItem } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

interface PropertyActionsProps {
  propertyId: string;
  isEditing: boolean;
  onEdit: () => void;
  onCancel: () => void;
  onSave: () => void;
  onDelete: () => void;
}

const PropertyActions = ({
  propertyId,
  isEditing,
  onEdit,
  onCancel,
  onSave,
  onDelete,
}: PropertyActionsProps) => {
  const navigate = useNavigate();

  return (
    <Box pt={4}>
      <Wrap gap={4} justify="center">
        {isEditing ? (
          <>
            <WrapItem>
              <Button
                size="sm"
                colorScheme="green"
                onClick={onSave}
                _hover={{
                  border: '1px solid',
                  borderColor: 'green.500',
                  boxShadow: 'md',
                }}
              >
                Save
              </Button>
            </WrapItem>
            <WrapItem>
              <Button
                size="sm"
                colorScheme="gray"
                onClick={onCancel}
                _hover={{
                  border: '1px solid',
                  borderColor: 'gray.400',
                  boxShadow: 'md',
                }}
              >
                Cancel
              </Button>
            </WrapItem>
          </>
        ) : (
          <>
            <WrapItem>
              <Button
                size="sm"
                colorScheme="blue"
                onClick={onEdit}
                _hover={{
                  border: '1px solid',
                  borderColor: 'blue.500',
                  boxShadow: 'md',
                }}
              >
                Edit
              </Button>
            </WrapItem>
            <WrapItem>
              <Button
                size="sm"
                colorScheme="red"
                onClick={onDelete}
                _hover={{
                  border: '1px solid',
                  borderColor: 'red.500',
                  boxShadow: 'md',
                }}
              >
                Delete
              </Button>
            </WrapItem>
            <WrapItem>
              <Button
                size="sm"
                colorScheme="purple"
                onClick={() => navigate(`/properties/${propertyId}/rooms`)}
                _hover={{
                  border: '1px solid',
                  borderColor: 'purple.500',
                  boxShadow: 'md',
                }}
              >
                View Rooms
              </Button>
            </WrapItem>
            <WrapItem>
              <Button
                size="sm"
                colorScheme="teal"
                onClick={() => navigate(`/properties/${propertyId}/add-room`)}
                _hover={{
                  border: '1px solid',
                  borderColor: 'teal.500',
                  boxShadow: 'md',
                }}
              >
                Add a Room
              </Button>
            </WrapItem>
          </>
        )}
      </Wrap>
    </Box>
  );
};

export default PropertyActions;



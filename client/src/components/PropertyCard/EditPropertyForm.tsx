import {
    Input,
    Textarea,
    Fieldset,
    Field,
    NativeSelect,
  } from '@chakra-ui/react';
  
  interface EditPropertyFormProps {
    editValues: {
      squareFootage: number;
      bedrooms: number;
      bathrooms: number;
      income?: number;
      status: string;
      location: string;
      description: string;
      notes?: string;
    };
    handleEditChange: (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => void;
  }
  
  const EditPropertyForm = ({ editValues, handleEditChange }: EditPropertyFormProps) => {
    return (
      <Fieldset.Root>
        <Field.Root>
          <Field.Label>Square Footage</Field.Label>
          <Input
            name="squareFootage"
            value={editValues.squareFootage.toString()}
            onChange={handleEditChange}
          />
        </Field.Root>
        <Field.Root>
          <Field.Label>Bedrooms</Field.Label>
          <Input
            name="bedrooms"
            value={editValues.bedrooms.toString()}
            onChange={handleEditChange}
          />
        </Field.Root>
        <Field.Root>
          <Field.Label>Bathrooms</Field.Label>
          <Input
            name="bathrooms"
            value={editValues.bathrooms.toString()}
            onChange={handleEditChange}
          />
        </Field.Root>
        <Field.Root>
          <Field.Label>Location</Field.Label>
          <Input
            name="location"
            value={editValues.location}
            onChange={handleEditChange}
          />
        </Field.Root>
        <Field.Root>
          <Field.Label>Status</Field.Label>
          <NativeSelect.Root>
            <NativeSelect.Field
              name="status"
              value={editValues.status}
              onChange={handleEditChange}
            >
              <option value="available">Available</option>
              <option value="rented">Rented</option>
            </NativeSelect.Field>
            <NativeSelect.Indicator />
          </NativeSelect.Root>
        </Field.Root>

        {/* ✅ Show income field only if status is "rented" */}
        {editValues.status === 'rented' && (
          <Field.Root>
            <Field.Label>Monthly Rental Income (USD)</Field.Label>
            <Input
              name="income"
              type="number"
              value={editValues.income?.toString() || ''}
              onChange={handleEditChange}
              placeholder="Enter monthly rental income"
            />
          </Field.Root>
        )}
  
        <Field.Root>
          <Field.Label>Description</Field.Label>
          <Textarea
            name="description"
            value={editValues.description}
            onChange={handleEditChange}
            placeholder="Description"
          />
        </Field.Root>
  
        <Field.Root>
          <Field.Label>Notes</Field.Label>
          <Textarea
            name="notes"
            value={editValues.notes || ''}
            onChange={handleEditChange}
            placeholder="Reminders, to-dos, or helpful info"
          />
        </Field.Root>
      </Fieldset.Root>
    );
  };
  
  export default EditPropertyForm;
  
  
  
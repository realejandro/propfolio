import { Field, Input, Text, Textarea, NativeSelect } from '@chakra-ui/react';

interface PropertyFieldInputsProps {
  formState: {
    location: string;
    squareFootage: number;
    bedrooms: number;
    bathrooms: number;
    status: string;
    income?: number;
    description?: string;
    notes?: string;
  };
  errors: { [key: string]: string };
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void;
}

const PropertyFieldInputs = ({ formState, errors, handleChange }: PropertyFieldInputsProps) => {
  return (
    <>
      <Field.Root>
        <Field.Label>Location</Field.Label>
        <Input
          name="location"
          value={formState.location}
          onChange={handleChange}
          placeholder="e.g., 123 Main St, Chicago"
          _placeholder={{ color: 'gray.600', fontWeight: 'medium' }}
        />
        {errors.location && <Text color="red.500" fontSize="sm">{errors.location}</Text>}
      </Field.Root>

      <Field.Root>
        <Field.Label>Square Footage</Field.Label>
        <Input
          name="squareFootage"
          value={formState.squareFootage || ''}
          onChange={handleChange}
          placeholder="e.g., 1200"
          _placeholder={{ color: 'gray.600', fontWeight: 'medium' }}
        />
        {errors.squareFootage && <Text color="red.500" fontSize="sm">{errors.squareFootage}</Text>}
      </Field.Root>

      <Field.Root>
        <Field.Label>Bedrooms</Field.Label>
        <Input
          name="bedrooms"
          value={formState.bedrooms || ''}
          onChange={handleChange}
          placeholder="e.g., 3"
          _placeholder={{ color: 'gray.600', fontWeight: 'medium' }}
        />
        {errors.bedrooms && <Text color="red.500" fontSize="sm">{errors.bedrooms}</Text>}
      </Field.Root>

      <Field.Root>
        <Field.Label>Bathrooms</Field.Label>
        <Input
          name="bathrooms"
          value={formState.bathrooms || ''}
          onChange={handleChange}
          placeholder="e.g., 2"
          _placeholder={{ color: 'gray.600', fontWeight: 'medium' }}
        />
        {errors.bathrooms && <Text color="red.500" fontSize="sm">{errors.bathrooms}</Text>}
      </Field.Root>

      <Field.Root>
        <Field.Label>Status</Field.Label>
        <NativeSelect.Root>
          <NativeSelect.Field name="status" value={formState.status} onChange={handleChange}>
            <option value="available">Available</option>
            <option value="rented">Rented</option>
          </NativeSelect.Field>
          <NativeSelect.Indicator />
        </NativeSelect.Root>
      </Field.Root>

      {formState.status === 'rented' && (
        <Field.Root>
          <Field.Label>Monthly Income ($)</Field.Label>
          <Input
            name="income"
            value={formState.income || ''}
            onChange={handleChange}
            type="number"
            placeholder="e.g., 2500"
            _placeholder={{ color: 'gray.600', fontWeight: 'medium' }}
          />
          {errors.income && <Text color="red.500" fontSize="sm">{errors.income}</Text>}
        </Field.Root>
      )}

      <Field.Root>
        <Field.Label>Description</Field.Label>
        <Textarea
          name="description"
          value={formState.description}
          onChange={handleChange}
          placeholder="e.g., Spacious layout with modern finishes and natural light"
          _placeholder={{ color: 'gray.600', fontWeight: 'medium' }}
        />
      </Field.Root>

      <Field.Root>
        <Field.Label>Notes</Field.Label>
        <Textarea
          name="notes"
          value={formState.notes}
          onChange={handleChange}
          placeholder="e.g., Paint before listing; fix kitchen faucet"
          _placeholder={{ color: 'gray.600', fontWeight: 'medium' }}
        />
      </Field.Root>
    </>
  );
};

export default PropertyFieldInputs;


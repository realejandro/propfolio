import { PropertyInput } from '../../models/Property';

interface ValidationResult {
  isValid: boolean;
  errors: { [key: string]: string };
}

export const validatePropertyForm = (formState: PropertyInput): ValidationResult => {
  const errors: { [key: string]: string } = {};
  let isValid = true;

  const requiredFields = ['squareFootage', 'bedrooms', 'bathrooms'];

  requiredFields.forEach((field) => {
    const value = formState[field as keyof PropertyInput];
    if (typeof value !== 'number' || value <= 0 || !Number.isInteger(value)) {
      errors[field] = 'Must be a positive whole number greater than zero';
      isValid = false;
    }
  });

  if (!formState.location || formState.location.length < 3 || formState.location.length > 100) {
    errors.location = 'Enter 3–100 characters (letters, numbers, commas)';
    isValid = false;
  }

  // ✅ Only validate income if the status is rented
  if (formState.status === 'rented') {
    if (typeof formState.income !== 'number' || formState.income <= 0 || !Number.isInteger(formState.income)) {
      errors.income = 'Monthly income must be a positive whole number';
      isValid = false;
    }
  }

  return { isValid, errors };
};


import React from 'react'
import {
  Button,
  Field,
  Fieldset,
  Input,
  Stack,
} from "@chakra-ui/react";



export const LoginPage = () => {
  return (
    <Fieldset.Root size="lg" maxW="md">
      <Stack>
        <Fieldset.Legend >Login</Fieldset.Legend>
        <Fieldset.HelperText>
          Please provide your contact details below.
        </Fieldset.HelperText>
      </Stack>

      <Fieldset.Content>
        <Field.Root>
          <Field.Label>Email</Field.Label>
          <Input name="email" type="email"/> 
        </Field.Root>

        <Field.Root>
          <Field.Label>Password</Field.Label>
          <Input name="password" type="password" />
        </Field.Root>

        

      </Fieldset.Content>

    

      <Button type="submit" alignSelf="flex-start">
        Submit
      </Button>
    </Fieldset.Root>
  )
}

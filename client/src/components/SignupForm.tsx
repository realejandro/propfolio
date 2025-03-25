
import { Box, Button, Field, Fieldset, Flex, Input } from "@chakra-ui/react";


// biome-ignore lint/correctness/noEmptyPattern: <explanation>

const handleSubmit = () => {
  console.log("Hello")
}

const SignupForm = () => {
  return ( 
      <Box>
        <Fieldset.Root>
        <Field.Root>
            <Field.Label css={{color:"white"}}>username</Field.Label>
            <Input name="name" type="email"/>
          </Field.Root>

          <Field.Root>
            <Field.Label css={{color:"white"}}>Email</Field.Label>
            <Input name="name" type="email"/>
          </Field.Root>

          <Field.Root>
            <Field.Label css={{color:"white"}} >Password</Field.Label>
            <Input name="password" type="password" />
          </Field.Root>

            <Field.Root>
              <Button 
                style={{
                  backgroundColor:"rgba(0,0,0, 0.7)",
                  color:"white",
                  margin:"2px"
                }}
                variant="outline"
                onClick={handleSubmit}>
                  Submit
              </Button>
            </Field.Root>
          
        </Fieldset.Root>
      </Box>
  );
}
export default SignupForm;

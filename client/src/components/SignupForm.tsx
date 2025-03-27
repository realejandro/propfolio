

import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../utils/mutations";
import { Alert, Box, Button, Field, Fieldset, Input, Text } from "@chakra-ui/react";
import { ChangeEvent, MouseEvent, useState } from "react";
import { User } from "../models/User";





const SignupForm = () => {

  const [userFormData, setUserFormData] = useState<User>({ username: '', email: '', password: '', savedProperties: [] })
  const [createUser, { error }] =  useMutation(CREATE_USER)
  const [isSignUp, setIsSignUp] = useState<Boolean | null>(null);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  


  const onSubmitUserData = async(event: MouseEvent) => {
    event.preventDefault();
    
    try {
        const { data } = await createUser({
        variables: {
          ...userFormData
        }
      });
      
      if(data.createUser) {
        setIsSignUp(true)
      }

    } catch (err) {
      console.error(err);
      setIsSignUp(false)
    }
    setUserFormData({ 
      username:'',
      email:'', 
      password: '',
    })
  }


  return ( 
      <Box>
        <Fieldset.Root>
        <Field.Root>
            <Field.Label css={{color:"white"}}>username</Field.Label>
            <Input 
              name="username" 
              type="text"
              onChange={handleInputChange}
              value={userFormData.username || ''}
              required 
              />
          </Field.Root>

          <Field.Root>
            <Field.Label css={{color:"white"}}>Email</Field.Label>
            <Input 
              name="email" 
              type="email"
              onChange={handleInputChange}
              value={userFormData.email || ''}
              required 
            />
          </Field.Root>

          <Field.Root>
            <Field.Label css={{color:"white"}} >Password</Field.Label>
            <Input 
              name="password" 
              type="password"
              onChange={handleInputChange}
              value={userFormData.password || ''}
              required  
            />
          </Field.Root>

            <Field.Root>
              <Button 
                style={{
                  backgroundColor:"rgba(0,0,0, 0.7)",
                  color:"white",
                  margin:"2px"
                }}
                variant="outline"
                onClick={onSubmitUserData}>
                  Submit
              </Button>
              { isSignUp !== null  &&  (
                isSignUp && !error ?  
              <Alert.Root status="success">
                <Alert.Indicator />
                <Alert.Title> User Created </Alert.Title>
              </Alert.Root> 
              : 
              <Alert.Root status="error">
                <Alert.Indicator />
                <Alert.Title>There is something wrong with your info (duplicate user or incomplete info)</Alert.Title>
              </Alert.Root>
              )}
            </Field.Root>
          
        </Fieldset.Root>
      </Box>
  );
}
export default SignupForm;


/*

 */
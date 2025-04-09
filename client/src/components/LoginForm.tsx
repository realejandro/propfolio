//import type { ChangeEvent, FormEvent } from 'react';
//import { loginUser } from '../utils/API';

import { Box, Button, Field, Fieldset, Input } from "@chakra-ui/react";
import { useState } from "react";
import type { ChangeEvent, MouseEvent } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/graphql/mutations";
import Auth from "../utils/auth/auth";
import { Alert } from  "@chakra-ui/react";


const LoginForm = () => {

  const [ userFormData, setUserFormData ] = useState({  
    email:'', 
    password: ''
  });

  const [isSubmit, setIsSubmit] = useState<Boolean | null>(null)

  const [ login ] = useMutation(LOGIN_USER)


  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  
  const onSubmitUserData = async(event: MouseEvent) => {
    event.preventDefault();
    
    try {
      const { data } = await login({
        variables: {
          ...userFormData
        }
      });
      
     Auth.login(data.login.token);
     
     if(!data.login){
      setIsSubmit(true);
     }
      
    } catch (err) {
      console.error(err);
      setIsSubmit(false)
    }
    setUserFormData({ 
      email:'', 
      password: '', 
    })
  }
 
  return ( 
      <Box>
        <Fieldset.Root >
          <Field.Root>
            <Field.Label css={{color:"white"}}>Email</Field.Label>
            <Input 
              name="email" 
              type="email" 
              onChange={handleInputChange}
              value={ userFormData.email || ''}
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
                onClick={onSubmitUserData}
                >
                  Submit
              </Button>
            </Field.Root>
            {
              isSubmit !== null && (
                !isSubmit ?  
                <Alert.Root status="error">
                  <Alert.Indicator />
                  <Alert.Title>There is something wrong with your info (duplicate user or incomplete info)</Alert.Title>
                </Alert.Root>
              :
              ''
              )
            }
            
          
        </Fieldset.Root>
      </Box>
  );
}
export default LoginForm;

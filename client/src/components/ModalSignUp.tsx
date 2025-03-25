import React from 'react'
import { Button, CloseButton, Dialog, Portal } from '@chakra-ui/react'
import SignupForm from './SignupForm'

export const ModalSignUp = () => {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button size="sm" css={{ backgroundColor: "rgba(0,0,0,0)", color: 'white'}}>
          SignUp
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header display="flex">
              <Dialog.Title css={{ color: 'white'}}>SignUp</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
            <SignupForm/>
            </Dialog.Body>
            <Dialog.CloseTrigger asChild>
              <CloseButton />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}

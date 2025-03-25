import React from 'react'
import { Button, CloseButton, Dialog, Portal } from '@chakra-ui/react'
import LoginForm from './LoginForm'

export const ModalLogin = () => {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button size="sm">
          Login
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header display="flex">
              <Dialog.Title css={{ color: 'white'}}>Login</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
            <LoginForm/>
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


import LoginForm from './LoginForm'
import { Dialog,  Portal } from '@chakra-ui/react'
import { Button, CloseButton } from 'react-bootstrap'

export const TestComponent = () => {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button variant="outline" size="sm">
          Login
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header display="flex">
              <Dialog.Title css={{ color: 'white'}}>Login</Dialog.Title>
              <Dialog.ActionTrigger asChild css={{ backgroundColor: "red", borderRadius: "50%"}}>
                <Button variant="outline">X</Button>
              </Dialog.ActionTrigger>
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

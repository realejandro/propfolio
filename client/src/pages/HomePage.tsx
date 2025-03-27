import { Avatar, Box, Button, Card, Container, Em, Heading, Image, Text } from '@chakra-ui/react'


export const HomePage = () => {
  
  const servicesArr = ['Properties inventory', 'easy usage', 'properties stats'] 

  const homeCards = ( title: string) => {
    return (
    <Card.Root width="320px">
      <Card.Body gap="2">
        <Avatar.Root size="lg" shape="rounded">
          <Avatar.Image src="https://picsum.photos/200/300" />
          <Avatar.Fallback name="Nue Camp" />
        </Avatar.Root>
        <Card.Title mt="2">{ title }</Card.Title>
        <Card.Description>
          This is the card body. Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Curabitur nec odio vel dui euismod fermentum.
          Curabitur nec odio vel dui euismod fermentum.
        </Card.Description>
      </Card.Body>
      <Card.Footer justifyContent="flex-end">
        <Button variant="outline">View</Button>
        <Button>Join</Button>
      </Card.Footer>
    </Card.Root>
    )
  } 


  return (
    <Container fluid padding={"0"}>
      <Box display="flex" lg={{flexDirection: "row"}} md={{flexDirection: "column"}} sm={{flexDirection: "column"}} width="100%" >
        <Box display="flex" width={{lgOnly: "50%"}} padding="4" marginTop="20" flexDirection="column" md={{height: "50vh"}} >
          <Heading 
            textStyle="5xl"
            textAlign="center"
          >
            Welcome to Prop<span style={{color: "gold"}}>folio</span>
          </Heading>
          <Text textAlign="center" padding="2" margin="5">The best <Em> real estate inventory management </Em></Text>
          <Text 
            textShadow="0 0 1px gold"
            textAlign="center"
          >   
            Simplify property tracking and management with our intuitive app. Stay organized, save time, and make smarter decisions—all in one platform.
          </Text>
        </Box>
        <Box width={{lgOnly: "50%"}}>
          <Image
            height="100vh"
            src="https://onyx-technologies.com/wp-content/uploads/2023/09/Chicago.jpg"
          />
        </Box>
      </Box>
    </Container>
  )
}


/*
Here is functionality for card
<Grid display="flex" justifyContent="space-around" marginTop="5%">
      { 
        servicesArr.map( (service: string ) => { 
          return (<GridItem key={service}>
            { homeCards( service ) }
          </GridItem>)
      }) }
</Grid>
*/
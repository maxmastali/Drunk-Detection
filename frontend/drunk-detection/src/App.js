import "./App.css";
import { useState } from "react";
import { Button, ChakraProvider } from "@chakra-ui/react";
import {
  Center,
  Box,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Text,
  Badge,
  Flex,
  Image,
} from "@chakra-ui/react";

function App() {
  const [input, setInput] = useState();
  const [response, setResponse] = useState();
  const [results, setResults] = useState();
  #const [response_drunk, setResponseDrunk] = useState();
  #const [results_drunk, setResultsDrunk] = useState();

  const submitForm = async () => {
    const formData = new FormData();
    formData.append("file", input);

    try {
      console.log(
        "api endpoint:",
        `${process.env.REACT_APP_DRUNK_API_URL}/api/submit/`
      );
      const response = await fetch(
        `${process.env.REACT_APP_DRUNK_API_URL}/api/submit/`,
        {
          method: "POST",
          body: formData,
        }
      );
      
      const response_drunk = await fetch(
        `${process.env.REACT_APP_DRUNK_API_URL}/api/check_drunk/`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (response) {
        console.log(response);
        const data = await response.json();
        const parsed = JSON.parse(data.success);
        setResults(parsed.faces[0].attributes);
        setResponse(data.success);
      }
      //if (response_drunk) {
      //  console.log(response_drunk);
      //  const data = await response_drunk.json();
      //  const parsed = JSON.parse(data.success);
      //  setResultsDrunk(data.success);
      //  setResponseDrunk(data.success);
      //}
    } catch (error) {
      console.log("error!!!");
      console.log(error);
    }
  };

  return (
    <ChakraProvider>
      <Center h="100vh">
        {response && results ? (
          <>
            <Flex align="baseline" mt={2} flexDirection="column">
              //<Text pt="34px">Drunk: {results_drunk}</Text>
              <Text pt="24px">Age: {results.age.value}</Text>
              <Text pt="24px">
                Female Beauty Score: {results.beauty.female_score}
              </Text>
              <Text pt="24px">
                Male Beauty Score: {results.beauty.male_score}
              </Text>
              <Text pt="24px">Gender: {results.gender.value}</Text>
              <Button
                mt="24px"
                onClick={() => {
                  setResponse(null);
                }}
              >
                Reset
              </Button>
            </Flex>
          </>
        ) : (
          <>
            <Image
              src="IMG_0305.jpg"
              w="50%"
              h="33%"
              top={0}
              left={0}
              position="absolute"
              zIndex={-2}
            />
            <Image
              src="IMG_0305.jpg"
              w="50%"
              h="34%"
              pos="50%"
              left={0}
              position="absolute"
              zIndex={-2}
            />
            <Image
              src="IMG_0305.jpg"
              w="50%"
              h="33%"
              bottom={0}
              left={0}
              position="absolute"
              zIndex={-2}
            />
            <Image
              src="IMG_0305.jpg"
              w="50%"
              h="33%"
              top={0}
              right={0}
              position="absolute"
              zIndex={-2}
            />
            <Image
              src="IMG_0305.jpg"
              w="50%"
              h="34%"
              pos="50%"
              right={0}
              position="absolute"
              zIndex={-2}
            />
            <Image
              src="IMG_0305.jpg"
              w="50%"
              h="33%"
              bottom={0}
              right={0}
              position="absolute"
              zIndex={-2}
            />
            <Box
              p="10"
              maxW="520px"
              borderWidth="1px"
              background="white"
              borderRadius="4px"
            >
              <Flex align="baseline" mt={2}>
                <Badge colorScheme="purple">ATTENTION</Badge>
                <Text
                  ml={2}
                  textTransform="uppercase"
                  fontSize="sm"
                  fontWeight="bold"
                  color="purple.700"
                >
                  Are you drunk???
                </Text>
              </Flex>
              <FormControl>
                <FormLabel>
                  Add your drunk/sober photo here to find out NOW!!!
                </FormLabel>
                <Input
                  borderWidth="0px"
                  type="file"
                  onChange={(e) => {
                    console.log(e);
                    console.log(e.target.files[0]);
                    setInput(e.target.files[0]);
                  }}
                />
                <FormHelperText>
                  Your data is safe with us ;&#41;
                </FormHelperText>
              </FormControl>
              <Button
                mt="24px"
                onClick={() => {
                  submitForm();
                }}
              >
                Submit
              </Button>
            </Box>
          </>
        )}
      </Center>
    </ChakraProvider>
  );
}

export default App;

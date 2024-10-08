import "@mantine/core/styles.css";
import { Container, MantineProvider } from "@mantine/core";
import { theme } from "./theme";
import MultiQuestionSearchBar from "./components/QuestionSearchBar/QuestionSearchBar";

export default function App() {
  
  // const [loading, setLoading] = useState(false);
  // const [counter, setCounter] = useState('-');

  // const incrementCounter = async () => {
  //   setLoading(true)
  //   const response = await (await fetch(`/api/counter`)).json()
  //   setCounter(response.counterValue);
  //   setLoading(false)
  // }


  return <MantineProvider theme={theme}>

    <Container>
      {/* <LoadingOverlay visible={loading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
      <Stack p={"lg"} gap={'xl'}>
        <Text>Bam! 😄</Text>
        <Text>Count: {counter}</Text>
        <Button onClick={incrementCounter}>Increment Counter</Button>
      </Stack> */}
      <MultiQuestionSearchBar />
    </Container>

  </MantineProvider>;
}

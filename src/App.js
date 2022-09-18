import { BrowserRouter, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import Landing from "./pages/Landing";
import Map from "./pages/Map";
import { Routes } from "react-router-dom";

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/map" element={<Map />} />
          <Route path="/" element={<Landing />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;

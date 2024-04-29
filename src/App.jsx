
import Container from "@mui/material/Container";

import Appbar from "./Appbar.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Customerlist from "./components/customerlist";
import Training from "./components/training";
import Calendar from "./components/Calendar";
import AnalysisTraining from "./components/AnalysisTraining";
function App() {
  return (
    <>
      <Container maxWidth="xl">        
        <Router>
          {" "}
          <Appbar />
          <Routes>
            {/* Define individual routes and map them to components */}
            <Route path="/Customerlist" element={<Customerlist />} />
            <Route path="/training" element={<Training />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/AnalysisTraining" element={<AnalysisTraining />} />
          </Routes>
        </Router>
      </Container>
    </>
  );
}

export default App;

import { Box } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/common/Navbar";
import Payment from "./components/payment/Payment";
import Reports from "./components/reports/Reports";
import StudentTable from "./components/student/StudentTable";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Box m={3}>
          <Routes>
            <Route path="/" element={<StudentTable />} />
            <Route path="/payments" element={<Payment />} />
            <Route path="/reports" element={<Reports />} />
          </Routes>
        </Box>
      </BrowserRouter>
    </div>
  );
}

export default App;

import { Box } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { toast } from "react-toastify";
import "./App.css";
import Navbar from "./components/common/Navbar";
import Payment from "./components/payment/Payment";
import Reports from "./components/reports/Reports";
import StudentTable from "./components/student/StudentTable";
import "react-toastify/dist/ReactToastify.css";
import StudentCard from "./components/studentCard/StudentCard";

toast.configure();
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
            <Route path="/student/:id" element={<StudentCard />} />
          </Routes>
        </Box>
      </BrowserRouter>
    </div>
  );
}

export default App;

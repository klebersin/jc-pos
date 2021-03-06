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
import { useState } from "react";
import SignIn from "./components/login/SignIn";

toast.configure({
  autoClose: 1000,
});
function App() {
  const [isLogged, setIsLogged] = useState(false);

  return (
    <div className="App">
      <BrowserRouter>
        {!isLogged && (
          <Routes>
            <Route path="/" element={<SignIn setIsLogged={setIsLogged} />} />
          </Routes>
        )}
        {isLogged && (
          <Box>
            <Navbar setIsLogged={setIsLogged} />
            <Box m={3}>
              <Routes>
                <Route path="/" element={<StudentTable />} />
                <Route path="/payments" element={<Payment />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/student/:id" element={<StudentCard />} />
              </Routes>
            </Box>
          </Box>
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;

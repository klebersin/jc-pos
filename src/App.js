import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/common/Navbar";
import Payment from "./components/payment/Payment";
import StudentTable from "./components/student/StudentTable";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<StudentTable />} />
          <Route path="/payments" element={<Payment />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

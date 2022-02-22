import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/common/Navbar";
import PaymentTable from "./components/payment/PaymentTable";
import PaymentForm from "./components/payment/PaymentForm";
import StudentForm from "./components/student/StudentForm";
import StudentTable from "./components/student/StudentTable";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>

        <Routes>
          <Route path="/" element={<StudentTable/>} />
          <Route path="/student/new" element={<StudentForm /> } />
          <Route path="/payments" element={<PaymentTable />} />
          <Route path="/payments/new" element={<PaymentForm />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

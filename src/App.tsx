import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EmailForm from "./page/EmailFormPage";
import Assessment from "./page/Assessment";
import SharePage from "./page/SharePage";
import ResultPage from "./page/ResultPage";
import { useResult } from "./context/ResultContext";
import { Result } from "./types/assessmentTypes";
import { ToastContainer } from "react-toastify";

function App() {
  const { score, result } = useResult()!;

  return (
    <div className="App">
      <Routes>
        <Route path={"/"} element={<EmailForm />} />
        <Route path={"/assessment"} element={<Assessment />} />
        <Route path={"/result"} element={<ResultPage score={score} result={result as Result} />} />
        <Route path={"/share"} element={<SharePage />} />
      </Routes>
    </div>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <App />
      <ToastContainer role="alert"/>
    </Router>
  );
}

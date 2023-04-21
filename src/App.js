import "./App.css";
import SignUp from "./components/Signup";
import LogIn from "./components/Login";
import CreateEnsemble from "./components/CreateEnsemble"
import { Route, Routes } from "react-router-dom";
import MusicianProfile from "./components/MusicianProfile";
import Home from "./components/Home";
// import {Footer} from "./components/Footer";

function App() {
  return (
    <Routes>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/auth/login" element={<LogIn />} />
      <Route path="/musician" element={<MusicianProfile />} />
      <Route path="/ensembles" element={<CreateEnsemble />} />
      <Route path="/" element={<Home />} />
      {/* <Route path="/footer" element={<Footer />} /> */}
    </Routes>
  );
}

export default App;

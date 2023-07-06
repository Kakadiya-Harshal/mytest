
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import UserDetails from "./UserDetails";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          //* Id passed in url as parameter
          <Route path="/userDetails/:id" element={<UserDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

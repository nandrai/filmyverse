import "./App.css";
import Header from "./component/Header";
import Card from "./component/Card";
import AddMovie from "./component/AddMovie";
import Details from "./component/Details";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Card />} />
        <Route path="/addmovie" element={<AddMovie />} />
        <Route path="/details/:id" element={<Details />} />
      </Routes>
    </div>
  );
}

export default App;

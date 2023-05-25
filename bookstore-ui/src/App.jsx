import { BrowserRouter, Routes, Route } from "react-router-dom"
import Books from "./pages/Books"
import Update from "./pages/Update"
import Add from "./pages/Add"
import "./App.css"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Books />} />
        <Route path="/add" element={<Add />} />
        <Route path="/update" element={<Update />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

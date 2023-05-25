import {BrowserRouter, Routes, Route} from "react-router-dom"
import Books from "./pages/Books"
import Update from "./pages/Update"
import Add from "./pages/Add"
import "./App.css"
import Modal from "./components/Modal"


function App() {

  return (
    <BrowserRouter>
    {/* <Modal>
      <h2>Test</h2>
    </Modal> */}
  <Routes>
    <Route path="/" element={<Books/>}/>
    <Route path="/add" element={<Add/>}/>
    <Route path="/update" element={<Update/>}/>
  </Routes>
    </BrowserRouter>
  )
}

export default App

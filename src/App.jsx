import './index.css'
import './customAlert.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './component/login';
import RegisterAdmin from './component/registrar';
import Principal from './component/principal';


function App() {


  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/principal" element={<Principal />} />
        <Route path="/register" element={<RegisterAdmin />} />
      </Routes>
      
    </Router>
  )
}

export default App

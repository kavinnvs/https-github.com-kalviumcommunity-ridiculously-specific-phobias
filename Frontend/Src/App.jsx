import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Login } from './Components/Login';
import { Signup } from './Components/Signup';
import { ProductForm } from './Components/ProductForm';
import Navbar from '../src/Components/Navabar';
import { Productcard } from './Components/Productcard';

function App() {
  return (
    <>
    <Navbar/>
      <Routes>
        <Route path="/Login" element={<Login />} ></Route>
        <Route path="/Signup" element={<Signup />} ></Route>
        <Route path="/home" element={<Home />} ></Route>
        <Route path='/productform' element={<ProductForm/>}/>
        <Route path ='/productCard' element={<Productcard/>}/>
      </Routes>
    </>
  );
}

export default App;
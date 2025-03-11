import './App.css'
import { Route, Routes } from 'react-router-dom'
import { Login } from './Components/Login'
import { Signup } from './Components/Signup'
import { Home } from './page/Home'
import Navbar from './Components/Navbar'
import Singlecard from './Components/Singlecard'
import Productform from './Components/Productform'
import Cart from './page/Cart'
import SelectAddress from './page/SelectAddress'


function App() {
  

  return (
    <>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path='/cart'  element={<Cart/>}/>
        <Route path="/productform" element={<Productform />} />
       <Route path='/product/:id' element={<Singlecard/>}/>
       <Route path='/selectaddress' element={<SelectAddress/>}/>  
       <Route path='*' element={<h1>Not Found</h1>}/> 
      </Routes>
    </>
  )
}

export default App
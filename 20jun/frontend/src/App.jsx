import './App.css'
import { Route,Routes } from 'react-router'
import Register from './pages/Register'
import Login from './pages/Login'
import Library from './pages/Library'
import Create from './pages/Create'
import Update from './pages/Update'
import Home from './pages/Home'

function App() {
  

  return (
   <Routes>
    <Route path='/login' element={<Login/>}></Route>
    <Route path='/register' element={<Register/>}></Route>
    <Route path='/library' element={<Library/>}></Route>
    <Route path='/create' element={<Create/>}></Route>
    <Route path='/update/:bookId' element={<Update/>}></Route>
    <Route path='/' element={<Home/>}></Route>
  </Routes>
  )
}

export default App

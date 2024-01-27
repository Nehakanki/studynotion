import './App.css';
import './index.css';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home'; 
import Login from './Pages/Login';
import Navbar from './components/core/Navbar'

const App = ()=> {
  return (
    <div className='w-screen min-h-screen flex flex-col font-inter bg-richblack-800 '>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>

       </Routes>

       
    </div>
  );
}

export default App;

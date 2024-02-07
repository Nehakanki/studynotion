import './App.css';
import './index.css';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home'; 
import Login from './Pages/Login';
import Navbar from './components/core/Navbar'
import Signup from './Pages/Signup';

const App = ()=> {
  return (
    <div className='w-screen min-h-screen flex flex-col font-inter bg-richblack-800 '>
      <Navbar/>
      <Routes>
        <Route path='/' element={
          <OpenRoute> <Home/></OpenRoute>
       
        
        }/>
        <Route path='/login' element={


<OpenRoute> <Login/></OpenRoute>
        }/>
        <Route path= '/signup' element={
        
        
        <OpenRoute> <Signup/></OpenRoute>
        }/>

       </Routes>

       
    </div>
  );
}

export default App;

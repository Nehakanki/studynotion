import './App.css';
import './index.css';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home'; 
function App() {
  return (
    <div className='w-screen min-h-screen flex flex-col font-inter bg-richblack-800 '>
      <Routes>
        <Route path='/' element={<Home/>}/>

       </Routes>

       
    </div>
  );
}

export default App;

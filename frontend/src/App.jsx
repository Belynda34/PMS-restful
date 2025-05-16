import { useState } from 'react'

import './App.css'
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Route ,Routes} from 'react-router-dom'
import Login from './Screens/Login'
import Signup from './Screens/Signup'
import Dashboard from './Screens/UserDashboard';
import SessionWrapper from './components/SessionWrapper';
import Unauthorized from './Screens/Unauthorized';
import AdminDashboard from './Screens/admin/AdminDashboard';

function App() {

  return (
   <> 
   <BrowserRouter>

    

    <Routes>

      
      <Route path='/' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>

      <Route path='/unauthorized' element={<Unauthorized/>}/>

      <Route element={<SessionWrapper allowedRoles={["USER"]}/>}>
          <Route path='/dashboard' element={<Dashboard/>}/>
      </Route>

      <Route element={<SessionWrapper allowedRoles={["ADMIN"]}/>}>
          <Route path='/admin-dashboard' element={<AdminDashboard/>}/>
      </Route>
      
     
    </Routes>
   </BrowserRouter>
   </>
  )
}

export default App

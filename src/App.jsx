import React from 'react'
import { Routes,Route } from 'react-router-dom'
import { HomePage, SignInPage,SignUpPage } from './page'


const App = () => {
  
  return (
    <div className=' w-screen h-screen' >
       <Routes>
        <Route path='/'  element={<SignInPage/>} />
        <Route path='/signup'  element={<SignUpPage/>} />
        <Route path='/home'  element={<HomePage/>} />
        
         

       </Routes>

       
    </div>
  )
}

export default App
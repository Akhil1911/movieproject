import React from 'react'
import { ToastContainer,Flip } from 'react-toastify'
import Routing from './Routing'

const App = () => {
  return (
    <>
      <ToastContainer transition={Flip} />
      <Routing />
    </>
  );
}

export default App
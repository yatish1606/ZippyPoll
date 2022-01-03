import React from 'react'
import Sidebar from './components/Sidebar'

function App(): JSX.Element {
  return (
    <div className='flex justify-between bg-gray-100 min-h-screen max-w-screen'>
      <div className='min-w-80 max-w-300 min-h-screen bg-white flex flex-col align-center'>
        <Sidebar />
      </div>
      <div className="flex-1">
        tbd
      </div>
    </div>
  )
}

export default App

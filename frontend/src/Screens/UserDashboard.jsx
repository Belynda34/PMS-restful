import React from 'react'
import Sidebar from '../components/Sidebar'
import Slots from './Slots'

const UserDashboard = () => {
  return (
   <div className='flex flex-row min-h-screen space-x-6'>
      <div className=''>
        <Sidebar/>
      </div>
      <div className='flex-1 p-4 overflow-x-auto' >
        <Slots/>
      </div>
    </div>
  )
}

export default UserDashboard
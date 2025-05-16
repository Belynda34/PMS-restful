import React from 'react'
import SidebarA from './SidebarA'
import Bookings from './Bookings'

const AdminDashboard = () => {
  return (
    <div className='flex flex-row min-h-screen space-x-6'>
      <div className=''>
        <SidebarA/>
      </div>
      <div className='flex-1 p-4 overflow-x-auto' >
        <Bookings/>
      </div>
    </div>
  )
}

export default AdminDashboard
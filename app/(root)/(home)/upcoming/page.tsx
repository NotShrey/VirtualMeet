import CallList from '@/components/CallList'
import React from 'react'

const Upcoming = () => {
  return (
    <section className='flex size-full flex-col gap-10 text-white'>
    <h1 className='text-3xl font-bold'>UpCummings is here</h1>
    
    <CallList type = "upcomming"/>
  </section>
  )
}

export default Upcoming 

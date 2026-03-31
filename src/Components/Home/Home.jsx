import React from 'react'
import DetailsOverview from '../DetailsOverview/DetailsOverview'
import Charts from '../../Utilities/Charts'
import { Link } from 'react-router'

function Home() {
  return (
    <div className='h-screen w-screen flex flex-col justify-evenly items-center pt-10'>
      <Charts />
      
    </div>
  )
}

export default Home
import React from 'react'
import DetailsOverview from '../DetailsOverview/DetailsOverview'
import Charts from '../../Utilities/Charts'

function Home() {
  return (
    <div className='h-[90vh] w-screen flex justify-center items-center'>
        {/* <DetailsOverview /> */}
        <Charts />
    </div>
  )
}

export default Home
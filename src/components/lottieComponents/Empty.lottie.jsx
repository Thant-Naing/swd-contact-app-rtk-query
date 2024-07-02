import React from 'react'
import empty from "../../components/lottieComponents/empty.json"
import Lottie from "lottie-react";

const EmptyLottie = () => {
  return (
    <div className='  flex flex-col justify-center items-center content-center '>

        <Lottie animationData={empty} className='  size-80'   loop={true} />
        <p className=' font-test2  text-gray-400'>There is no list ...</p>
    </div>
  )
}

export default EmptyLottie
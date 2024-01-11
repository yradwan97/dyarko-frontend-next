import React from 'react'

function Line(props) {
  return (
    <div className={`w-full h-[1px] bg-gray-200 ${props.className}`}></div>
  )
}

export default Line
import React from 'react'

function Line(props) {
  return (
    <div className={`w-full h-[1px]  ${props.className} bg-gray-200`}></div>
  )
}

export default Line
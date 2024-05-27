import React from 'react'
import PropTypes from "prop-types";

function CircleIcon(props) {
  return (
    <div className={`${props.className} rounded-full w-16 h-16 border border-main-yellow-400 bg-white p-1`}>
        <div className='rounded-full relative w-full h-full bg-main-yellow-400 flex justify-center items-center'>
          {props.icon}
          {props.subIcon?
            <div className='absolute w-6 h-6 rounded-lg bg-main-400 top-9 -right-1 flex justify-center items-center'>
                 {props.subIcon}
            </div>
            :
            props.serviceIcon ?
              <div className='absolute w-6 h-6  top-9 -right-1 flex justify-center items-center'>
                  {props.serviceIcon}
              </div>
            : null
          }
           
        </div>
    </div>
  )
}
CircleIcon.propTypes = {
  icon: PropTypes.element.isRequired
};

export default CircleIcon
import React from 'react'
import PropTypes from "prop-types";
import Title from '../../landingPage/components/Title';

function InfoBox(props) {
  return (
    <div className={`border border-main-200 bg-white rounded-lg drop-shadow-2xl py-5 px-4 md:px-12 hidden sm:flex items-center space-x-5 ${props.boxStyle}`}>
        {props.light?
        <div className='rounded-full w-14 h-14 border border-main-yellow-200 bg-main-yellow-100 p-1'>
            <div className='rounded-full relative w-full h-full bg-main-yellow-100 flex justify-center items-center'>
            {props.icon}
            </div>
        </div>
        :
        <div className='rounded-full w-14 h-14 border border-white bg-main-yellow-400 p-1 absolute top-0 -translate-y-2/4 right-5'>
            <div className='rounded-full relative w-full h-full bg-main-yellow-400 flex justify-center items-center'>
            {props.icon}
            </div>
        </div>
        }
        <div className='flex flex-col space-y-1 w-64'>
            <Title
                head={props.head}
                desc={props.desc}
                type="small-title"
            />
        </div>
    </div>
  )
}
InfoBox.propTypes = {
  head  : PropTypes.string.isRequired,
  desc  : PropTypes.string.isRequired,
}
export default InfoBox
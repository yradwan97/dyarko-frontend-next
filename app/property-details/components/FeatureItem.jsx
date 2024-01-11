import React from 'react'
import Typography from '../../components/Shared/Typography'
import LogoIcon from '../../components/UI/icons/LogoIcon'
import PropTypes from "prop-types";

function FeatureItem(props) {
  return (
    <li className='flex justify-between items-center'>
      <Typography variant='body-md' as="h6" className={`${props.className ? props.className : "text-main-secondary flex"}`}>
        {props.firstText}
        {props.companyName && <p className='flex items-center space-x-1'> <LogoIcon className='ml-2 stroke-main-yellow-600 fill-main-yellow-600 w-3.5 h-4' />
          <Typography variant='body-sm-bold' as="span" className="text-black">Dyarko</Typography></p>}
      </Typography>
      <Typography variant='body-lg-bold' className='text-right' as="p">{props.secondText}</Typography>

    </li>
  )
}

FeatureItem.propTypes = {
  firstText: PropTypes.string.isRequired,
  secondText: PropTypes.string.isRequired,
};

export default FeatureItem
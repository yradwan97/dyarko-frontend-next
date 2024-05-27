import React from 'react'
import Typography from '../../components/Shared/Typography'
import LogoIcon from '../../components/UI/icons/LogoIcon'
import PropTypes from "prop-types";
import { useLocale } from 'next-intl';

function FeatureItem(props) {
  const locale = useLocale()
  return (
    <li className={`flex justify-between ${locale === "ar" && "flex-row-reverse"} items-center`}>
      <Typography variant='body-md' as="h6" className={`${props.className ? props.className : `text-main-secondary space-x-2 flex ${locale === "ar" && "flex-row-reverse"}`}`}>
        {props.firstText}
        {props.companyName && <p className='flex items-center'>
          <Typography variant='body-sm-bold' as="span" className="ml-2 text-black">Dyarko &nbsp;</Typography>
        </p>}
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
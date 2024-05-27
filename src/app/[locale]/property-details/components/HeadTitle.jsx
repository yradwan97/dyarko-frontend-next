import React from 'react'
import Typography from '../../components/Shared/Typography'
import PropTypes from "prop-types";
import { useLocale } from 'next-intl';

function HeadTitle(props) {
  const locale = useLocale()
  return (
    <>
      <Typography variant='h4' as="h4" className={`mb-8 ${locale === "ar" && "text-end"} ${props.className} `}>{props.text}</Typography>
    </>
  )
}

HeadTitle.propTypes = {
  text: PropTypes.string.isRequired,
};

export default HeadTitle
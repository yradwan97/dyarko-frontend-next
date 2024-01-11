import React from 'react'
import Typography from '../../components/Shared/Typography'
import PropTypes from "prop-types";

function HeadTitle(props) {
  return (
    <>
        <Typography variant='h4' as="h4" className={`mb-8 ${props.className} `}>{props.text}</Typography>
    </>
  )
}

HeadTitle.propTypes = {
  text: PropTypes.string.isRequired,
};

export default HeadTitle
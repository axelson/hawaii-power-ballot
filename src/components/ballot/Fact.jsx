import React from 'react'
import PropTypes from 'prop-types'

import styles from './fact.scss'

export default function Fact (props) {
  const { label, value } = props

  return (
    <div>
      <span className={styles['label']}>{label}: </span>
      <span>{value}</span>
    </div>
  )
}

Fact.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
}

import React from 'react'
import PropTypes from 'prop-types'

export default class SvgIcon extends React.Component {
  render () {
    const { containerClassName, icon, wrappingElement, ...otherProps } = this.props

    return React.createElement(
      wrappingElement,
      {className: containerClassName},
      <svg {...otherProps}>
        <use xlinkHref={icon} />
      </svg>
    )
  }
}

SvgIcon.propTypes = {
  containerClassName: PropTypes.string,
  icon: PropTypes.string.isRequired,
  wrappingElement: PropTypes.string,
}
SvgIcon.defaultProps = {
  wrappingElement: 'div',
}

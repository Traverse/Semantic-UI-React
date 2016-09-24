import cx from 'classnames'
import React, { PropTypes } from 'react'

import {
  customPropTypes,
  getElementType,
  getUnhandledProps,
  META,
  useKeyOnly,
} from '../../lib'

function TabSegment(props) {
  const { active, children, className, loading } = props
  const rest = getUnhandledProps(TabSegment, props)
  const classes = cx(
    'ui',
    useKeyOnly(active, 'active'),
    useKeyOnly(loading, 'loading'),
    className,
    'tab'
  )
  const ElementType = getElementType(TabSegment, props)

  return <ElementType {...rest} className={classes}>{children}</ElementType>
}

TabSegment._meta = {
  name: 'TabSegment',
  parent: 'Tab',
  type: META.TYPES.MODULE,
}

TabSegment.propTypes = {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** Whether or not the modal is visible */
  active: PropTypes.bool,

  /** Additional classes */
  className: PropTypes.string,

  /** Primary content, intended to be SegmentItems */
  children: PropTypes.string,

  /** A tab can display a loading indicator */
  loading: PropTypes.bool,

  /** Shorthand prop for MenuItem */
  menuItem: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.number,
    PropTypes.object,
    PropTypes.string,
  ]),
}

export default TabSegment

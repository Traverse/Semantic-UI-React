import cx from 'classnames'
import React, { PropTypes } from 'react'

import {
  createShorthandFactory,
  customPropTypes,
  getUnhandledProps,
  META,
  useKeyOnly,
} from '../../lib'

import Segment from '../../elements/Segment/Segment'

/**
 * A Tab.Pane holds the content of a tab.
 */
function TabPane(props) {
  const { active, attached, children, className, loading } = props
  const rest = getUnhandledProps(TabPane, props)
  const classes = cx(
    'ui',
    useKeyOnly(active, 'active'),
    useKeyOnly(loading, 'loading'),
    className,
    'tab'
  )

  return (
    <Segment
      {...rest}
      // TODO: port all Segment props that can make sense for tab panes
      className={classes}
      attached={attached}
    >
      {children}
    </Segment>
  )
}

TabPane._meta = {
  name: 'TabPane',
  parent: 'Tab',
  type: META.TYPES.MODULE,
}

TabPane.propTypes = {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** A tab can be activated, and visible on the page. */
  active: PropTypes.bool,

  /** A Tab.Pane is attached to the bottom of the menu by default. */
  attached: Segment.propTypes.attached,

  /** Additional classes. */
  className: PropTypes.string,

  /** Primary content. */
  children: PropTypes.string,

  /** A Tab.Pane can display a loading indicator. */
  loading: PropTypes.bool,

  /** Shorthand for the MenuItem. */
  menuItem: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.object,
  ]),
}

TabPane.create = createShorthandFactory(TabPane, val => ({ children: val }), true)

export default TabPane

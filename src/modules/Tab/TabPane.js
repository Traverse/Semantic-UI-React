import cx from 'classnames'
import React, { PropTypes } from 'react'

import {
  createShorthandFactory,
  customPropTypes,
  getElementType,
  getUnhandledProps,
  META,
  useKeyOnly,
} from '../../lib'

import Segment from '../../elements/Segment/Segment'

/**
 * A Tab.Pane holds the content of a tab.
 * @see Segment
 */
function TabPane(props) {
  const { active, attached, children, className, loading } = props
  const rest = getUnhandledProps(TabPane, props)
  const ElementType = getElementType(TabPane, props)
  const classes = cx(
    'ui',
    useKeyOnly(active, 'active'),
    useKeyOnly(loading, 'loading'),
    className,
    'tab'
  )

  return (
    <ElementType
      {...rest}
      // TODO: port all Segment props that can make sense for tab panes
      className={classes}
      attached={attached}
    >
      {children}
    </ElementType>
  )
}

TabPane.defaultProps = {
  as: Segment,
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

  // ----------------------------------------
  // Segment Props

  /** A Tab.Pane is attached to the bottom of the menu by default. */
  attached: Segment.propTypes.attached,

  /** A basic segment has no special formatting. */
  basic: Segment.propTypes.basic,

  /** A segment can be circular. */
  circular: Segment.propTypes.circular,

  /** A segment can clear floated content. */
  clearing: Segment.propTypes.clearing,

  /** Segment can be colored. */
  color: Segment.propTypes.color,

  /** A segment may take up only as much space as is necessary. */
  compact: Segment.propTypes.compact,

  /** A segment may show its content is disabled. */
  disabled: Segment.propTypes.disabled,

  /** Segment content can be floated to the left or right. */
  floated: Segment.propTypes.floated,

  /** A segment can have its colors inverted for contrast. */
  inverted: Segment.propTypes.inverted,

  /** A segment can increase its padding. */
  padded: Segment.propTypes.padded,

  /** Formatted to look like a pile of pages. */
  piled: Segment.propTypes.piled,

  /** A segment may be formatted to raise above the page. */
  raised: Segment.propTypes.raised,

  /** A segment can be formatted to appear less noticeable. */
  secondary: Segment.propTypes.secondary,

  /** A segment can have different sizes. */
  size: Segment.propTypes.size,

  /** Formatted to show it contains multiple pages. */
  stacked: Segment.propTypes.stacked,

  /** A segment can be formatted to appear even less noticeable. */
  tertiary: Segment.propTypes.tertiary,

  /** Formats content to be aligned as part of a vertical group. */
  textAlign: Segment.propTypes.textAlign,

  /** Formats content to be aligned vertically. */
  vertical: Segment.propTypes.vertical,
}

TabPane.create = createShorthandFactory(TabPane, val => ({ children: val }), true)

export default TabPane

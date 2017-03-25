import _ from 'lodash/fp'
import React from 'react'
import PropTypes from 'prop-types'

import {
  AutoControlledComponent as Component,
  customPropTypes,
  getElementType,
  getUnhandledProps,
  META,
} from '../../lib'

import Menu from '../../collections/Menu/Menu'
import TabPane from './TabPane'

/**
 * A Tab is a hidden section of content activated by a Menu.
 * @see Menu
 * @see Segment
 */
class Tab extends Component {
  static _meta = {
    name: 'Tab',
    type: META.TYPES.MODULE,
  }

  static propTypes = {
    /** An element type to render as (string or function). */
    as: customPropTypes.as,

    /** The initial activeIndex. */
    defaultActiveIndex: PropTypes.number,

    /** Index of the currently active tab. */
    activeIndex: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),

    /**
     * Called on tab change.
     *
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - The proposed new Tab.Pane.
     * @param {object} data.activeIndex - The new proposed activeIndex.
     * @param {object} data.panes - Props of the new proposed active pane.
     */
    onChange: PropTypes.func,

    /** Shorthand props for the Menu. */
    menu: customPropTypes.contentShorthand,

    /** Shorthand props for the Menu. */
    panes: PropTypes.arrayOf(PropTypes.shape({
      menuItem: PropTypes.string.isRequired,
      render: PropTypes.func.isRequired,
    })),
  }

  static autoControlledProps = [
    'activeIndex',
  ]

  static defaultProps = {
    menu: { attached: true, tabular: true },
  }

  static Pane = TabPane

  state = {
    activeIndex: 0,
  }

  handleItemClick = (e, { index }) => {
    _.invoke('onChange', this.props, e, { activeIndex: index, ...this.props })
    this.trySetState({ activeIndex: index })
  }

  renderMenu() {
    const { menu, panes } = this.props
    const { activeIndex } = this.state

    return Menu.create(menu, {
      overrideProps: {
        items: _.map('menuItem', panes),
        onItemClick: this.handleItemClick,
        activeIndex,
      },
    })
  }

  render() {
    const { panes } = this.props
    const { activeIndex } = this.state

    const menu = this.renderMenu()
    const rest = getUnhandledProps(Tab, this.props)
    const ElementType = getElementType(Tab, this.props)

    return (
      <ElementType {...rest}>
        {menu.props.attached !== 'bottom' && menu}
        {_.invoke('render', panes[activeIndex], this.props)}
        {menu.props.attached === 'bottom' && menu}
      </ElementType>
    )
  }
}

export default Tab

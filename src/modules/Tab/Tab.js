import _ from 'lodash/fp'
import React, { Children, PropTypes } from 'react'

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

    /** One or more Tab.Pane components. */
    children: PropTypes.node,

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

    // ----------------------------------------
    // Menu Props

    /** The Tab menu may appear attached to the Tab.Panes. */
    attached: Menu.propTypes.attached,

    /** A menu item or menu can have no borders. */
    borderless: Menu.propTypes.borderless,

    /** Additional colors can be specified. */
    color: Menu.propTypes.color,

    /** A menu may have just icons (bool) or labeled icons. */
    icon: Menu.propTypes.icon,

    /** A menu may have its colors inverted to show greater contrast. */
    inverted: Menu.propTypes.inverted,

    /** A menu can point to show its relationship to nearby content. */
    pointing: Menu.propTypes.pointing,

    /** A menu can adjust its appearance to de-emphasize its contents. */
    secondary: Menu.propTypes.secondary,

    /** A menu can vary in size. */
    size: Menu.propTypes.size,

    /** A menu can be formatted to show tabs of information. */
    tabular: Menu.propTypes.tabular,

    /** A menu can be formatted for text content. */
    text: Menu.propTypes.text,
  }

  static defaultProps = {
    attached: true,
    tabular: true,
  }

  static autoControlledProps = [
    'activeIndex',
  ]

  static Pane = TabPane

  state = {
    activeIndex: 0,
  }

  componentWillMount() {
    if (super.componentWillMount) super.componentWillMount()

    this.parsePanes(this.props)
  }

  componentWillReceiveProps(nextProps) {
    if (super.componentWillReceiveProps) super.componentWillReceiveProps(nextProps)

    this.parsePanes(nextProps)
  }

  handleItemClick = (e, { index }) => {
    this.trySetState({ activeIndex: index })
    _.invoke('onChange', this.props, [e, { activeIndex: index, panes: this.panes[index] }])
  }

  parsePanes = (props) => {
    const { children } = props

    this.menuItems = []
    this.panes = []

    Children.forEach(children, pane => {
      if (pane.type !== TabPane) return

      const { menuItem, ...panes } = pane.props
      this.menuItems.push(menuItem)
      this.panes.push(panes)
    })
  }

  getMenuProps = () => ({ attached: true, tabular: true, ...this.props.menu })

  shouldMenuAttach = () => {
    const { pointing, secondary, text, vertical } = this.props

    return !secondary && !pointing && !text && !vertical
  }

  renderMenu() {
    const {
      attached,
      borderless,
      color,
      icon,
      inverted,
      pointing,
      secondary,
      size,
      tabular,
      text,
    } = this.props
    const { activeIndex } = this.state

    const shouldAttach = this.shouldMenuAttach()

    return (
      <Menu
        attached={shouldAttach && attached}
        borderless={borderless}
        color={color}
        icon={icon}
        inverted={inverted}
        pointing={pointing}
        secondary={secondary}
        size={size}
        tabular={shouldAttach && tabular}
        text={text}
        items={this.menuItems}
        onItemClick={this.handleItemClick}
        activeIndex={activeIndex}
      />
    )
  }

  renderPanes() {
    const { attached } = this.props
    const { activeIndex } = this.state

    const pane = this.panes[activeIndex]

    const defaultProps = {
      active: !_.isNil(pane.active) ? pane.active : true,
    }

    // attach segment to opposite side of menu
    // check for `true` last, it is the default value so likely to be present
    // otherwise, the calculated attached is always 'bottom' unless `false` is passed
    if (!this.shouldMenuAttach()) defaultProps.attached = false
    else if (attached === 'bottom') defaultProps.attached = 'top'
    else if (attached === true || attached === 'top') defaultProps.attached = 'bottom'

    return TabPane.create(pane, defaultProps)
  }

  render() {
    const { attached } = this.props

    const rest = getUnhandledProps(Tab, this.props)
    const ElementType = getElementType(Tab, this.props)

    return (
      <ElementType {...rest}>
        {attached !== 'bottom' && this.renderMenu()}
        {this.renderPanes()}
        {attached === 'bottom' && this.renderMenu()}
      </ElementType>
    )
  }
}

export default Tab

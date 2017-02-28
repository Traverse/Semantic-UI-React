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
    activeIndex: PropTypes.number,

    /**
     * Called on tab change.
     *
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - The proposed new Tab.Pane.
     * @param {object} data.activeIndex - The new proposed activeIndex.
     * @param {object} data.paneProps - Props of the new proposed active pane.
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

    /** A vertical menu may take the size of its container. */
    fluid: Menu.propTypes.fluid,

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

    /** A menu can stack at mobile resolutions. */
    stackable: Menu.propTypes.stackable,

    /** A menu can be formatted to show tabs of information. */
    tabular: Menu.propTypes.tabular,

    /** A menu can be formatted for text content. */
    text: Menu.propTypes.text,

    /** A vertical menu displays elements vertically. */
    vertical: Menu.propTypes.vertical,

    /** A menu can have its items divided evenly. */
    widths: Menu.propTypes.widths,
  }

  static defaultProps = {
    attached: true,
    tabular: true,
  }

  static autoControlledProps = [
    'activeIndex',
  ]

  static Pane = TabPane

  componentWillMount() {
    if (super.componentWillMount) super.componentWillMount()

    this.trySetState({ activeIndex: 0 })
    this.parsePanes(this.props)
  }

  componentWillReceiveProps(nextProps) {
    this.parsePanes(nextProps)
  }

  onChange = (e, data) => {
    const { onChange } = this.props
    if (onChange) onChange(e, data)
  }

  handleItemClick = (e, { index }) => {
    this.trySetState({ activeIndex: index })
    this.onChange(e, { activeIndex: index, paneProps: this.paneProps[index] })
  }

  parsePanes = (props) => {
    const { children } = props

    this.itemProps = []
    this.paneProps = []

    Children.forEach(children, pane => {
      const { menuItem, ...paneProps } = pane.props
      this.itemProps.push(menuItem)
      this.paneProps.push(paneProps)
    })
  }

  canAttach = () => {
    const { pointing, secondary, text, vertical } = this.props

    return !secondary && !pointing && !text && !vertical
  }

  renderMenu() {
    const {
      attached,
      borderless,
      color,
      fluid,
      icon,
      inverted,
      pointing,
      secondary,
      size,
      stackable,
      tabular,
      text,
      vertical,
      widths,
    } = this.props
    const { activeIndex } = this.state

    const canAttach = this.canAttach()

    return (
      <Menu
        attached={canAttach && attached}
        borderless={borderless}
        color={color}
        fluid={fluid}
        icon={icon}
        inverted={inverted}
        pointing={pointing}
        secondary={secondary}
        size={size}
        stackable={stackable}
        tabular={canAttach && tabular}
        text={text}
        vertical={vertical}
        widths={widths}
        items={this.itemProps}
        onItemClick={this.handleItemClick}
        activeIndex={activeIndex}
      />
    )
  }

  renderPanes() {
    const { attached, pointing, secondary, vertical } = this.props
    const { activeIndex } = this.state

    const props = this.paneProps[activeIndex]

    const calculatedProps = {
      active: !_.isNil(props.active) ? props.active : true,
    }

    // attach segment to opposite side of menu
    // check for `true` last, it is the default value so likely to be present
    // otherwise, the calculated attached is always 'bottom' unless `false` is passed
    if (!this.canAttach()) calculatedProps.attached = false
    else if (attached === 'bottom') calculatedProps.attached = 'top'
    else if (attached === true || attached === 'top') calculatedProps.attached = 'bottom'

    return TabPane.create(props, calculatedProps)
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

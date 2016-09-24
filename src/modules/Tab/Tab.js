import React, { Children, cloneElement, PropTypes } from 'react'

import {
  AutoControlledComponent as Component,
  customPropTypes,
  getElementType,
  getUnhandledProps,
  META,
} from '../../lib'
import Menu from '../../collections/Menu/Menu'

const _meta = {
  name: 'Tab',
  type: META.TYPES.MODULE,
}

import TabSegment from './TabSegment'

class Tab extends Component {
  static _meta = _meta

  static propTypes = {
    /** An element type to render as (string or function). */
    as: customPropTypes.as,

    /** One or more Tab.Segment components */
    children: PropTypes.node,

    /** The initial activeIndex */
    defaultActiveIndex: PropTypes.number,

    /** Index of the currently active tab. */
    activeIndex: PropTypes.number,

    /** Props to be passed to the menu. */
    menu: PropTypes.object,

    /** Called with the React Synthetic Event and the tab on tab change. */
    onTabChange: PropTypes.func,
  }

  static autoControlledProps = [
    'activeIndex',
  ]

  componentWillMount() {
    this.trySetState({
      activeIndex: 0,
    })
  }

  static Segment = TabSegment

  onTabChange = (e, tab) => {
    const { onTabChange } = this.props
    if (onTabChange) onTabChange(e, tab)
  }

  handleItemClick = (e, { index }) => {
    this.trySetState({ activeIndex: index })
    this.onTabChange(e, this.items[index])
  }

  renderMenu() {
    const { children, menu } = this.props
    const { activeIndex } = this.state

    const items = Children.map(children, (tabSegment) => tabSegment.props.menuItem)

    return (
      <Menu
        {...menu}
        items={items}
        onItemClick={this.handleItemClick}
        activeIndex={activeIndex}
      />
    )
  }

  renderTabs() {
    const { children } = this.props
    const { activeIndex } = this.state

    return Children.map(children, (tabSegment, index) => {
      const className = index === activeIndex ? 'active' : ''

      return cloneElement(tabSegment, { className })
    })
  }

  render() {
    const rest = getUnhandledProps(Tab, this.props)
    const ElementType = getElementType(Tab, this.props)

    return (
      <ElementType {...rest} onTabChange={this.onTabChange}>
        {this.renderMenu()}
        {this.renderTabs()}
      </ElementType>
    )
  }
}

export default Tab

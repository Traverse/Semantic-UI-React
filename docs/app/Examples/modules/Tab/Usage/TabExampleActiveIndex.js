import React, { Component } from 'react'
import { Tab } from 'semantic-ui-react'

class TabExampleActiveIndex extends Component {
  state = { activeIndex: 0 }

  handleChange = e => this.setState({ activeIndex: Number(e.target.value) })

  render() {
    const { activeIndex } = this.state

    return (
      <div>
        <div>activeIndex: {activeIndex}</div>
        <input type='range' max='2' value={activeIndex} onChange={this.handleChange} />
        <Tab activeIndex={activeIndex}>
          <Tab.Pane menuItem='Tab 1'>Tab 1 Content</Tab.Pane>
          <Tab.Pane menuItem='Tab 2'>Tab 2 Content</Tab.Pane>
          <Tab.Pane menuItem='Tab 3'>Tab 3 Content</Tab.Pane>
        </Tab>
      </div>
    )
  }
}

export default TabExampleActiveIndex

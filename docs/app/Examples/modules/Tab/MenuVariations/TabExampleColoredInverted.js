import _ from 'lodash'
import React, { Component } from 'react'
import { Divider, Tab } from 'semantic-ui-react'

const colors = [
  'red', 'orange', 'yellow', 'olive', 'green', 'teal',
  'blue', 'violet', 'purple', 'pink', 'brown', 'grey',
]

class TabExampleColoredInverted extends Component {
  state = { color: colors[0] }

  handleColorChange = e => this.setState({ color: e.target.value })

  render() {
    const { color } = this.state

    return (
      <div>
        <select onChange={this.handleColorChange}>
          {_.map(colors, c => <option key={c} value={c}>{_.startCase(c)}</option>)}
        </select>

        <Divider hidden />

        <Tab inverted color={color} tabular={false} attached={false}>
          <Tab.Pane menuItem='Tab 1'>Tab 1 Content</Tab.Pane>
          <Tab.Pane menuItem='Tab 2'>Tab 2 Content</Tab.Pane>
          <Tab.Pane menuItem='Tab 3'>Tab 3 Content</Tab.Pane>
        </Tab>
      </div>
    )
  }
}

export default TabExampleColoredInverted

import React from 'react'
import { Tab } from 'semantic-ui-react'

const TabExampleDefaultActiveIndex = () => (
  <Tab defaultActiveIndex={1}>
    <Tab.Pane menuItem='Tab 1'>Tab 1 Content</Tab.Pane>
    <Tab.Pane menuItem='Tab 2 (default active)'>Tab 2 Content</Tab.Pane>
    <Tab.Pane menuItem='Tab 3'>Tab 3 Content</Tab.Pane>
  </Tab>
)

export default TabExampleDefaultActiveIndex

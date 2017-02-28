import React from 'react'
import { Tab } from 'semantic-ui-react'

const TabExampleLoading = () => (
  <Tab>
    <Tab.Pane menuItem='Tab 1' loading>Tab 1 Content</Tab.Pane>
    <Tab.Pane menuItem='Tab 2'>Tab 2 Content</Tab.Pane>
    <Tab.Pane menuItem='Tab 3'>Tab 3 Content</Tab.Pane>
  </Tab>
)

export default TabExampleLoading

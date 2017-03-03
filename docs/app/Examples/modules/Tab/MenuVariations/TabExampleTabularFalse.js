import React from 'react'
import { Tab } from 'semantic-ui-react'

const TabExampleTabularFalse = () => (
  <Tab attached={false} tabular={false}>
    <Tab.Pane menuItem='Tab 1'>Tab 1 Content</Tab.Pane>
    <Tab.Pane menuItem='Tab 2'>Tab 2 Content</Tab.Pane>
    <Tab.Pane menuItem='Tab 3'>Tab 3 Content</Tab.Pane>
  </Tab>
)

export default TabExampleTabularFalse

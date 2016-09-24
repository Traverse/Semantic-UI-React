import React from 'react'
import { Tab } from 'stardust'

const TabLoadingExample = () => (
  <Tab>
    <Tab.Segment menuItem='Tab 1' loading>Tab 1 Content</Tab.Segment>
    <Tab.Segment menuItem='Tab 2'>Tab 2 Content</Tab.Segment>
    <Tab.Segment menuItem='Tab 3'>Tab 3 Content</Tab.Segment>
  </Tab>
)

export default TabLoadingExample

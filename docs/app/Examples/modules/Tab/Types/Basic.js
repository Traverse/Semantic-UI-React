import React from 'react'
import { Segment, Tab } from 'stardust'

const TabBasicExample = () => (
  <Tab menu={{ attached: 'top', tabular: true }}>
    <Tab.Segment as={Segment} attached='bottom' menuItem='Tab 1'>Tab 1 Content</Tab.Segment>
    <Tab.Segment as={Segment} attached='bottom' menuItem='Tab 2'>Tab 2 Content</Tab.Segment>
    <Tab.Segment as={Segment} attached='bottom' menuItem='Tab 3'>Tab 3 Content</Tab.Segment>
  </Tab>
)

export default TabBasicExample

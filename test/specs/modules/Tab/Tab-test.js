import _ from 'lodash'
import sinon from 'sinon'
import React from 'react'

import Tab from 'src/modules/Tab/Tab'
import TabPane from 'src/modules/Tab/TabPane'
import * as common from 'test/specs/commonTests'
import { sandbox } from 'test/utils'

describe('Tab', () => {
  common.isConformant(Tab)
  common.hasSubComponents(Tab, [TabPane])

  const tabs = [
    <TabPane menuItem='Tab 1'>Tab 1 Content</TabPane>,
    <TabPane menuItem='Tab 2'>Tab 2 Content</TabPane>,
    <TabPane menuItem='Tab 3'>Tab 3 Content</TabPane>,
  ]

  describe('activeIndex', () => {
    it('defaults to the first tab', () => {
      const wrapper = shallow(<Tab>{tabs}</Tab>)

      wrapper
        .find('Menu')
        .first()
        .should.have.prop('activeIndex', 0)

      wrapper
        .find('TabPane')
        .first()
        .should.have.prop('active', true)
    })

    it('is set when clicking an item', () => {
      // random item, skip the first as its selected by default
      const randomIndex = 1 + _.random(tabs.length - 2)
      const wrapper = mount(<Tab>{tabs}</Tab>)

      wrapper
        .find('MenuItem')
        .at(randomIndex)
        .simulate('click')
        .should.have.prop('active', true)

      wrapper
        .find('TabPane')
        .at(randomIndex)
        .should.have.prop('active', true)
    })

    it('can be set via props', () => {
      // random item, skip the first as its selected by default
      const randomIndex = 1 + _.random(tabs.length - 2)
      const wrapper = mount(<Tab activeIndex={randomIndex}>{tabs}</Tab>)

      wrapper
        .find('Menu')
        .first()
        .should.have.prop('activeIndex', randomIndex)

      wrapper
        .find('TabPane')
        .at(randomIndex)
        .should.have.prop('active', true)
    })

    it('can be overridden with `active` on an individual pane', () => {
      // TODO
    })
  })

  describe('onTabChange', () => {
    let spy
    beforeEach(() => {
      spy = sandbox.spy()
    })

    it('is called when a menu item is clicked', () => {
      const randomIndex = _.random(tabs.length - 1)

      mount(<Tab onTabChange={spy}>{tabs}</Tab>)
        .find('MenuItem')
        .at(randomIndex)
        .simulate('click')

      // Since React will have generated a key the returned tab won't match
      // exactly so match on the props instead.
      spy.should.have.been.calledWithMatch(
        sinon.match.any,
        tab => tab.props === tabs[randomIndex].props
      )
    })
  })
})

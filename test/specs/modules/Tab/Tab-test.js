import _ from 'lodash'
import sinon from 'sinon'
import React from 'react'

import Tab from 'src/modules/Tab/Tab'
import TabSegment from 'src/modules/Tab/TabSegment'
import * as common from 'test/specs/commonTests'
import { sandbox } from 'test/utils'

describe('Tab', () => {
  common.isConformant(Tab)
  common.hasSubComponents(Tab, [TabSegment])

  const tabs = [
    <TabSegment menuItem='Tab 1'>Tab 1 Content</TabSegment>,
    <TabSegment menuItem='Tab 2'>Tab 2 Content</TabSegment>,
    <TabSegment menuItem='Tab 3'>Tab 3 Content</TabSegment>,
  ]

  describe('activeIndex', () => {
    it('defaults to the first tab', () => {
      const wrapper = shallow(<Tab>{tabs}</Tab>)

      wrapper
        .find('Menu')
        .first()
        .should.have.prop('activeIndex', 0)

      wrapper
        .find('TabSegment')
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
        .find('TabSegment')
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
        .find('TabSegment')
        .at(randomIndex)
        .should.have.prop('active', true)
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

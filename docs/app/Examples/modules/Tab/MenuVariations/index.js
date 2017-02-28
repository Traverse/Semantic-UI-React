import React from 'react'
import ComponentExample from 'docs/app/Components/ComponentDoc/ComponentExample'
import ExampleSection from 'docs/app/Components/ComponentDoc/ExampleSection'

const TabMenuVariationsExamples = () => (
  <ExampleSection title='Menu Variations'>
    <ComponentExample
      title='Attached Menu'
      description='A tab menu can be attached on top.'
      examplePath='modules/Tab/MenuVariations/TabExampleAttachedTop'
    />
    <ComponentExample
      examplePath='modules/Tab/MenuVariations/TabExampleAttached'
    />
    <ComponentExample
      description='A tab menu can be attached on bottom.'
      examplePath='modules/Tab/MenuVariations/TabExampleAttachedBottom'
    />
    <ComponentExample
      description='A tab menu can remove its attached appearance.'
      examplePath='modules/Tab/MenuVariations/TabExampleAttachedFalse'
    />
  </ExampleSection>
)

export default TabMenuVariationsExamples

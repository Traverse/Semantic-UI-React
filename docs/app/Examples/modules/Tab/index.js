import React from 'react'
import ComponentExample from 'docs/app/Components/ComponentDoc/ComponentExample'
import ExampleSection from 'docs/app/Components/ComponentDoc/ExampleSection'

const TabExamples = () => (
  <div>
    <ExampleSection title='Types'>
      <ComponentExample
        title='Basic'
        description='A basic tab'
        examplePath='modules/Tab/Types/Basic'
      />
    </ExampleSection>
    <ExampleSection title='States'>
      <ComponentExample
        title='Loading'
        description='A tab can display a loading indicator'
        examplePath='modules/Tab/States/Loading'
      />
    </ExampleSection>
  </div>
)

export default TabExamples

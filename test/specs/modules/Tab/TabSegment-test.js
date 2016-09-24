import TabSegment from 'src/modules/Tab/TabSegment'
import * as common from 'test/specs/commonTests'

describe('TabSegment', () => {
  common.isConformant(TabSegment)
  common.propKeyOnlyToClassName(TabSegment, 'loading')
})

import TabPane from 'src/modules/Tab/TabPane'
import * as common from 'test/specs/commonTests'

describe('TabPane', () => {
  common.isConformant(TabPane)
  common.propKeyOnlyToClassName(TabPane, 'active')
  common.propKeyOnlyToClassName(TabPane, 'loading')
})

import React from 'react'
import { connect } from 'react-redux'
import * as Styled from './styled'
import Player from './player'

function AudioPanel() {
  return (
    <Styled.Container>
      <Player />
    </Styled.Container>
  )
}

const mapDispatchToProps = {}

const mapStateToProps = (state) => ({
  state: state.app,
})

export default connect(mapStateToProps, mapDispatchToProps)(AudioPanel)

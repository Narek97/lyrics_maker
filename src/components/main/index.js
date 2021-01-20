import React from 'react'
import * as Styled from './styled'
import MenuPanel from './menu_panel'
import CanvasPanel from './screan_panel/canvas'
import LyricsPanel from './lyrics'

export default function Main() {
  return (
    <Styled.Container>
      <MenuPanel />
      <CanvasPanel />
      <LyricsPanel />
    </Styled.Container>
  )
}

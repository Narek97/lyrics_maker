import React from 'react'
import * as Styled from './styled'
import { useElementResize } from '../../../useHook/useElementResize'
export default function RightButton({ lineRef, containerRef }) {
  const onElementResize = useElementResize(lineRef, containerRef, 'right')
  return (
    <Styled.RightButton onMouseDown={onElementResize}>
      <Styled.Icon className="material-icons">chevron_right</Styled.Icon>
    </Styled.RightButton>
  )
}

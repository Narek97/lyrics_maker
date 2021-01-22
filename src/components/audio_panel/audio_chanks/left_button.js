import React from 'react'
import * as Styled from './styled'
import { useElementResize } from '../../../useHook/useElementResize'
export default function LeftButton({ lineRef, containerRef }) {
  const onElementResize = useElementResize(lineRef, containerRef, 'left')

  return (
    <Styled.leftButton onMouseDown={onElementResize}>
      <Styled.Icon className="material-icons">chevron_left</Styled.Icon>
    </Styled.leftButton>
  )
}

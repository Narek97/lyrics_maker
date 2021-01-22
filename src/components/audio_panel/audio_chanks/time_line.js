import React, { useRef } from 'react'
import LeftButton from './left_button'
import RightButton from './right_button'
import * as Styled from './styled'
import { useElementResize } from '../../../useHook/useElementResize'

export function TimeLines({ containerRef, el }) {
  const lineRef = useRef(null)
  const onElementResize = useElementResize(
    lineRef,
    containerRef,
    'center',
    el.id
  )
  return (
    <Styled.TimeLinesItem
      key={el.id}
      left={el.start}
      right={el.end}
      ref={lineRef}
    >
      <Styled.CenterButton onMouseDown={onElementResize}></Styled.CenterButton>
      <LeftButton lineRef={lineRef} containerRef={containerRef} />
      <RightButton lineRef={lineRef} containerRef={containerRef} />
    </Styled.TimeLinesItem>
  )
}

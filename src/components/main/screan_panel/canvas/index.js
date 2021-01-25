import React from 'react'
import { connect } from 'react-redux'
import { useWindowSize } from '../../../../useHook/useWindowSize'
import * as Styled from './styled'

function CanvasPanel({ imageUrl, canvasHeight, canvasWidth }) {
  const size = useWindowSize()

  return (
    <Styled.Container>
      <Styled.Div1>
        <Styled.Div2 width={size[0]} height={size[1]}>
          <Styled.Div3>
            <Styled.Div4
              canvasWidth={canvasWidth}
              canvasHeight={canvasHeight}
              imageUrl={imageUrl}
              width={size[0]}
            >
              <span> hello world</span>
            </Styled.Div4>
          </Styled.Div3>
        </Styled.Div2>
      </Styled.Div1>
    </Styled.Container>
  )
}

const mapDispatchToProps = {}

const mapStateToProps = (state) => ({
  imageUrl: state.app.imageUrl,
  canvasHeight: state.app.canvasHeight,
  canvasWidth: state.app.canvasWidth,
})

export default connect(mapStateToProps, mapDispatchToProps)(CanvasPanel)

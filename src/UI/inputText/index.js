import React, { useRef, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import * as Styled from './styled'
import { chageAudioChankText } from '../../redux/action'

function InputText({ chageAudioChankText, id, text }) {
  const ref = useRef(null)
  const [value, setValue] = useState('1')
  const onBlurText = () => {
    console.log(value, 852)
    chageAudioChankText(value, id)
  }

  useEffect(() => {
    ref.current.addEventListener('blur', onBlurText)
  }, [])
  return (
    <Styled.InputText
      onChange={(e) => setValue(e.target.value)}
      defaultValue={text}
      ref={ref}
    />
  )
}

const mapDispatchToProps = {
  chageAudioChankText,
}

export default connect(null, mapDispatchToProps)(InputText)

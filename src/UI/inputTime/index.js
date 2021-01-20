import React, { useRef, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import * as Styled from './styled'
import { chageAudioChankStart, chageAudioChankEnd } from '../../redux/action'
import { Time } from '../../useHook/useTime'
import { Second } from '../../useHook/useSecond'

function InputTime({
  chageAudioChankStart,
  chageAudioChankEnd,
  id,
  start,
  end,
}) {
  const refStart = useRef(null)
  const refEnd = useRef(null)
  const [valueStart, setValueStart] = useState('')
  const [valueEnd, setValueEnd] = useState('')
  const {
    hours: hoursStart,
    minutes: minutesStart,
    seconds: secondsStart,
  } = Time(start)
  const { hours: hoursEnd, minutes: minutsEnd, seconds: secondsEnd } = Time(end)

  const onBlurTimeStart = () => {
    const val = Second(refStart.current.value)
    chageAudioChankStart(val, id)
  }
  const onBlurTimeEnd = () => {
    const val = Second(refEnd.current.value)
    chageAudioChankEnd(val, id)
  }
  useEffect(() => {
    refStart.current.addEventListener('blur', onBlurTimeStart)
    refEnd.current.addEventListener('blur', onBlurTimeEnd)
  }, [])

  return (
    <>
      <span>start</span>
      <Styled.InputTime
        defaultValue={`${hoursStart}:${minutesStart}:${secondsStart}`}
        onChange={(e) => setValueStart(e.target.value)}
        ref={refStart}
        name="appt-time"
        type="time"
        step="2"
      />
      <span>|</span>
      <span>end</span>
      <Styled.InputTime
        required
        defaultValue={`${hoursEnd}:${minutsEnd}:${secondsEnd}`}
        onChange={(e) => setValueEnd(e.target.value)}
        ref={refEnd}
        name="appt-time"
        type="time"
        step="2"
      />
    </>
  )
}

const mapDispatchToProps = {
  chageAudioChankStart,
  chageAudioChankEnd,
}

export default connect(null, mapDispatchToProps)(InputTime)

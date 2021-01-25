import React, { useRef, useEffect, useState, useCallback } from 'react'
import { connect } from 'react-redux'
import * as Styled from './styled'
import { chageAudioChankStart, chageAudioChankEnd } from '../../redux/action'
import { Time } from '../../useHook/useTime'
import { second } from '../../useHook/useSecond'

function InputTime({
  chageAudioChankStart,
  chageAudioChankEnd,
  id,
  start,
  end,
}) {
  const { hours: hoursEnd, minutes: minutsEnd, seconds: secondsEnd } = Time(end)
  const {
    hours: hoursStart,
    minutes: minutesStart,
    seconds: secondsStart,
  } = Time(start)

  const refStart = useRef(null)
  const refEnd = useRef(null)

  const [valueStart, setValueStart] = useState(
    `${hoursStart}:${minutesStart}:${secondsStart}`
  )
  const [valueEnd, setValueEnd] = useState(
    `${hoursEnd}:${minutsEnd}:${secondsEnd}`
  )

  const onBlurTimeStart = useCallback(() => {
    console.log(valueStart, 'valueStart')
    const val = second(refStart.current.value)
    chageAudioChankStart(val, id)
  }, [setValueStart])

  const onBlurTimeEnd = useCallback(() => {
    console.log(valueEnd, 'valueEnd')
    const val = second(refEnd.current.value)
    chageAudioChankEnd(val, id)
  }, [setValueEnd])

  useEffect(() => {
    refStart.current.addEventListener('blur', onBlurTimeStart)
    refEnd.current.addEventListener('blur', onBlurTimeEnd)
  }, [onBlurTimeEnd, onBlurTimeStart])

  useEffect(() => {
    setValueStart(`${hoursStart}:${minutesStart}:${secondsStart}`)
    setValueEnd(`${hoursEnd}:${minutsEnd}:${secondsEnd}`)
  }, [start, end])

  return (
    <>
      <span>start</span>
      <Styled.InputTime
        value={valueStart}
        onChange={(e) => setValueStart(e.target.value)}
        ref={refStart}
        name="appt-time"
        type="time"
        step="1"
      />
      <span>|</span>
      <span>end</span>
      <Styled.InputTime
        required
        value={valueEnd}
        onChange={(e) => setValueEnd(e.target.value)}
        ref={refEnd}
        name="appt-time"
        type="time"
        step="1"
      />
    </>
  )
}

const mapDispatchToProps = {
  chageAudioChankStart,
  chageAudioChankEnd,
}

export default connect(null, mapDispatchToProps)(InputTime)

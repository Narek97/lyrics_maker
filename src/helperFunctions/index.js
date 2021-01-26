import { DURATION, MIN, MAX, MIN_LENGTH } from '../constants'
import { second } from '../useHook/useSecond'

export const getElementPercent = (val, width) => (val / width) * 100

const getElemetTime = (val) => {
  return Math.ceil((val * DURATION) / 100)
}

const substring = (str) => str.substring(0, str.length - 1)

const validateTimeLinerRight = (audioChunks, idx, time) => {
  if (audioChunks[idx + 1]) {
    return time < audioChunks[idx + 1].start ? false : true
  }
}
const validateTimeLinerLeft = (audioChunks, idx, time) => {
  if (audioChunks[idx - 1]) {
    return time > audioChunks[idx - 1].end ? false : true
  }
}

const validateTimeLiner = (
  newPos,
  audioChunks,
  idx,
  timeLinerWithPerecent = 0
) => {
  if (newPos < MIN || newPos + timeLinerWithPerecent > MAX) {
    return false
  }
  const timeStart = getElemetTime(newPos)
  if (validateTimeLinerLeft(audioChunks, idx, timeStart)) {
    return false
  }
  const timeEnd = getElemetTime(newPos + timeLinerWithPerecent)
  if (validateTimeLinerRight(audioChunks, idx, timeEnd)) {
    return false
  }
  return true
}

const moveTimeLinerCenter = (
  e,
  element,
  timeLiner,
  container,
  audioChunks,
  idx
) => {
  const newPos = getElementPercent(
    e.pageX - 10 - timeLiner.width / 2,
    container.width
  )
  const timeLinerWithPerecent = getElementPercent(
    timeLiner.width,
    container.width
  )
  const isValid = validateTimeLiner(
    newPos,
    audioChunks,
    idx,
    timeLinerWithPerecent
  )
  if (isValid) {
    element.style.left = `${newPos}%`
  }
  return getElemetTime(substring(element.style.left))
}

const moveTimeLinerLeft = (
  e,
  element,
  container,
  audioChunks,
  idx,
  initialTimerSize
) => {
  const newLeft = getElementPercent(e.pageX - 10, container.width)
  const oldLeft = getElementPercent(initialTimerSize.left - 10, container.width)
  const newWidth = getElementPercent(initialTimerSize.width, container.width)
  const isValid = validateTimeLiner(newLeft, audioChunks, idx)
  if (isValid) {
    element.style.left = `${newLeft}%`
    element.style.width = `${newWidth - (newLeft - oldLeft)}%`
  }
  return getElemetTime(substring(element.style.left))
}

const moveTimeLinerRight = (
  e,
  element,
  container,
  audioChunks,
  idx,
  initialTimerSize
) => {
  const firstTimePerecent = getElementPercent(
    initialTimerSize.left - 10,
    container.width
  )
  const newWidth = getElementPercent(e.pageX - 10, container.width)
  const isValid = validateTimeLiner(newWidth, audioChunks, idx)
  if (isValid) {
    element.style.width = `${newWidth - firstTimePerecent}%`
  }
  return getElemetTime(+substring(element.style.width) + firstTimePerecent)
}

export const onResize = (
  e,
  ref,
  containerRef,
  tipe,
  audioChunks,
  idx,
  initialTimerSize
) => {
  const element = ref.current
  const timeLiner = element.getBoundingClientRect()
  const container = containerRef.current.getBoundingClientRect()
  if (tipe === 'center') {
    return moveTimeLinerCenter(
      e,
      element,
      timeLiner,
      container,
      audioChunks,
      idx
    )
  }

  if (tipe === 'left') {
    return moveTimeLinerLeft(
      e,
      element,
      container,
      audioChunks,
      idx,
      initialTimerSize
    )
  }

  if (tipe === 'right') {
    return moveTimeLinerRight(
      e,
      element,
      container,
      audioChunks,
      idx,
      initialTimerSize
    )
  }
}

export const isValidateStart = (time, data, id) => {
  const index = data.audioChunks.findIndex((el) => el.id === id)
  if (
    data.audioChunks[index - 1] &&
    second(time) <= data.audioChunks[index - 1].end
  ) {
    return false
  }
  if (second(time) <= data.audioChunks[index].end - 10) {
    return true
  }
  return false
}

export const isValidateEnd = (time, data, id) => {
  const index = data.audioChunks.findIndex((el) => el.id === id)
  if (
    data.audioChunks[index + 1] &&
    second(time) >= data.audioChunks[index + 1].start
  ) {
    return false
  }
  if (second(time) <= data.duration) {
    return true
  }
  return false
}

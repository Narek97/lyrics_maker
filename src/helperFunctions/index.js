import { DURATION } from '../constants'
import { second } from '../useHook/useSecond'

export const getElementPercent = (val, width) => (val / width) * 100

const changeChankTime = (val) => {
  return Math.floor((val * DURATION) / 100)
}

const validateTimeLInerRight = (audioChunks, idx, time) => {
  if (audioChunks[idx + 1]) {
    return changeChankTime(time) < audioChunks[idx + 1].start ? true : false
  }
  return true
}
const validateTimeLInerLeft = (audioChunks, idx, time) => {
  if (audioChunks[idx - 1]) {
    return changeChankTime(time) > audioChunks[idx - 1].end ? true : false
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
  const timeLinerWidth = getElementPercent(timeLiner.width, container.width)
  if (newPos < 0) {
    return changeChankTime(
      getElementPercent(element.getBoundingClientRect().left, container.width)
    )
  }
  if (timeLinerWidth + newPos >= 100) {
    return changeChankTime(getElementPercent(timeLiner.left, container.width))
  }
  const isValidLeft = validateTimeLInerLeft(audioChunks, idx, newPos)
  const isValidRight = validateTimeLInerRight(
    audioChunks,
    idx,
    newPos + getElementPercent(timeLiner.width, container.width)
  )
  if (isValidLeft && isValidRight) {
    element.style.left = `${newPos}%`
    return changeChankTime(newPos)
  } else {
    return changeChankTime(
      getElementPercent(element.getBoundingClientRect().left, container.width)
    )
  }
}

const moveTimeLinerLeft = (
  e,
  element,
  container,
  initialTimerLeft,
  initialTimerWidth,
  audioChunks,
  idx
) => {
  const newLeft = getElementPercent(e.pageX - 10, container.width)
  const oldLeft = getElementPercent(initialTimerLeft - 10, container.width)
  const newWidth = getElementPercent(initialTimerWidth, container.width)
  const isValid = validateTimeLInerLeft(audioChunks, idx, newLeft)
  if (e.pageX >= 10 && isValid) {
    element.style.left = `${newLeft}%`
    element.style.width = `${newWidth - (newLeft - oldLeft)}%`
    return changeChankTime(newLeft)
  } else {
    return changeChankTime(
      getElementPercent(element.getBoundingClientRect().left, container.width)
    )
  }
}

const moveTimeLinerRight = (
  e,
  element,
  timeLiner,
  container,
  initialTimerLeft,
  audioChunks,
  idx
) => {
  const firstTime = getElementPercent(initialTimerLeft, container.width)
  const oldLeft = getElementPercent(initialTimerLeft - 10, container.width)
  const newWidth = getElementPercent(e.pageX - timeLiner.left, container.width)
  const maxWidth =
    getElementPercent(timeLiner.width, container.width) + firstTime

  const isValid = validateTimeLInerRight(audioChunks, idx, newWidth + firstTime)

  if (newWidth + oldLeft <= 100 && isValid) {
    element.style.width = `${newWidth}%`
    return changeChankTime(newWidth + firstTime)
  } else {
    return changeChankTime(maxWidth)
  }
}

export const onResize = (
  e,
  ref,
  containerRef,
  tipe,
  initialTimerWidth,
  initialTimerLeft,
  idx,
  audioChunks
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
      initialTimerLeft,
      initialTimerWidth,
      audioChunks,
      idx
    )
  }

  if (tipe === 'right') {
    return moveTimeLinerRight(
      e,
      element,
      timeLiner,
      container,
      initialTimerLeft,
      audioChunks,
      idx
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

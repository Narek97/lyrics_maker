import { useState, useEffect } from 'react'
import { getElementPercent } from '../helperFunctions'

export const useElementResize = (ref, containerRef, tipe) => {
  const [isResizing, setIsResizing] = useState(false)
  const [initialTimerWidth, setInitialTimerWidth] = useState(0)
  const [initialTimerLeft, setInitialTimerLeft] = useState(0)

  let time = 0

  const onResize = (e) => {
    const element = ref.current
    const timeLiner = element.getBoundingClientRect()
    const container = containerRef.current.getBoundingClientRect()

    if (tipe === 'center') {
      const newPos = getElementPercent(
        e.pageX - 10 - timeLiner.width / 2,
        container.width
      )
      const timeLinerWidth = getElementPercent(timeLiner.width, container.width)
      if (newPos >= 0 && newPos + timeLinerWidth <= 100) {
        element.style.left = `${newPos}%`
        time = newPos
      }
    }

    if (tipe === 'left' && e.pageX >= 10) {
      const newLeft = getElementPercent(e.pageX - 10, container.width)
      const oldLeft = getElementPercent(initialTimerLeft - 10, container.width)
      const newWidth = getElementPercent(initialTimerWidth, container.width)

      element.style.left = `${newLeft}%`
      element.style.width = `${newWidth - (newLeft - oldLeft)}%`
    }
    if (tipe === 'right' && e.pageX - timeLiner.left <= container.width) {
      const newWidth = getElementPercent(
        e.pageX - timeLiner.left,
        container.width
      )
      if (newWidth <= 100) {
        element.style.width = `${newWidth}%`
      }
    }
  }

  const onStopResize = () => {
    setIsResizing(false)
    window.removeEventListener('mousemove', onResize)
  }

  const startResizing = (e) => {
    setInitialTimerWidth(ref.current.getBoundingClientRect().width)
    setInitialTimerLeft(ref.current.getBoundingClientRect().left)

    setIsResizing(true)
  }

  const stopResizeLeave = () => {
    setIsResizing(false)
    window.removeEventListener('mousemove', onResize)
  }

  useEffect(() => {
    if (ref.current) {
      if (isResizing) {
        window.addEventListener('mousemove', onResize)
        window.addEventListener('mouseup', onStopResize)
        window.addEventListener('mouseleave', stopResizeLeave)
      }
    }

    return () => {
      window.removeEventListener('mousemove', onResize)
      window.removeEventListener('mouseup', onStopResize)
      window.removeEventListener('mouseleave', stopResizeLeave)
    }
  }, [ref, containerRef, isResizing]) // eslint-disable-line react-hooks/exhaustive-deps

  return startResizing
}

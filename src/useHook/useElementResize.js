import { useState, useEffect } from 'react'
import { onResize } from '../helperFunctions'
import { useDispatch, useSelector } from 'react-redux'
import {
  chageAudioChankStartEnd,
  chageAudioChankStart,
  chageAudioChankEnd,
} from '../redux/action'

export const useElementResize = (ref, containerRef, tipe, el, idx) => {
  const dispatch = useDispatch()
  const [isResizing, setIsResizing] = useState(false)
  const [initialTimerWidth, setInitialTimerWidth] = useState(0)
  const [initialTimerLeft, setInitialTimerLeft] = useState(0)
  const audioChunks = useSelector((state) => state.app.audioChunks)
  let time = null

  const elemetResize = (e) => {
    const data = onResize(
      e,
      ref,
      containerRef,
      tipe,
      initialTimerWidth,
      initialTimerLeft,
      idx,
      audioChunks
    )
    time = data
  }

  const onStopResize = () => {
    setIsResizing(false)
    if (tipe === 'center' && time) {
      dispatch(chageAudioChankStartEnd(time, el.id))
    }
    if (tipe === 'left' && time) {
      dispatch(chageAudioChankStart(time, el.id))
    }
    if (tipe === 'right' && time) {
      dispatch(chageAudioChankEnd(time, el.id))
    }
  }

  const startResizing = () => {
    setInitialTimerWidth(ref.current.getBoundingClientRect().width)
    setInitialTimerLeft(ref.current.getBoundingClientRect().left)
    setIsResizing(true)
  }

  const stopResizeLeave = () => {
    setIsResizing(false)
  }

  useEffect(() => {
    if (ref.current) {
      if (isResizing) {
        window.addEventListener('mousemove', elemetResize)
        window.addEventListener('mouseup', onStopResize)
        window.addEventListener('mouseleave', stopResizeLeave)
      }
    }

    return () => {
      window.removeEventListener('mousemove', elemetResize)
      window.removeEventListener('mouseup', onStopResize)
      window.removeEventListener('mouseleave', stopResizeLeave)
    }
  }, [ref, containerRef, isResizing]) // eslint-disable-line react-hooks/exhaustive-deps

  return startResizing
}

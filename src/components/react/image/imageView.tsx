import React, { useState, useEffect } from 'react'
import { Icon } from 'antd'
import './style.less'

interface SrcListProps {
  title: string;
  src: string;
}
interface Props {
  list: SrcListProps[];
  activeKey?: number;
}

export default function ImageView (props: Props) {
  const { list, activeKey = 0 } = props
  const [currentIndex, currentIndexChanged] = useState(activeKey)
  const [visible, visibleChanged] = useState(false)
  const [angle, angleChanged] = useState(0)
  const [scaleX, scaleXChanged] = useState(1)
  const [scaleY, scaleYChanged] = useState(1)

  const initState = () => {
    angleChanged(0)
    scaleXChanged(1)
    scaleYChanged(1)
  }

  function getImageSize (url: string): Promise<[number, number]> {
    return new Promise((resolve, reject) => {
      const src = url
      const image = new Image()
      image.onload = function () {
        resolve([(this as any)?.width, (this as any)?.height])
      }
      image.onerror = reject
      image.src = src
    })
  }

  const initImage = async (index: number) => {
    const oImage = document.getElementById('imageContent') as HTMLImageElement
    const [fileWidth, fileHeight] = await getImageSize(list[index].src)
    let oWidth
    let oHeight
    if (oImage && fileWidth > fileHeight) {
      oWidth = fileWidth > 580 ? 580 : fileWidth
      oHeight = fileHeight * (580 / fileWidth)
    } else {
      oHeight = oImage && (fileHeight > 580 ? 580 : fileHeight)
      oWidth = oImage && (fileWidth * (580 / fileHeight))
    }
    if (oImage) {
      oImage.style.width = `${oWidth}px`
      oImage.style.height = `${oHeight}px`
      oImage.style.left = `${(580 - oWidth) / 2}px`
      oImage.style.top = `${(580 - oHeight) / 2}px`
    }
  }

  useEffect(() => {
    initImage(currentIndex)
  }, [currentIndex])

  useEffect(() => {
    visible && initImage(currentIndex)
  }, [visible])

  const onOpen = () => {
    visibleChanged(true)
  }

  let absX = 0
  let absY = 0
  let isMouseDown = false

  const handleMouseDown = (e: { pageX: number; pageY: number }) => {
    const oImage = document.getElementById('imageContent')
    if (oImage) {
      absX = e.pageX - window.parseInt(oImage.style.left)
      absY = e.pageY - window.parseInt(oImage.style.top)
    }
    isMouseDown = true
  }

  const handleMouseUp = () => {
    isMouseDown = false
  }

  const handleMouseMove = (e: { preventDefault: () => void; pageX: number; pageY: number }) => {
    e.preventDefault()
    if (isMouseDown && scaleX > 1) {
      const oImage = document.getElementById('imageContent')
      if (oImage) {
        oImage.style.left = `${e.pageX - absX}px`
        oImage.style.top = `${e.pageY - absY}px`
      }
    }
    return false
  }

  const onClose = () => {
    visibleChanged(false)
    initState()
    currentIndexChanged(activeKey)
  }

  const gotoNext = () => {
    initState()
    currentIndexChanged(currentIndex + 1)
  }

  const gotoPrev = () => {
    initState()
    currentIndexChanged(currentIndex - 1)
  }

  const clockwiseRotate = () => {
    angleChanged(angle + 90)
  }

  const anticlockwiseRotate = () => {
    angleChanged(angle - 90)
  }

  const scalePlus = () => {
    scaleXChanged(scaleX * 1.5)
    scaleYChanged(scaleY * 1.5)
  }

  const scaleMinus = () => {
    scaleXChanged(scaleX * 0.5)
    scaleYChanged(scaleY * 0.5)
  }

  return (
    <div className="">
      <a onClick={onOpen}>
        <img
          className="image-view-face"
          src={list[activeKey] && list[activeKey].src}
          alt=""
        />
      </a>
      {visible
        ? (
          <div className="image-view">
            <div className="image-modal">
              <div className="image-container">
                <a
                  onMouseDown={handleMouseDown}
                  onMouseUp={handleMouseUp}
                  onMouseMove={handleMouseMove}
                >
                  <img
                    className="image-content"
                    id="imageContent"
                    style={{ transform: `rotate(${angle}deg) scale(${scaleX}, ${scaleY})` }}
                    src={list[currentIndex] && list[currentIndex].src}
                    alt=""
                  />
                </a>
              </div>
            </div>
            <div className="image-view-btn close-btn" onClick={onClose}>
              <Icon type="close" />
            </div>
            {
              currentIndex === 0 ? null : (
                <div className="image-view-btn prev-btn" onClick={gotoPrev}>
                  <Icon type="left" />
                </div>
              )
            }
            {currentIndex === list.length - 1 ? null : (
              <div className="image-view-btn next-btn" onClick={gotoNext}>
                <Icon type="right" />
              </div>
            )}
            <div className="image-view-toolbar">
              <div className="image-view-btn pull-left" onClick={clockwiseRotate}>
                <Icon type="reload" />
              </div>
              <div className="image-view-btn anticlockwise-btn pull-left" onClick={anticlockwiseRotate}>
                <Icon type="reload" />
              </div>
              <div className="image-view-btn pull-left" onClick={scalePlus}>
                <Icon type="plus" />
              </div>
              <div className="image-view-btn pull-left" onClick={scaleMinus}>
                <Icon type="minus" />
              </div>
            </div>
          </div>
        ) : null}
    </div>
  )
}

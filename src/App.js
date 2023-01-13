import React, { useRef, useEffect, useState, useCallback } from 'react'
import Phaser from 'phaser'

import * as tf from '@tensorflow/tfjs'
import Webcam from 'react-webcam'

import bigNose from './image/nose.png'

const Face = () => {
  const webcamRef = useRef(null)
  const returnTensors = false
  const blazeface = require('@tensorflow-models/blazeface')

  const [deviceId, setDeviceId] = useState({})
  const [devices, setDevices] = useState([])
  const [position, setPosition] = useState([])
  //  Load present
  const runFacedetection = async () => {
    const model = await blazeface.load()
    setInterval(() => {
      detect(model)
    }, 100)
  }

  const detect = async model => {
    if (
      typeof webcamRef.current !== 'undefined' &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get video properties
      const video = webcamRef.current.video
      const videoWidth = webcamRef.current.video.videoWidth
      const videoHeight = webcamRef.current.video.videoHeight

      //Set video height and width
      webcamRef.current.video.width = videoWidth
      webcamRef.current.video.height = videoHeight

      const prediction = await model.estimateFaces(video, returnTensors)
      setPosition(Object.assign(position, prediction))
    }
  }
  runFacedetection()
  const handleDevices = useCallback(
    mediaDevices =>
      setDevices(mediaDevices.filter(({ kind }) => kind === 'videoinput')),
    [setDevices]
  )

  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then(handleDevices)
  }, [])

  new Phaser.Game({
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: '#fff',
    transparent: false,
    physics: {
      default: 'arcade',
      arcade: {
        debug: true
      }
    },
    scene: {
      preload: preload,
      create: create,
      update: update
    },
    parent: 'container'
  })
  let a
  let b
  let c
  let d
  function preload () {
    this.load.image('nose', bigNose)
  }
  function create () {
    const nose = this.add
      .image(0, 0, 'nose')
      .setScale(0.05, 0.05)
      .setVisible(false)

    nose.setPosition(600, 600).setVisible(true)

    // if (position.length > 0) {
    //   for (let i = 0; i < position.length; i++) {
    //     a = Math.round(position[i].topLeft[0])
    //     b = Math.round(position[i].bottomRight[0])
    //     c = Math.round(position[i].topLeft[1])
    //     d = Math.round(position[i].bottomRight[1])
    //   }
    //   nose.setPosition(200, 600)
    // }
  }

  function update () {}

  return (
    <div>
      {devices.map((device, key) => (
        <Webcam
          ref={webcamRef}
          videoConstraints={{ deviceId: devices[0].deviceId }}
          style={{
            position: 'absolute',
            marginLeft: 'auto',
            marginRight: 'auto',
            left: 0,
            right: 0,
            textAlign: 'center',
            zIndex: 0,
            width: 640,
            height: 480
          }}
        />
      ))}
      <div id='container'></div>
    </div>
  )
}

export default Face

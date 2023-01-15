import React, { useState,useEffect } from 'react'
import Phaser from 'phaser'
import bigNose from '../image/nose.png'

const DrawFace = () => {
  //Player One
  const [P1Mx, setP1Mx] = useState(0);
  const [P1My, setP1My] = useState(0);
  const [Detect,setDetect]=useState(false)
  //Player Two
  const [P2Mx, setP2Mx] = useState(0);
  const [P2My, setP2My] = useState(0);

  useEffect(() => {
    UsingWebSocket()
    new Phaser.Game({
      type: Phaser.AUTO,
      width: 640,
      height: 480,
      backgroundColor: '#fff',
      transparent: true,
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
  }, [])

//   let prediction
//   let a
//   let b
//   let c
//   let d
//   let e
//   let f
    let nose

  function preload () {
    this.load.image('nose', bigNose)
  }
  function create () {
    nose = this.add
      .image(0, 0, 'nose')
      .setPosition(0, 0)
      .setScale(0.02, 0.02)
      .setVisible(false)
  }

  function update () {
    console.log(Detect)
    //   a = Math.round(prediction[0].topLeft[0])
    //   b = Math.round(prediction[0].bottomRight[0])
    //   c = Math.round(prediction[0].topLeft[1])
    //   d = Math.round(prediction[0].bottomRight[1])
    //   e = Math.round(prediction[0].landmarks[2][0])
    //   f = Math.round(prediction[0].landmarks[2][1])
    //   nose.setPosition(e, f - 10).setVisible(true)
  }

  function UsingWebSocket () {
   let socket = new WebSocket("ws://localhost:3000");
    socket.onmessage = (event) => {
      event.data.text().then(async(txt) => {
        let information = txt.split(",");
        if (information[0] === "one") {
            setDetect(true)
            setP1Mx(information[1]);
            setP1My(information[2]);
        } else {
            setP2Mx(information[1]);
            setP2My(information[2]);
        }
      });
    };
    return () => {
      socket.disconnect();
    };
  }

  return (
    <div>
      <div
        id='container'
        style={{
          position: 'absolute',
          marginLeft: 'auto',
          marginRight: 'auto',
          top: 100,
          left: 0,
          right: 0,
          zIndex: 1,
          width: 640,
          height: 480
        }}
      ></div>
    </div>
  )
}

export default DrawFace

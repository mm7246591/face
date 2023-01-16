import React, { useEffect } from 'react'
import Phaser from 'phaser'
import bigNose from '../image/nose.png'

const DrawPlayerTwo = () => {
  useEffect(() => {
    UsingWebSocket();

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
  //Player
  const PlayerInformation = {
    PlayerTwo: {
      X: 800,
      Y: 400,
      isDetct:false,
    },
    PlayerMouseEasing: 0.1
  }
  let nose
  function preload () {
    this.load.image('nose', bigNose)
  }
  function create () {
    nose = this.add
      .image(0, 0, 'nose')
      .setPosition(0, 0)
      .setScale(0.03, 0.03)
      .setVisible(false)
  }

  function update () {
    if(PlayerInformation.PlayerTwo.isDetct){
      nose.setPosition(PlayerInformation.PlayerTwo.X-30, PlayerInformation.PlayerTwo.Y).setVisible(true)
    }
  }
  function UsingWebSocket () {
    let socket = new WebSocket("ws://localhost:3000");
     socket.onmessage = (event) => {
       event.data.text().then(async(txt) => {
         let information = txt.split(",");
         if (information[0] === "two") {
            PlayerInformation.PlayerTwo.isDetct=true;
            PlayerInformation.PlayerTwo.X=parseInt(information[1]);
            PlayerInformation.PlayerTwo.Y=parseInt(information[2]);
         } 
       });
     };
     return () => {
       socket.disconnect();
     };
   }

  return (
    <div
        id='container'
        style={{
          position: 'absolute',
          marginLeft: 'auto',
          marginRight: 'auto',
          top: 100,
          left: 0,
          right:0,
          zIndex: 1,
          width: 640,
          height: 480
        }}
      >
    </div>
  )
}

export default DrawPlayerTwo

import React, { useEffect } from 'react'
import Phaser from 'phaser'
import BigNose from '../image/nose.png'
import Vest from '../image/vest.png'

const DrawPlayerOne = () => {
  useEffect(() => {
    UsingWebSocket();

    new Phaser.Game({
      type: Phaser.AUTO,
      width: 640,
      height: 480,
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
    PlayerOne: {
      NoseX: 0,
      NoseY: 0,
      VestX:0,
      VestY:0,
      isDetct:false,
    },
    PlayerMouseEasing: 0.1
  }
  let nose;
  let vest;

  function preload () {
    this.load.image('nose', BigNose)
    this.load.image('vest', Vest)
  }
  function create () {
    nose = this.add
      .image(0, 0, 'nose')
      .setPosition(0, 0)
      .setScale(0.03, 0.03)
      .setVisible(false);
    vest = this.add
      .image(0, 0, 'vest')
      .setPosition(0, 0)
      .setScale(0.3, 0.3)
      .setVisible(false);
  }

  function update () {
    if(PlayerInformation.PlayerOne.isDetct){
      nose.setPosition(PlayerInformation.PlayerOne.NoseX-30, PlayerInformation.PlayerOne.NoseY).setVisible(true)
      vest.setPosition(PlayerInformation.PlayerOne.VestX-30, PlayerInformation.PlayerOne.VestY).setVisible(true)
    }
  }

  function UsingWebSocket () {
    let socket = new WebSocket("ws://localhost:3000");
     socket.onmessage = (event) => {
       event.data.text().then(async(txt) => {
         let information = txt.split(",");
         if (information[0] === "one") {
            PlayerInformation.PlayerOne.isDetct=true;
            PlayerInformation.PlayerOne.NoseX=parseInt(information[1]);
            PlayerInformation.PlayerOne.NoseY=parseInt(information[2]);
            PlayerInformation.PlayerOne.VestX=parseInt(information[3]);
            PlayerInformation.PlayerOne.VestY=parseInt(information[4]);
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

export default DrawPlayerOne

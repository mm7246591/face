// import React from 'react'
// import Phaser from 'phaser'
// import bigNose from './image/nose.png'

// const Draw = ({ predictions }) => {
//   new Phaser.Game({
//     type: Phaser.AUTO,
//     width: window.innerWidth,
//     height: window.innerHeight,
//     backgroundColor: '#fff',
//     transparent: false,
//     physics: {
//       default: 'arcade',
//       arcade: {
//         debug: true
//       }
//     },
//     scene: {
//       preload: preload,
//       create: create,
//       update: update
//     },
//     parent: 'container'
//   })

//   function preload () {
//     this.load.image('nose', bigNose)
//   }

//   function create () {
//     const nose = this.add.image(0, 0, 'nose')
//     nose.setScale(30, 30)
//     if (predictions.length > 0) {
//       for (let i = 0; i < predictions.length; i++) {
//         const start = Math.round(predictions[i].topLeft[0])
//         const end = Math.round(predictions[i].bottomRight[0])
//         const a = Math.round(predictions[i].topLeft[1])
//         const b = Math.round(predictions[i].bottomRight[1])
//         nose.setPosition(200, 600)
//       }
//     }
//   }

//   function update () {}

//   function draw (prediction) {
//     //     topLeft: [232.28, 145.26],
//     //     bottomRight: [449.75, 308.36],
//     //     probability: [0.998],
//     //     landmarks: [
//     //       [295.13, 177.64], // right eye
//     //       [382.32, 175.56], // left eye
//     //       [341.18, 205.03], // nose
//     //       [345.12, 250.61], // mouth
//     //       [252.76, 211.37], // right ear
//     //       [431.20, 204.93] // left ear
//     //     ]
//   }
//   return <div id='container'></div>
// }

// export default Draw

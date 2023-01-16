// import React, { useRef, useEffect, useState, useCallback } from 'react'

// import * as tf from '@tensorflow/tfjs'
// import Webcam from 'react-webcam'
// import * as blazeface from '@tensorflow-models/blazeface'
// import DrawPlayerOne from './PlayerOne'
// import DrawPlayerTwo from './PlayerTwo'

// const Face = ({ player }) => {
//   // const socket = new WebSocket("ws://localhost:3000");
//   const webcamRef = useRef(null)
//   const returnTensors = false
//   const [devices, setDevices] = useState([])
//   const [position,setPosition]=useState([])

//   const runFacedetection = async () => {
//     const model = await blazeface.load()
//     setInterval(() => {
//       detect(model)
//     }, 100)
//   }

//   const detect = async model => {
//     if (
//       typeof webcamRef.current !== 'undefined' &&
//       webcamRef.current !== null &&
//       webcamRef.current.video.readyState === 4
//     ) {
//       // Get video properties
//       const video = webcamRef.current.video
//       const videoWidth = webcamRef.current.video.videoWidth
//       const videoHeight = webcamRef.current.video.videoHeight

//       //Set video height and width
//       webcamRef.current.video.width = videoWidth
//       webcamRef.current.video.height = videoHeight

//       const prediction = await model.estimateFaces(video, returnTensors)
//       if(prediction.length>0){
//         setPosition(Object.assign(prediction,position))
//         // socket.send([
//         //   player,
//         //   parseInt(prediction[0].landmarks[2][0]),
//         //   parseInt(prediction[0].landmarks[2][1]),
//         //   ]);
//       }
//       // topLeft: [232.28, 145.26],
//       //     bottomRight: [449.75, 308.36],
//       //     probability: [0.998],
//       //     landmarks: [
//       //       [295.13, 177.64], // right eye
//       //       [382.32, 175.56], // left eye
//       //       [341.18, 205.03], // nose
//       //       [345.12, 250.61], // mouth
//       //       [252.76, 211.37], // right ear
//       //       [431.20, 204.93] // left ear
//       //      ]
//     }
//   }

//   runFacedetection()

//   const handleDevices = useCallback(
//     mediaDevices =>
//       setDevices(mediaDevices.filter(({ kind }) => kind === 'videoinput')),
//     [setDevices]
//   )

//     useEffect(() => {
//     navigator.mediaDevices.enumerateDevices().then(handleDevices)

//   }, [])
//   return (
//     <div>
//       {devices.map(() => (
//         <div>
//           <Webcam
//             ref={webcamRef}
//             videoConstraints={{ deviceId: devices[0].deviceId }}
//             mirrored={false}
//             style={{
//               position: 'absolute',
//               marginLeft: 'auto',
//               marginRight: 'auto',
//               bottom: 0,
//               right: 0,
//               zIndex: 0,
//               width: 640,
//               height: 480
//             }}
            
//           />
//           <DrawPlayerOne prediction={{position}}/>
//           <Webcam
//             ref={webcamRef}
//             videoConstraints={{ deviceId: devices[1].deviceId }}
//             mirrored={false}
//             style={{
//               position: 'absolute',
//               marginLeft: 'auto',
//               marginRight: 'auto',
//               bottom: 0,
//               left: 0,
//               zIndex: 0,
//               width: 640,
//               height: 480
//             }}
//           />
//            <DrawPlayerTwo prediction={{position}}/>
//         </div>
//       ))}
//     </div>
//   )
// }

// export default Face

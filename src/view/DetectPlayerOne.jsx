import React, { useRef, useEffect, useState, useCallback } from "react";

import * as tf from "@tensorflow/tfjs";
import Webcam from "react-webcam";
import * as blazeface from "@tensorflow-models/blazeface";
import * as posenet from '@tensorflow-models/posenet'
import DrawPlayerOne from "./DrawPlayerOne";

const DetectPlayerOne = ({ player }) => {
  const socket = new WebSocket("ws://localhost:3000");
  const webcamRef = useRef(null);
  const returnTensors = false;
  const [devices, setDevices] = useState([]);

  const runFacedetection = async () => {
    const faceModel = await blazeface.load();
    const bodyModel= await posenet.load({
      inputResolution:{width:640,height:480},
      scale:0.5
    })
    setInterval(() => {
      detect(faceModel,bodyModel);
    }, 100);

  
  };

  const detect = async (faceModel,bodyModel) => {
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get video properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      //Set video height and width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      const prediction = await faceModel.estimateFaces(video, returnTensors);
      const pose=await bodyModel.estimateSinglePose(video)
      if (prediction.length > 0) {
        socket.send([
            player,
            parseInt(prediction[0].landmarks[2][0]),
            parseInt(prediction[0].landmarks[2][1]),
            parseInt(pose.keypoints[5].position.x),
            parseInt(pose.keypoints[5].position.y),
            ]);
      }
    }
  };

  runFacedetection();

  const handleDevices = useCallback(
    (mediaDevices) =>
      setDevices(mediaDevices.filter(({ kind }) => kind === "videoinput")),
    [setDevices]
  );

  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then(handleDevices);
  }, [])

  return (
    <div>
      <div>
        <DrawPlayerOne/>
      </div>
      {devices.map(() => (
        <div>
          <Webcam
            ref={webcamRef}
            videoConstraints={{ deviceId: devices[0].deviceId }}
            mirrored={false}
            style={{
              position: "absolute",
              marginLeft: "auto",
              marginRight: "auto",
              top: 100,
              left: 0,
              right:0,
              zIndex: 0,
              width: 640,
              height: 480,
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default DetectPlayerOne;

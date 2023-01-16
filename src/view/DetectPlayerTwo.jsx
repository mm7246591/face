import React, { useRef, useEffect, useState, useCallback } from "react";

import * as tf from "@tensorflow/tfjs";
import Webcam from "react-webcam";
import * as blazeface from "@tensorflow-models/blazeface";
import * as posenet from '@tensorflow-models/posenet'
import DrawPlayerTwo from "./DrawPlayerTwo";

const Face = ({ player }) => {
  const socket = new WebSocket("ws://localhost:3000");
  const webcamRef = useRef(null);
  const returnTensors = false;
  const [devices, setDevices] = useState([]);

  const runFacedetection = async () => {
    const model = await blazeface.load();
    setInterval(() => {
      detect(model);
    }, 100);
  };

  const detect = async (model) => {
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

      const prediction = await model.estimateFaces(video, returnTensors);
      if (prediction.length > 0) {
        socket.send([
          player,
          parseInt(prediction[0].landmarks[2][0]),
          parseInt(prediction[0].landmarks[2][1]),
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
  }, []);
  return (
    <div>
      <div>
        <DrawPlayerTwo/>
      </div>
      {devices.map(() => (
        <div>
          <Webcam
            ref={webcamRef}
            videoConstraints={{ deviceId: devices[1].deviceId }}
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

export default Face;

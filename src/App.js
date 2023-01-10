import React, { useRef, useEffect, useState, useCallback } from "react";

import * as tf from "@tensorflow/tfjs";
import Webcam from "react-webcam";
import Draw from "./utilities";
import "./App.css";

const Face = ({}) => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const returnTensors = false;
  const blazeface = require("@tensorflow-models/blazeface");

  const [deviceId, setDeviceId] = useState({});
  const [devices, setDevices] = useState([]);
  const [position, setPosition] = useState([]);
  //  Load posenet
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

      //Set canvas height and width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // Make detections

      const prediction = await model.estimateFaces(video, returnTensors);
      const ctx = canvasRef.current.getContext("2d");
      setPosition(Object.assign(position, prediction));
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
    <div className="App">
      <header className="App-header">
        {devices.map((device, key) => (
          <Webcam
            ref={webcamRef}
            videoConstraints={{ deviceId: devices[0].deviceId }}
            style={{
              position: "absolute",
              marginLeft: "auto",
              marginRight: "auto",
              left: 0,
              textAlign: "center",
              zindex: 0,
              width: 640,
              height: 480,
            }}
          />
        ))}
        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            bottom: 0,
            textAlign: "center",
            zindex: 10,
            width: 640,
            height: 480,
          }}
        />
        <Draw predictions={{ position }} />
      </header>
    </div>
  );
};

export default Face;

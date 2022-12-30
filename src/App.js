import React, { useRef, useEffect, useState, useCallback } from "react";

import * as tf from "@tensorflow/tfjs";
import * as facemesh from "@tensorflow-models/face-landmarks-detection";
import Webcam from "react-webcam";
import { drawMesh } from "./utilities";
import "./App.css";

const Face = ({}) => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const [deviceId, setDeviceId] = useState({});
  const [devices, setDevices] = useState([]);

  //  Load posenet
  const runFacemesh = async () => {
    const net = await facemesh.load(
      facemesh.SupportedPackages.mediapipeFacemesh
    );
    setInterval(() => {
      detect(net);
    }, 1);
  };

  const detect = async (net) => {
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Set canvas width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // Make Detections
      // NEW MODEL
      const face = await net.estimateFaces({ input: video });

      // Get canvas context
      const ctx = canvasRef.current.getContext("2d");

      requestAnimationFrame(() => {
        drawMesh(face, ctx);
      });
    }
  };

  const handleDevices = useCallback(
    (mediaDevices) =>
      setDevices(mediaDevices.filter(({ kind }) => kind === "videoinput")),
    [setDevices]
  );

  useEffect(() => {
    runFacemesh();
    navigator.mediaDevices.enumerateDevices().then(handleDevices);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        {devices.map((device, key) => (
          <Webcam
            ref={webcamRef}
            videoConstraints={{ deviceId: devices[1].deviceId }}
            style={{
              position: "absolute",
              marginLeft: "auto",
              marginRight: "auto",
              left: 0,
              right: 0,
              textAlign: "center",
              zindex: 9,
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
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 640,
            height: 480,
          }}
        />
      </header>
    </div>
  );
};

export default Face;

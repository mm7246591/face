import React, { useRef, useEffect, useState, useCallback } from "react";
import Phaser from "phaser";

import * as tf from "@tensorflow/tfjs";
import Webcam from "react-webcam";
import * as blazeface from "@tensorflow-models/blazeface";

import bigNose from "./image/nose.png";

const Face = () => {
  useEffect(() => {
    UsingWebSocket();

    navigator.mediaDevices.enumerateDevices().then(handleDevices);

    new Phaser.Game({
      type: Phaser.AUTO,
      width: 640,
      height: 480,
      backgroundColor: "#fff",
      transparent: true,
      physics: {
        default: "arcade",
        arcade: {
          debug: true,
        },
      },
      scene: {
        preload: preload,
        create: create,
        update: update,
      },
      parent: "container",
    });
  }, []);

  let prediction;
  let a;
  let b;
  let c;
  let d;
  let e;
  let f;
  let nose;

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

      prediction = await model.estimateFaces(video, returnTensors);
      // topLeft: [232.28, 145.26],
      //     bottomRight: [449.75, 308.36],
      //     probability: [0.998],
      //     landmarks: [
      //       [295.13, 177.64], // right eye
      //       [382.32, 175.56], // left eye
      //       [341.18, 205.03], // nose
      //       [345.12, 250.61], // mouth
      //       [252.76, 211.37], // right ear
      //       [431.20, 204.93] // left ear
      //      ]
    }
  };

  runFacedetection();

  const handleDevices = useCallback(
    (mediaDevices) =>
      setDevices(mediaDevices.filter(({ kind }) => kind === "videoinput")),
    [setDevices]
  );

  function preload() {
    this.load.image("nose", bigNose);
  }
  function create() {
    nose = this.add
      .image(0, 0, "nose")
      .setPosition(0, 0)
      .setScale(0.03, 0.03)
      .setVisible(false);
  }

  function update() {
    if (prediction && prediction[0]) {
      a = Math.round(prediction[0].topLeft[0]);
      b = Math.round(prediction[0].bottomRight[0]);
      c = Math.round(prediction[0].topLeft[1]);
      d = Math.round(prediction[0].bottomRight[1]);
      e = Math.round(prediction[0].landmarks[2][0]);
      f = Math.round(prediction[0].landmarks[2][1]);
      // console.log(a, b, c, d, e, f);
      nose.setPosition(e, f).setVisible(true);
    }
  }

  function UsingWebSocket() {
    let socket = new WebSocket("ws://localhost:3000");
    console.log(socket.onmessage);
    socket.onmessage = (event) => {
      event.data.text().then((txt) => {
        let information = txt.split(",");
        if (information[0] === "one") {
          console.log(information[0]);
        } else {
          console.log(information[1]);
        }
      });

      return () => {
        socket.disconnect();
      };
    };
  }

  return (
    <div>
      <div
        id="container"
        style={{
          position: "absolute",
          marginLeft: "auto",
          marginRight: "auto",
          top: 100,
          left: 0,
          right: 0,
          zIndex: 1,
          width: 640,
          height: 480,
        }}
      ></div>
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
              right: 0,
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

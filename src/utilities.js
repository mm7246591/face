import React from "react";
import Sketch from "react-p5";
import bigNose from "./image/nose.png";

const Draw = ({ predictions }) => {
  let nose;

  const setup = async (p5) => {
    await p5.createCanvas(640, 480);
    nose = await p5.loadImage(bigNose);
  };

  const draw = (p5) => {
    if (predictions.position.length > 0) {
      for (let i = 0; i < predictions.position.length; i++) {
        const start = Math.round(predictions.position[i].topLeft[0]);
        const end = Math.round(predictions.position[i].bottomRight[0]);
        const a = Math.round(predictions.position[i].topLeft[1]);
        const b = Math.round(predictions.position[i].bottomRight[1]);
        p5.image(nose, (start + end) / 2 - 20, (a + b) / 2 - 30, 50, 50);
      }
    }

    //     topLeft: [232.28, 145.26],
    //     bottomRight: [449.75, 308.36],
    //     probability: [0.998],
    //     landmarks: [
    //       [295.13, 177.64], // right eye
    //       [382.32, 175.56], // left eye
    //       [341.18, 205.03], // nose
    //       [345.12, 250.61], // mouth
    //       [252.76, 211.37], // right ear
    //       [431.20, 204.93] // left ear
    //     ]
  };
  return (
    <div>
      <Sketch setup={setup} draw={draw} />
    </div>
  );
};

export default Draw;

// Drawing function
const draw = (predictions, ctx) => {
    if (predictions.length > 0) {
        for (let i = 0; i < predictions.length; i++) {
          const start = Math.round(predictions[i].topLeft[0]);
          const end = Math.round(predictions[i].bottomRight[0]);
          const a = Math.round(predictions[i].topLeft[1]);
          const b = Math.round(predictions[i].bottomRight[1]);

          // ctx.beginPath();
          // ctx.arc(a,b,5,0,2*Math.PI);
          // ctx.stroke();

          const image = new Image();
          image.src = require("../src/image/nose.png");
          image.onload = () => {
            ctx.drawImage(image, (start+end)/2-20, (a+b)/2-30,50,50);
          };
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

export default draw
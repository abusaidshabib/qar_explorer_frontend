import { useEffect, useRef, useState } from "react";

const DrawRectangle = () => {
    const canvasRef = useRef(null);
    const contextRef = useRef(null);

    const [isDrawing, setIsDrawing] = useState(false);

    const canvasOffSetX = useRef(null);
    const canvasOffSetY = useRef(null);
    const startX = useRef(null);
    const startY = useRef(null);

    useEffect(() => {
      const canvas = canvasRef.current;
      canvas.width = 500;
      canvas.height = 500;

      const context = canvas.getContext("2d");
      context.lineCap = "round";
      context.strokeStyle = "red";
      context.lineWidth = 5;
      contextRef.current = context;

      const canvasOffSet = canvas.getBoundingClientRect();
      canvasOffSetX.current = canvasOffSet.top;
      canvasOffSetY.current = canvasOffSet.left;
    }, []);

    const startDrawingRectangle = ({ nativeEvent }) => {
      nativeEvent.preventDefault();
      nativeEvent.stopPropagation();

      startX.current = nativeEvent.clientX - canvasOffSetX.current;
      startY.current = nativeEvent.clientY - canvasOffSetY.current;

      setIsDrawing(true);
    };

    const drawRectangle = ({ nativeEvent }) => {
      if (!isDrawing) {
        return;
      }

      nativeEvent.preventDefault();
      nativeEvent.stopPropagation();

      const newMouseX = nativeEvent.clientX - canvasOffSetX.current;
      const newMouseY = nativeEvent.clientY - canvasOffSetY.current;

      const rectWidht = newMouseX - startX.current;
      const rectHeight = newMouseY - startY.current;

      contextRef.current.clearRect(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );

      contextRef.current.strokeRect(
        startX.current,
        startY.current,
        rectWidht,
        rectHeight
      );
    };

    const stopDrawingRectangle = () => {
      setIsDrawing(false);
    };

  // var x, y, oldx, oldy;
  // var showDrag = false;

  // const startDrawingRectangle = (e) => {
  //   oldx = e.clientX; //mousedown x coord
  //   oldy = e.clientY; //mouedown y coord
  //   showDrag = true;
  //   e.preventDefault();
  // };

  // const drawRectangle = (e) => {
  //   if (showDrag == true) {
  //     x = e.clientX; //mouseup x coord
  //     y = e.clientY; //mouseup y coord
  //     var bbox = document.getElementById("bbox");
  //     var contbox = document.getElementById("cont");
  //     //get the width and height of the dragged area
  //     var w = x > oldx ? x - oldx : oldx - x;
  //     var h = y > oldy ? y - oldy : oldy - y;
  //     var addx = 0,
  //       addy = 0;
  //     //these next two lines judge if the box was dragged backward
  //     //and adds the box's width to the bbox positioning offset
  //     if (x < oldx) {
  //       addx = w;
  //     }
  //     if (y < oldy) {
  //       addy = h;
  //     }
  //     bbox.style.left = oldx - parseInt(contbox.offsetLeft + addx) + "px";
  //     bbox.style.top = oldy - parseInt(contbox.offsetTop + addy) + "px";
  //     bbox.style.width = w + "px";
  //     bbox.style.height = h + "px";
  //     bbox.style.display = "block";
  //     bbox.style.border = "2px solid red";
  //   }
  //   e.preventDefault();
  // };

  // const stopDrawingRectangle = (e) => {
  //   showDrag = false;
  //   e.preventDefault();
  // };

  return (
    <div>
      <canvas
        className="bg-background"
        ref={canvasRef}
        onMouseDown={startDrawingRectangle}
        onMouseMove={drawRectangle}
        onMouseUp={stopDrawingRectangle}
        onMouseLeave={stopDrawingRectangle}
      ></canvas>
      {/* <div
        onMouseDown={startDrawingRectangle}
        onMouseMove={drawRectangle}
        onMouseUp={stopDrawingRectangle}
        id="cont"
        className="focus-image"
      >
        <img src="http://cdn.sstatic.net/Sites/stackoverflow/img/apple-touch-icon@2.png?v=73d79a89bded&a" />
        <div id="bbox"></div>
      </div> */}
    </div>
  );
};

export default DrawRectangle;

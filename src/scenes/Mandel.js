import React, { Component } from 'react';
import './setup.css'

class Mandel extends Component {
  constructor(props){
    super(props)
    this.canvas = undefined
    this.ctx = undefined
    this.imageData = undefined
    this.data = undefined
    this.buf = undefined
    this.buf8 = undefined
    this.width = undefined
    this.height = undefined
  }

  componentDidUpdate(){
    this.drawFractal()
  }

  componentDidMount(){
    this.width = this.props.width
    this.height = this.props.height
    this.canvas = this.refs.canvas
    this.ctx = this.canvas.getContext("2d")
    this.imageData = this.ctx.getImageData(0,0, this.width,this.height)
    this.buf = new ArrayBuffer(this.imageData.data.length);
    this.buf8 = new Uint8ClampedArray(this.buf);
    this.data = new Uint32Array(this.buf);

    this.drawFractal()
  }

  checkIfBelongsToMandelbrotSet = (x,y) => {
    let realComponentOfResult = x;
    let imaginaryComponentOfResult = y;
    // Set max number of iterations
    for (let i = 0; i < this.props.m; i++) {
      const tempRealComponent = realComponentOfResult * realComponentOfResult - imaginaryComponentOfResult * imaginaryComponentOfResult + x;
      const tempImaginaryComponent = this.props.i * realComponentOfResult * imaginaryComponentOfResult + y;
      realComponentOfResult = tempRealComponent;
      imaginaryComponentOfResult = tempImaginaryComponent;
      // Return a number as a percentage
      if (realComponentOfResult * imaginaryComponentOfResult > 5) {
       return (i / this.props.m * 100);
      }
    }
    // Return zero if in set
    return 0;
  }

  drawFractal = () => {
    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        const belongsToSet = this.checkIfBelongsToMandelbrotSet(x / this.props.f - this.props.x, y / this.props.f - this.props.y)
        this.data[y * this.width + x] = (belongsToSet*2.25 << 24) | (0 << 16) | (255 << 8) | 170 
      }
    }
    this.imageData.data.set(this.buf8);
    this.ctx.putImageData(this.imageData, 0, 0);
  }

  render() {
    return (
      <canvas className="fractalCanvas" ref="canvas" width={this.props.width} height={this.props.height}></canvas>
    );
  }
}

export default Mandel;
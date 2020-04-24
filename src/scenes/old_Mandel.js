import React, { Component } from 'react';
import './setup.css'

class Mandel extends Component {
  constructor(props){
    super(props)
    this.canvas = undefined;
    this.ctx = undefined;

    this.onMouseMove = this.onMouseMove.bind(this)
    this.mouseclickX = 0
    this.mouseclickY = 0
    
  }

  onMouseMove(e){
    if(e.nativeEvent.buttons === 1 && this.mouseclickX === 0){
      this.mouseclickX = e.nativeEvent.offsetX
      this.mouseclickY = e.nativeEvent.offsetY
    } else if(e.nativeEvent.buttons === 1){
      let x = this.state.panX + ((e.nativeEvent.offsetX - this.mouseclickX)/450)
      let y = this.state.panY + ((e.nativeEvent.offsetY - this.mouseclickY)/200)
      this.setState({ 
        panX: x,
        panY: y
      })
    }else{
      this.mouseclickX = 0
      this.mouseclickY = 0
    }
  }

  state = {imaginaryConstant : 2.0, maxIterations : 150.0, magnificationFactor : 100, panX : 3, panY : 1}

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  componentDidUpdate(){
    this.drawFractal()
  }

  componentDidMount(){
    this.canvas = this.refs.canvas
    this.ctx = this.canvas.getContext("2d", { alpha: false})
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
    let previous;
    for (let x = 0; x < this.canvas.width; x++) {
      for (let y = 0; y < this.canvas.height; y++) {
        const belongsToSet = this.checkIfBelongsToMandelbrotSet(x / this.props.f - this.props.x, y / this.props.f - this.props.y)
        
        if(previous === belongsToSet) {
          this.ctx.fillRect(x,y, 1,1);
        }else{
          if (belongsToSet === 0) {
            this.ctx.clearRect(x,y, 1,1);
          } else{
            this.ctx.fillStyle = `hsl(80, 100%, ${belongsToSet}%)`;
            // Draw a colorful pixel
            this.ctx.fillRect(x,y, 1,1);
            previous = belongsToSet
          }
        }
      }
    }
  }

  render() {
    const {imaginaryConstant,maxIterations,magnificationFactor,panX,panY} = this.state
    return (
      <div>
        <canvas className="fractalCanvas" ref="canvas" onMouseMove={this.onMouseMove} width={1000} height={550}></canvas>
      </div>
    );
  }
}

export default Mandel;
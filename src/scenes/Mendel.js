import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';
import './setup.css'

class Mendel extends Component {
  constructor(){
    super()
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
    for (let i = 0; i < this.state.maxIterations; i++) {
      const tempRealComponent = realComponentOfResult * realComponentOfResult - imaginaryComponentOfResult * imaginaryComponentOfResult + x;
      const tempImaginaryComponent = this.state.imaginaryConstant * realComponentOfResult * imaginaryComponentOfResult + y;
      realComponentOfResult = tempRealComponent;
      imaginaryComponentOfResult = tempImaginaryComponent;
      // Return a number as a percentage
      if (realComponentOfResult * imaginaryComponentOfResult > 5) {
       return (i / this.state.maxIterations * 100);
      }
    }
    // Return zero if in set
    return 0;
  }

  drawFractal = () => {
    let previous
    for (let x = 0; x < this.canvas.width; x++) {
      for (let y = 0; y < this.canvas.height; y++) {
        const belongsToSet = this.checkIfBelongsToMandelbrotSet(x / this.state.magnificationFactor - this.state.panX, y / this.state.magnificationFactor - this.state.panY)
        
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
        <canvas className="fractalCanvas" ref="canvas" onMouseMove={this.onMouseMove} width={2000} height={1000}></canvas>
        <Form className="formValues">
          <Form.Input
          label={`Imaginary Constant: ${imaginaryConstant}`}
          min={-2}
          max={4}
          name='imaginaryConstant'
          onChange={this.handleChange}
          step={0.1}
          type='range'
          value={imaginaryConstant}
          />
           <Form.Input
          label={`Max Iterations: ${maxIterations}`}
          min={2}
          max={300}
          name='maxIterations'
          onChange={this.handleChange}
          step={1}
          type='range'
          value={maxIterations}
          />
          <Form.Input
          label={`Magnification Factor: ${magnificationFactor}`}
          min={100}
          max={10000}
          name='magnificationFactor'
          onChange={this.handleChange}
          step={100}
          type='range'
          value={magnificationFactor}
          />
          <Form.Input
          label={`panX: ${panX}`}
          min={0}
          max={5}
          name='panX'
          onChange={this.handleChange}
          step={0.01}
          type='range'
          value={panX}
          />
          <Form.Input
          label={`panY: ${panY}`}
          min={0}
          max={5}
          name='panY'
          onChange={this.handleChange}
          step={0.01}
          type='range'
          value={panY}
          />
        </Form>
      </div>
    );
  }
}

export default Mendel;
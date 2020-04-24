import React, { Component } from 'react';
import {Form} from 'semantic-ui-react';
import './setup.css'

class Julia extends Component {
    constructor(){
        super()
        this.canvas = undefined;
        this.ctx = undefined;

        this.onMouseMove = this.onMouseMove.bind(this)
        this.mouseclickX = 0
        this.mouseclickY = 0
    }

    state = {maxIterations: 100, magnificationFactor: 200, panX: 1.3, panY: 0.5}
    
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
    
    componentDidMount(){
        this.canvas = this.refs.canvas
        this.ctx = this.canvas.getContext("2d", { alpha: false})
        this.drawFractal()
    }

    componentDidUpdate(){
        this.drawFractal()
    }

    checkIfBelongsToJuliaSet = (x,y) => {
        let r = 100
        let zx = x; //realComponentOfResult
        let zy = y; //imaginaryComponentOfResult
        // Set max number of iterations
        var iteration = 0
        const maxIterations = 100;
        while (zx*zx + zy*zy < (r**2) && iteration < maxIterations) {
            const xtmp = zx*zx - zy*zy - 0.9;
            zy = 2*zx*zy + 0.3;
            zx = xtmp;
            // const xtmp = (zx * zx + zy + zy) ** ((iteration/2) * Math.cos(iteration * Math.atan2(zy, zx)) + x);
            // zy = (zx * zx + zy + zy) ** ((iteration/2) * Math.sin(iteration * Math.atan2(zy, zx)) + y);
            
            iteration = iteration + 1;
        }

        if (iteration === maxIterations) {
        return 0;
        } else {
        return (iteration / maxIterations * 100);
        }
    }

    drawFractal = () => {
        for (let x = 0; x < this.canvas.width; x++) {
            for (let y = 0; y < this.canvas.height; y++) {
              const belongsToSet = this.checkIfBelongsToJuliaSet(x / this.state.magnificationFactor - this.state.panX, y / this.state.magnificationFactor - this.state.panY);
              if (belongsToSet === 0) {
                this.ctx.fillStyle = '#000';
                // Draw a black pixel
                this.ctx.fillRect(x,y, 1,1);
              } else {
                this.ctx.fillStyle = `hsl(20, 200%, ${belongsToSet}%)`;
                // Draw a colorful pixel
                this.ctx.fillRect(x, y, 1, 1);
              }
            }
          }
    }

    render() {
        const {imaginaryConstant,maxIterations,magnificationFactor,panX,panY} = this.state
        return (
            <div>
                <canvas className="fractalCanvas" ref="canvas" onMouseMove={this.onMouseMove} width={500} height={250}></canvas>
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

export default Julia;
import React, { Component } from 'react';
import './setup.css'

class MultiJulia extends Component {
    constructor(props){
        super(props)
        this.canvas = undefined;
        this.ctx = undefined;

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
        while (zx*zx + zy*zy < (r**2) && iteration < this.props.m) {
          const xtmp = (zx*zx + zy*zy) ** ((iteration/2) * Math.cos(iteration * Math.atan2(zy, zx)) + 0.2);
          zy = (zx*zx + zy*zy) ** ((iteration/2) * Math.sin(iteration * Math.atan2(zy, zx)) + 0.5);
  
          zx = xtmp - 0.9999;
          
          iteration = iteration + 1;
        }

          if (iteration === this.props.m) {
            return 0;
          } else {
            return (iteration / this.props.m * 100);
          }
      }

    drawFractal = () => {
        for (let x = 0; x < this.canvas.width; x++) {
            for (let y = 0; y < this.canvas.height; y++) {
              const belongsToSet = this.checkIfBelongsToJuliaSet(x / this.props.f - this.props.x, y / this.props.f - this.props.y);
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
        return (
            <div>
                <canvas className="fractalCanvas" ref="canvas" onMouseMove={this.onMouseMove} width={1000} height={550}></canvas>
            </div>
        );
    }
}

export default MultiJulia;
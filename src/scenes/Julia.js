import React, { Component } from 'react';
import './setup.css'

class Julia extends Component {
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
            const xtmp = zx*zx - zy*zy - 0.9;
            zy = 2*zx*zy + 0.3;
            zx = xtmp;
            // const xtmp = (zx * zx + zy + zy) ** ((iteration/2) * Math.cos(iteration * Math.atan2(zy, zx)) + x);
            // zy = (zx * zx + zy + zy) ** ((iteration/2) * Math.sin(iteration * Math.atan2(zy, zx)) + y);
            
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
              this.data[y * this.width + x] = (belongsToSet*2.25 << 24) | (0 << 16) | (85 << 8) | 255 
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

export default Julia;
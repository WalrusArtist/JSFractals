import React, { Component } from 'react';
import {Form} from 'semantic-ui-react';
import './setup.css'

class Newton extends Component {
    constructor(){
        super()
        this.canvas = undefined;
        this.ctx = undefined;

        this.top = 0;
        this.right = 0;
        this.bottom = 0;
        this.left = 0;

        this.onMouseMove = this.onMouseMove.bind(this)
        this.mouseclickX = 0
        this.mouseclickY = 0
    }
    
    state = {maxIterations: 100, magnificationFactor: 0.3, panX: 4, panY: 2}
    
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

    Complex = (r, i) => {

    }

    ifBelongsToNewtonSet = (x, y) => {
        var yo = new Complex(x/500, y/500);
        var ayy = N(yo);
        var ayy2 = N(ayy);
        var n = 0;
        while (Math.abs(ayy2.r - ayy.r) > 0.000001) {
                ayy = ayy2;
                ayy2 = N(ayy2);
                n++;
        }
        return [ayy, n];
    }

    drawFractal = () => {
        for (var x = left - 10; x < right + 10; x++) {
            for (var y = top - 10; y < bottom + 10; y++) {
                const arr = this.ifBelongsToNewtonSet(x / magnificationFactor - panX, y / magnificationFactor - panY)
                const belongs = arr[0];
                const n = arr[1]
               // console.log(belongs)
                if (Math.abs(belongs.r - 1) < 0.001) {
                    setFillStyle(ctx, 0, 198, 255, n/20);
                } else if (Math.abs(belongs.r + 0.5) < 0.001) {
                    setFillStyle(ctx, 0, 0, 0, n/20);
                } else {
                    setFillStyle(ctx, 255, 255, 255, 1);
                }
                ctx.fillRect(x - left, y - top, 1, 1);
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

export default Newton;
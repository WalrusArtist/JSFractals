import React, { Component } from 'react';
import Mandel from './scenes/Mandel';
import './App.css';
import Julia from './scenes/Julia';
import MultiJulia from './scenes/MultiJulia';

import {Form} from 'semantic-ui-react';

class App extends Component {
    constructor(){
        super()
        this.onMouseMove = this.onMouseMove.bind(this)
        this.mouseclickX = 0
        this.mouseclickY = 0
    }

    onMouseMove(e){
        if(e.nativeEvent.buttons === 1 && this.mouseclickX === 0){
        this.mouseclickX = e.nativeEvent.offsetX
        this.mouseclickY = e.nativeEvent.offsetY
        } else if(e.nativeEvent.buttons === 1){
            let x = this.state.panX + ((e.nativeEvent.offsetX - this.mouseclickX)/(this.state.magnificationFactor * 10))
            let y = this.state.panY + ((e.nativeEvent.offsetY - this.mouseclickY)/(this.state.magnificationFactor * 10))
            this.setState({ 
                panX: x,
                panY: y
            })
        }else{
            this.mouseclickX = 0
            this.mouseclickY = 0
        }
    }

    state={fractal:0,imaginaryConstant : 2.0, maxIterations : 5.0, magnificationFactor : 100, panX : 3, panY : 1}

    handleChange = (e, { name, value }) => this.setState({ [name]: value })

    setFractal = (num) => {
        this.setState({fractal: num})
    }

    renderFractal = () => {
        const {imaginaryConstant,maxIterations,magnificationFactor,panX,panY} = this.state
        switch(this.state.fractal){
            case 0:
                return(<Mandel i={imaginaryConstant} m={maxIterations} f={magnificationFactor} x={panX} y={panY}/>)
            case 1:
                return(<Julia m={maxIterations} f={magnificationFactor} x={panX} y={panY}/>)
            case 2:
                return(<MultiJulia/>)
            case 3:
                return(<div>NEWTON TO DEVELOP</div>)
            default:
                return(<Mandel i={imaginaryConstant} m={maxIterations} f={magnificationFactor} x={panX} y={panY}/>)
        }
    }

    render() {
        const {imaginaryConstant,maxIterations,magnificationFactor,panX,panY} = this.state
        return (
            <div>
                <div className="buttonGroup">
                    <button onClick={() => this.setFractal(0)}>Mandel</button>
                    <button onClick={() => this.setFractal(1)}>JULIA</button>
                    <button onClick={() => this.setFractal(2)}>MULTI-JULIA</button>
                    <button onClick={() => this.setFractal(3)}>NEWTON</button>
                </div>
                <div onMouseMove={this.onMouseMove}>
                     {this.renderFractal()}
                </div>
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
                    step={5}
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

export default App;
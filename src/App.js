import React, { Component } from 'react';

import Mandel from './scenes/Mandel';
import Julia from './scenes/Julia';
import MultiJulia from './scenes/MultiJulia';

import './App.css';

import {Form, Button, Icon} from 'semantic-ui-react';

class App extends Component {
    constructor(){
        super()
        this.onMouseMove = this.onMouseMove.bind(this)
        this.onMouseClick = this.onMouseMove.bind(this)
        this.mouseclickX = 0
        this.mouseclickY = 0
        this.zoom = 0
        this.buttonColor = ['grey','grey','grey','grey']
    }

    componentDidMount(){
        this.setFractal(0)
    }

    onMouseMove(e){
        if(e.nativeEvent.buttons === 1 && this.mouseclickX === 0){
        this.mouseclickX = e.nativeEvent.offsetX
        this.mouseclickY = e.nativeEvent.offsetY
        } else if(e.nativeEvent.buttons === 1){
            let x = this.state.panX + ((e.nativeEvent.offsetX - this.mouseclickX)/(this.state.magnificationFactor * 10))
            let y = this.state.panY + ((e.nativeEvent.offsetY - this.mouseclickY)/(this.state.magnificationFactor * 10))
            this.setState({ 
                panX: Math.round(x * 10000000) / 10000000,
                panY: Math.round(y * 10000000) / 10000000,
                magnificationFactor: this.state.magnificationFactor + 30
            })
        }else{
            this.mouseclickX = 0
            this.mouseclickY = 0
        }
    }

    // onMouseClick(e){
    //     for (var i=0; i < 10000; i++) {
    //        this.zoom += 1
    //        this.setState({
    //         magnificationFactor: magnificationFactor + this.zoom
    //        })
    //     } 
    // }

    state={
        fractal:null,
        imaginaryConstant:null,
        maxIterations:null,
        magnificationFactor:null,
        panX:null,
        panY:1.5,
        width: 1000,
        height: 550,
        isExpanded: false,
        expandIcon: "angle right",
        settingWidth: "0%",
    }

    handleChange = (e, { name, value }) => this.setState({ [name]: value })

    handleExpand = (isExpanded) => {
        if(isExpanded){
            this.setState({
                isExpanded: !isExpanded,
                expandIcon: "angle right",
                settingWidth: "0%"
            })  
        } else {
            this.setState({
                isExpanded: !isExpanded,
                expandIcon: "angle left",
                settingWidth: "75%"
            })  
        }
    }

    setFractal = (num) => {
        for(let i=0;i<4;i++){
            if(i === num) {this.buttonColor[i] = "red"}
            else {this.buttonColor[i] = "grey"}
        }
        switch(num){
            case 0:
                //Mandel
                this.setState({fractal: num, imaginaryConstant : 2.0, maxIterations : 30, magnificationFactor : 200, panX : 3.25, panY : 1.5})
                break;
            case 1:
                //Julia
                this.setState({fractal: num, imaginaryConstant : 2.0, maxIterations : 60, magnificationFactor : 200, panX : 2.85, panY : 1.3})
                break;
            case 2:
                //Multi-Julia
                this.setState({fractal: num, imaginaryConstant : 2.0, maxIterations : 100, magnificationFactor : 80000, panX : 0.0125, panY : 0.006125})
                break;
            case 3:
                //Newton
                this.setState({fractal: num, imaginaryConstant : 2.0, maxIterations : 5.0, magnificationFactor : 100, panX : 3, panY : 1})
                break;
        }
    }

    renderFractal = () => {
        const {imaginaryConstant,maxIterations,magnificationFactor,panX,panY,width,height} = this.state
        switch(this.state.fractal){
            case 0:
                return(<Mandel i={imaginaryConstant} m={maxIterations} f={magnificationFactor+10} x={panX} y={panY} width={width} height={height}/>)
            case 1:
                return(<Julia m={maxIterations} f={magnificationFactor} x={panX} y={panY} width={width} height={height}/>)
            case 2:
                return(<MultiJulia/>)
            case 3:
                return(<div>NEWTON TO DEVELOP</div>)
            default:
                return(<Mandel i={imaginaryConstant} m={maxIterations} f={magnificationFactor} x={panX} y={panY} width={width} height={height}/>)
        }
    }

    render() {
        const {imaginaryConstant,maxIterations,magnificationFactor,panX,panY,expandIcon,settingWidth,buttonColor} = this.state
        return (
            <div>
                <div onMouseMove={this.onMouseMove}>
                    <div className="blackBackground">
                        {this.renderFractal()}
                    </div>
                </div>
                <div className="buttonGroup">
                    <Button color={this.buttonColor[0]} onClick={() => this.setFractal(0)}>Mandel</Button>
                    <Button color={this.buttonColor[1]} onClick={() => this.setFractal(1)}>Julia</Button>
                    <Button color={this.buttonColor[2]} onClick={() => this.setFractal(2)}>Multi-Julia</Button>
                    <Button color={this.buttonColor[3]} onClick={() => this.setFractal(3)}>Newton</Button>
                </div>
                <div className="formDiv">
                    <div className="formSettingsDiv" style={{width:settingWidth}}>
                        <div className="formSettingWrapper">
                            <Form>
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
                    </div>
                    <div className="formButtonDiv">
                        <Button id="formButton" icon onClick={() => this.handleExpand(this.state.isExpanded)}>
                            <Icon id="formButtonIcon" name={expandIcon} size='big'/>
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
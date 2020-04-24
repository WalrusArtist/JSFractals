import React, { Component } from 'react';
import Mendel from './scenes/Mendel';
import './App.css';
import Julia from './scenes/Julia';
import MultiJulia from './scenes/MultiJulia';

class App extends Component {
    state={fractal : 0}

    setFractal = (num) => {
        this.setState({fractal: num})
    }

    renderFractal = () => {
        switch(this.state.fractal){
            case 0:
                return(<Mendel/>)
            case 1:
                return(<Julia/>)
            case 2:
                return(<MultiJulia/>)
            case 3:
                return(<div>NEWTON TO DEVELOP</div>)
            default:
                return(<Mendel/>)
        }
    }

    render() {
        return (
            <div>
                <div className="buttonGroup">
                    <button onClick={() => this.setFractal(0)}>MENDEL</button>
                    <button onClick={() => this.setFractal(1)}>JULIA</button>
                    <button onClick={() => this.setFractal(2)}>MULTI-JULIA</button>
                    <button onClick={() => this.setFractal(3)}>NEWTON</button>
                </div>
                {this.renderFractal()}
            </div>
        );
    }
}

export default App;
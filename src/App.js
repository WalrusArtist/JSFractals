import React, { Component } from 'react';
import Mendel from './scenes/Mendel';
import { Form } from 'semantic-ui-react';

class App extends Component {
    state={iconstant : 2.0}

    handleChange = (e, { name, value }) => this.setState({ [name]: value })

    render() {
        const {iconstant} = this.state
        return (
            <div>
                <Form>
                    <Form.Input
                    label={`Imaginary Constant: ${iconstant}`}
                    min={-2}
                    max={4}
                    name='iconstant'
                    onChange={this.handleChange}
                    step={1}
                    type='range'
                    value={iconstant}
                    />
                </Form>
                <Mendel imaginaryConstant={this.state.iconstant}/>
            </div>
        );
    }
}

export default App;
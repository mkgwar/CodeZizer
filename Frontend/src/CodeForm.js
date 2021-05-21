import React, {Component} from 'react';
import axios from 'axios';

class CodeForm extends Component
{
    constructor(props)
    {
        super(props)
        
        this.state = 
        {
            code: '',
            mainClassName: '',
            output : '',
            compileError: '',
            runtimeError: '',
            timeToRun: 0
        }
    }

    ChangeHandler = e => 
    {
        this.setState( {[e.target.name]: e.target.value})
    }

    SubmitHandler = e =>
    {
        e.preventDefault()

        this.state.code = this.state.code.replace(/\s+/g, ' ')
        this.state.code = this.state.code.split(' ')

        for (let i = 0; i < this.state.code.length ; i++)
        {
            if (this.state.code[i] == 'class')
            {
                this.state.mainClassName = this.state.code[i+1];
                break;
            }
        }

        this.state.code = this.state.code.join(' ')

        console.log(this.state)

        axios.post('http://localhost:8080/run', this.state)
        .then(response =>
            {

                this.setState
                (
                    {
                        output: response.data.output,
                        compileError: response.data.compileError,
                        runtimeError: response.data.runtimeError,
                        timeToRun: response.data.timeToRun
                    }
                )
            })
    }

    render()
    {
        

        return(

            <center>
            <div>    
            <form className = "form" onSubmit = {this.SubmitHandler}>


                <textarea name="code" onChange = {this.ChangeHandler}></textarea>

                <p></p>

                <button type="submit">Run</button>

            </form>
            <p></p>

            <b>Output:</b> {this.state.output}
            <br></br>

            <b>Compile Error:</b> {this.state.compileError}
            <br></br>

            <b>Runtime Error:</b> {this.state.runtimeError}
            <br></br>

            <b>Time to Run:</b> {this.state.timeToRun} ms
            <br></br>
            </div>

            </center>
        )
    }
}

export default CodeForm;
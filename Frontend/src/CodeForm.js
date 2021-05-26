import React, {Component} from 'react';
import axios from 'axios';
import './CodeForm.css';
import logo from './Logo.png';

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
            timeToRun: ''
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

        axios.post('http://localhost:8080/run', this.state)
        .then(response =>
            {

                this.setState
                (
                    {
                        output: response.data.output,
                        compileError: "Compile error:\n" + response.data.compileError,
                        runtimeError: response.data.runtimeError,
                        timeToRun: response.data.timeToRun + " ms"
                    }
                )
            })

            console.log(this.state)
    }

    render()
    {
        
        return(

            <div className = "main_div">

            <div className = "menu_div">

                <img src = {logo} className = "logo" />

            </div>

            <div className = "compiler_div">

                <h2>Enter JAVA code below</h2>

            <form className = "form" onSubmit = {this.SubmitHandler}>


                <textarea name="code" onChange = {this.ChangeHandler} className = "code_text"></textarea>

                <button type="submit">Run</button>

            </form>
            </div>

            <div className = "output_div">

            <p><b>Output</b>
            <span>
               <div className="output_result">{this.state.output}</div> 
               <div className="compile_result">{this.state.compileError}</div> 
               <div className="runtime_result"> {this.state.runtimeError}</div> 
            </span>
            </p>

            <p><b>Time to Run</b>
            <span>
               <div className= "timer_result"> {this.state.timeToRun} </div>
            </span>
            </p>
            
            </div>

            </div>

        )
    }
}

export default CodeForm;
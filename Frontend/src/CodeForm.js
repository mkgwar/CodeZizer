import React, {Component} from 'react';
import axios from 'axios';
import './CodeForm.css';
import logo from './Logo.png';
import CodeMirror from '@uiw/react-codemirror';
import 'codemirror/keymap/sublime';
import 'codemirror/theme/monokai.css';
import logogif from './Codezizer.gif'

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
            timeToRun: '',
            memoryUsed: ''
        }
    }

    ChangeHandler = e =>
    {
        this.setState(
            {
                code : e.getValue()
            }
        )
    }

    ResetCode()
    {
        document.querySelector('.CodeMirror').CodeMirror.setValue('')
    }

    SubmitHandler = e =>
    {
        e.preventDefault()

        this.state.code = this.state.code.replace('\n', ' ')
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
                        compileError: response.data.compileError,
                        runtimeError: response.data.runtimeError,
                        timeToRun: response.data.timeToRun + " ms",
                        memoryUsed : response.data.memoryUsed + " KB"
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

                <img src = {logogif} className = "logo_gif" />

                <img src = {logo} className = "logo" />

            </div>

            <div className = "compiler_div">

                <h2>Enter JAVA code below</h2>

            <form className = "form" onSubmit = {this.SubmitHandler}>

            <div className = "code_text">

            <CodeMirror

                onChange = {this.ChangeHandler}

                options=
                {{
                    theme: 'monokai',
                    keyMap: 'sublime',
                    mode: 'java',
                }}
                />

                </div>

                <button type="submit" className = "submit_button">Run</button>

                <button onClick = {this.ResetCode} className = "reset_button">Reset</button>

            </form>
            </div>

            <div className = "output_div">

            <p><b>Output</b>
            <span>
               <div className="output_result">{this.state.output}</div> 
               <div className="compile_result">{this.state.compileError}</div> 
               <div className="runtime_result">{this.state.runtimeError}</div>
            </span>
            </p>

            <p className = "time_header"><b>Time to Run</b>
               <div className= "timer_result"> {this.state.timeToRun} </div>
            </p>

            <p className = "memory_header"><b>Memory Used</b>
            <div className = "memory_result"> {this.state.memoryUsed}</div>
            </p>
            
            </div>

            </div>

        )
    }
}

export default CodeForm;
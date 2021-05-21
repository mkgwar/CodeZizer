package com.codezizer.codezizer.response;

public class CodeRunResponse {
    public String output;
    public String compileError;
    public String runTimeError;
    public long timeToRun;

    public CodeRunResponse() {
        this.output = "";
        this.compileError = "";
        this.runTimeError = "";
    }
}

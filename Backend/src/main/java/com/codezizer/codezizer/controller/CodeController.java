package com.codezizer.codezizer.controller;

import com.codezizer.codezizer.request.CodeRunRequest;
import com.codezizer.codezizer.response.CodeRunResponse;
import com.codezizer.codezizer.service.CodeRunService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@CrossOrigin(maxAge = 3600)

@RestController
public class CodeController {

    @Autowired
    CodeRunService codeRunService;
    
    @CrossOrigin("http://localhost:3000")

    @PostMapping("/run")
    public CodeRunResponse handleCodeRun(@RequestBody CodeRunRequest request) throws IOException, InterruptedException {
        return this.codeRunService.runCode(request);
    }
}

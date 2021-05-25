package com.codezizer.codezizer.service;

import com.codezizer.codezizer.request.CodeRunRequest;
import com.codezizer.codezizer.response.CodeRunResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.io.*;

@Service
public class CodeRunService {
    private Logger logger = LoggerFactory.getLogger(CodeRunService.class);

    public CodeRunResponse runCode(CodeRunRequest request) throws IOException, InterruptedException {
        this.logger.info("RUNNING CODE " + request.code);
        CodeRunResponse response = new CodeRunResponse();
        // writes the code to a unique file with some unique name
        String fileName = request.mainClassName + ".java"; // unique name for each file
        PrintWriter out = new PrintWriter(fileName);
        out.println(request.code); // write code to file
        out.close(); // close file

        // start the counter
        long startTime = System.currentTimeMillis();

        // compile the code
        this.compile(fileName, response);
        if (response.compileError.length() > 0) {
            // failed to compile, no need to execute
            response.timeToRun = (System.currentTimeMillis() - startTime);
            File file = new File(fileName);
            // delete file after usage
            file.delete();
            return response;
        }

        // run the compiled code
        this.runClass(request.mainClassName, response);
        response.timeToRun = (System.currentTimeMillis() - startTime);

        // cleanup the files
        File file = new File(fileName);
        file.delete();
        File classFile = new File(request.mainClassName + ".class");
        classFile.delete();
        return response;
    }

    private void compile(String filename, CodeRunResponse response) throws InterruptedException, IOException {
        Runtime run = Runtime.getRuntime();
        Process pr = run.exec("javac " + filename); // compile file
        pr.waitFor();
        BufferedReader errBuff = new BufferedReader(new InputStreamReader(pr.getErrorStream()));
        String line = "";
        while ((line = errBuff.readLine()) != null) {
            response.compileError += line + "\n";
        }
    }

    private void runClass(String className, CodeRunResponse response) throws IOException, InterruptedException {
        Runtime run = Runtime.getRuntime();
        Process pr = run.exec("java " + className); // compile file
        pr.waitFor();
        BufferedReader inputStream = new BufferedReader(new InputStreamReader(pr.getInputStream()));
        BufferedReader errBuff = new BufferedReader(new InputStreamReader(pr.getErrorStream()));
        String line = "";
        while ((line = errBuff.readLine()) != null) {
            response.runTimeError += line + "\n";
        }
        while ((line = inputStream.readLine()) != null) {
            response.output += line + "\n";
        }
    }
}
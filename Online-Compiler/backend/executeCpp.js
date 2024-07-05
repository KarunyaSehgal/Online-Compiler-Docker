const fs = require("fs");
const path = require("path");
const {exec} = require("child_process");

const outputPath = path.join(__dirname, "outputs"); // /Users/karunyasehgal/Desktop/Online Compiler/backend/outputs

if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath, { recursive: true });
}

const executeCpp = (filepath, inputPath) => {
  const jobId = path.basename(filepath).split(".")[0]; //a9277f57-9a7e-4a72-a185-127a36650621.cpp
  //split will split the pathname into an array of elements before and after "." and thus the above statment would give the filename without cpp

  const outPath = path.join(outputPath, `${jobId}.out`); 
  
  return new Promise((resolve,reject) => {
    exec(
        //we are trying to get into the output folder
        //g++ - which language, filepath - where is the code file, outpath - where to store executable file, 
        `g++ "${filepath}" -o "${outPath}" && cd "${outputPath}" && "./${jobId}.out" < "${inputPath}"`,
        (error, stdout, stderr) => {
        //this error is dependent on the entire code eg: if we write resolv instead of resolve in the above code statement 
        //this will break the code 
        if(error){
            reject(error);
        }
        //dependent on the command output part 
        //this will return the error command written in the index.js file 
        if(stderr){
            reject(stderr);
        }
        //if the codes are correct then this will be executed 
        resolve(stdout);
    });
  });
};


module.exports = {
  executeCpp,
};
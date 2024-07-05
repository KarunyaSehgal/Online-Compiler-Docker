const fs = require('fs');
const path = require('path');
const {v4: uuid} = require('uuid');

//create a folder wherein we store the codes that user inputs
const dirCodes = path.join(__dirname, "codes"); ///Users/karunyasehgal/Desktop/Online Compiler/backend/codes path names will be similar to this 

//if filepath does not exist then it will make a directory through mkdirSync keyword automatically
if(!fs.existsSync(dirCodes)){
    fs.mkdirSync(dirCodes, {recursive: true});
}

const generateFile=(format, content)=>{
    //a unique id would be created, as soon as we enter language and code post run request on postman 
    const jobId=uuid();
    // console.log(jobId);
    const filename = `${jobId}.${format}`; 
    const filePath = path.join(dirCodes,filename);
    //we create a file wherein we push the codes and then push that file into the directory 

    fs.writeFileSync(filePath,content);
    //it takes input where to write(filepath) and what to write(content)
    return filePath;
};

module.exports={
    generateFile
};
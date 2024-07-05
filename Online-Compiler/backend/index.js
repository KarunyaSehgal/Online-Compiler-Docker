//We are building child process which are instances of the operating system which run concurrently with the parent process
//thus any code written on our compiler will be running on the terminal, but we would no longer need to visit the terminal.
const express = require("express");
const { generateFile } = require("./generateFile.js");
const { generateInputFile } = require("./generateInputFile.js");
const { executeCpp } = require("./executeCpp.js");
const cors = require("cors");
const app = express();

//middlewares 
//CORS defines a way for client web applications that are loaded in one domain to interact with resources in a different domain.
app.use(cors());
//for accepting the json data
app.use(express.json());
//URL encoding converts characters into a format that can be transmitted over the Internet
app.use(express.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.json({online: "compiler"});
});

//creating a post requiest route which helps us in running the code  
app.post("/run", async (req,res) => {
    //things needed from the frontend -> laguage & code
    //if we dont give any lang, then the default language chosen is cpp 
    //input here refers to the input needed from the user 
    const {language = 'cpp', code, input} = req.body;
    if(code===undefined){
        return res.status(400).json({success: false, message: "Empty code body!"});
    }

    try{
        //creating a file wherein we input out code entered in the compiler
        const filePath = generateFile(language, code);
        const inputPath = generateInputFile(input);
        const output = await executeCpp(filePath, inputPath );
        res.json({filePath,output,inputPath});
    }catch(error){
        res.status(500).json({success: false, message: "Error: " + error.message});
    }
})

app.listen(8000, () => {
    console.log("Server is listening on port 8000!");
});
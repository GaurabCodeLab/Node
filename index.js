const express = require('express');
const server = express();

// express built-in middleware :-
// server.use("/ramu", express.static("public"));
// server.use(express.static("dolly"));

// server.get("/",(req, res)=>{
//     res.send("hello world")
// })


// server methods and properties :-

// server.use("/:id", (req, res, next)=>{
//     const id = req.params.id;
//     if(id>5){
//      next();
//     } else{
//         res.send("you are not authorised");
//     }
// })

// server.get("/:id", (req, res)=>{
//     res.send("you are authorized");
// })

// server.get('/', (req, res)=>{
//     res.send({
//         "type" : "GET"
//     })
// })

// server.post("/", (req, res)=>{
//     res.send({
//         "type" : "POST"
//     })
// })

// server.put("/", (req, res)=>{
//     res.send({
//         "type" : "PUT"
//     })
// })

// server.patch("/", (req, res)=>{
//     res.send({
//         "type" : "PATCH"
//     })
// })

// server.delete("/", (req, res)=>{
//     res.send({
//         "type" : "DELETE"
//     })
// })


// request methods and properties:-

// server.get("/:id", (req, res)=>{
//     // request property
//     console.log(req.ip);
//     console.log(req.ips);
//     console.log(req.method);
//     console.log(req.path);
//     console.log(req.hostname);
//     console.log(req.protocol);
//     console.log(req.params);
//     console.log(req.query);

//     // to get header information
//     console.log(req.get('Sec-Ch-Ua-Platform'));
//     res.end();
// })


// response methods and properties : -

// server.get("/", (req, res)=>{
//     res.set("raja", new Date); // set response header
//     console.log(res.getHeaders()); // get all response header
//    console.log(res.get("raja"));  // get particular response header
//     res.sendStatus(600); // send status code text as body and end request-response cycle
//    res.send("5"); // ends request-response cycle
//    res.json("ram"); // ends request-response cycle
//    res.end();  //  ends request-response cycle without any data
// })


server.listen(8080, ()=>{
    console.log("server is running")
})
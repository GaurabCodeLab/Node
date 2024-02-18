const fs = require('fs');
const express = require('express');
const data = fs.readFileSync("users.json", "utf-8");
const users = JSON.parse(data);

const server = express();
server.use(express.json());

// READ Operation: -
// READ All Data:-
server.get('/users', (req, res)=>{
    res.status(200).json(users);
})

// READ Single Data:-
server.get('/users/:id', (req, res)=>{
    const id = req.params.id;
   const user = users.find((value)=>{
    return value.id == id;
   });
   res.status(200).json(user);
})

// DELETE Operation:-
server.delete('/users/:id', (req, res)=>{
    const id = req.params.id;
    const userIndex = users.findIndex((value)=>{
        return value.id == id;
    });
    const user = users.splice(userIndex, 1);
    res.status(200).json(user);
})

// CREATE Operation:-
server.post('/users', (req, res)=>{
    const user = req.body;
    users.push(user);
    res.status(201).json(user);
})

// UPDATE Operation:-
// PUT Operation:-
server.put('/users/:id', (req, res)=>{
    const data = req.body;
    const id = req.params.id;
    const userIndex = users.findIndex((value)=>{
        return value.id == id;
    });
    users.splice(userIndex, 1, {...data, id});
    res.status(200).json(users[userIndex]);
})

// PATCH Operation:-
server.patch('/users/:id', (req, res)=>{
    const data = req.body;
    const id = req.params.id;
    const userIndex = users.findIndex((value)=>{
        return value.id == id;
    });
    users.splice(userIndex, 1, {...users[userIndex], ...data});
    res.status(200).json(users[userIndex]);
})

server.listen(8080, ()=>{
    console.log("Server is running");
})


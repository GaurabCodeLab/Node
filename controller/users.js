const fs = require('fs');

const data = JSON.parse(fs.readFileSync('users.json', 'utf-8'));
const users = data.users;

exports.getAllUsers = (req, res)=>{
    res.status(200).json(users);
}

exports.getUser = (req, res)=>{
    const id = req.params.id;
    const user = users.find((value)=>{
        return value.id == id;
    });
    res.status(200).json(user);
}

exports.createUser = (req, res)=>{
    const user = req.body;
    users.push(user);
    res.status(201).json(user);
}

exports.replaceUser = (req, res)=>{
    const id = req.params.id;
    const updatedUser = req.body;
    const userIndex = users.findIndex((value)=>{
        return value.id == id;
    });
    users.splice(userIndex, 1, {...updatedUser, id :id});
    res.status(200).json(users[userIndex]);
}

exports.updateUser = (req, res)=>{
    const id = req.params.id;
    const updatedUser = req.body;
    const userIndex = users.findIndex((value)=>{
        return value.id == id;
    });
    const user = users[userIndex];
    users.splice(userIndex, 1, {...user, ...updatedUser});
    res.status(200).json(users[userIndex]);
}

exports.deleteUser = (req, res)=>{
    const id = req.params.id;
    const userIndex = users.findIndex((value)=>{
        return value.id == id;
    });
    const user = users.splice(userIndex, 1);
    res.status(200).json(user)
}
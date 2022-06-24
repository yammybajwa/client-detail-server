const express = require("express");

const app = express();

const mongoose = require("mongoose");

const cors = require("cors");

const UserModel = require("./model/Users.js");

app.use(express.json());

app.use(cors());

app.post("/createUser", async (req, res) => {
    const user = req.body;
    const newUser = new UserModel(user);
    await newUser.save()

    res.json(user)
})

app.get("/getUsers", (request, response) => {
    UserModel.find({}, (err, result) => {
        if (!err) {
            response.json(result)
        } else {
            response.json(err)
        }
    })
});

app.put("/updateUser", (req, res) => {

    const { id, name, age } = req.body

    try {
        UserModel.findById(id, (err, user) => {
            console.log(user)
            user.name = name
            user.age = age
            user.save()
            res.send("User has been successfully updated in DB")
        })
    }
    catch (err) {
        res.send("Getting error from server")
    }
});

app.delete("/deleteUser/:id", async (req, res) => {
    const id = req.params.id

    await UserModel.findByIdAndRemove(id).exec()
    res.send("User has been successfully deleted from DB")
})

mongoose.connect("mongodb+srv://user:user@cluster0.tbpnr2i.mongodb.net/Crud?retryWrites=true&w=majority");

const port = process.env.PORT || 8000;


app.listen(port,()=>{
    console.log("server is running")
})


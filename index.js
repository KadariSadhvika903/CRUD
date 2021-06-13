
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const User = require("./model/user");


// middlewares
// for incoming post requests
app.use(
    express.urlencoded({
        extended: false,
    })
);

// for sending data in json format (JSON.stringify)
app.use(express.json());

app.use("*", (req, res, next) => {
    console.log("I am Middleware");
    next();
});


mongoose
  .connect("mongoURI: mongodb://localhost:27017/CRUD", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const newF = (req, res, next) => {
  console.log("SECCOND");
  next();
};

//create user
app.post("/CreateAUser", (req, res) => {
    const user = new User({
        ...req.body,
    });
    console.log(user);

    user.save()
    .then((addedUser) => {
        console.log(addedUser);

        res.json({ user: addedUser });
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json({ message: "Error" });
    });
});


//get user
app.get("/FetchUsers", (req, res) => {
    User.find()
      .then((users) => {
        res.json({ users });
    })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ message: "Error" });
    });
});

app.get("/FetchUsersByID/:id", (req, res) => {
    User.findById(req.params.id)
      .then((users) => {
        res.json({ users });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ message: "Error" });
      });
});

app.put("/EditUser/:id", async (req, res) => {
    const { Name, Email, ContactNumber, HouseNumber} = req.body;
    User.findByIdAndUpdate(
        req.params.id,
        {
          Name,
          Email,
          ContactNumber,
          HouseNumber,
        },
        { new: true }
      )
        .then((user) => {
          res.json({ user });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({ message: "Error" });
        });
    });

app.delete("/DeleteUser/:id", async (req, res) => {
    const { Name, Email, Age, ContactNumber, Address, HouseNumber} = req.body;
    User.findByIdAndUpdate(
        req.params.id,
        {
          Name,
          Email,
          Age,
          ContactNumber,
          Address,
          HouseNumber,
        },
        { new: true }
      )
        .then((user) => {
          res.json({ user });
        })
        .catch((err) => {
          console.log(err);
          res.status(200).json({ message: "Error" });
        });
});

app.listen(5000, () => console.log("Server is running"));
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookie_parser = require("cookie-parser");
const verifyToken = require("./verifyToken");
const nodemailer = require("nodemailer");

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookie_parser());

mongoose
  .connect("mongodb://localhost:27017/cipherschools")
  .then(() => {
    console.log("database connected successfully...");
  })
  .catch(() => {
    console.log("some thign went wrong while connecting database...");
  });

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, "username is mandatory"],
  },
  password: {
    type: String,
    required: [true, "password is mandatory"],
  },
  name: {
    type: String,
  },
  mobile: {
    type: String,
    minLength: [10, "mobile length should be 10 only"],
  },
});

const userModel = mongoose.model("users", userSchema);

const testSchema = mongoose.Schema({
  question: {
    type: String,
  },
  options: {
    type: [String],
  },
  correctAnswer: {
    type: String,
  },
});

const testModel = mongoose.model("MCQs", testSchema);

const scoreSchema = mongoose.Schema({
  email: String,
  name: String,
  score: String,
  date: String,
});
const scoreModel = mongoose.model("scores", scoreSchema);

app.post("/register", (req, res) => {
  let data = req.body;
  bcryptjs.genSalt(10, (err, salt) => {
    if (!err) {
      bcryptjs.hash(data.password, salt, (err, npass) => {
        if (!err) {
          data.password = npass;
          userModel
            .create(data)
            .then((info) => {
              res
                .status(200)
                .send({ message: "register successfull", data: info });
            })
            .catch((err) => {
              res
                .status(500)
                .send({ error: "some thing went wrong while register" });
            });
        }
      });
    }
  });
});

app.post("/login", (req, res) => {
  let data = req.body;

  userModel
    .findOne({ username: data.email })
    .then((info) => {
      if (info != null) {
        bcryptjs.compare(data.password, info.password, (err, result) => {
          if (!err) {
            if (result == true) {
              jwt.sign({ email: data.email }, "saikey", (err, token) => {
                if (!err) {
                  res.cookie("token", token, {
                    httpOnly: false,
                    secure: false,
                    sameSite: "none",
                  });

                  res.status(200).send({
                    message: "login success",
                    status: true,
                    token: token,
                    data: info,
                  });
                }
              });
            } else {
              res
                .status(402)
                .send({ status: false, message: "password is Incorrect..." });
            }
          }
        });
      } else {
        res.status(404).send({
          status: false,
          message: "username is incorrect / not register",
        });
      }
    })
    .catch((err) => {
      res
        .status(500)
        .send({ status: false, error: "some thing went wrong ..." });
    });
});

app.get("/mcqs", verifyToken, (req, res) => {
  testModel
    .find({})
    .then((data) => {
      let mcq_data = data.map((item) => ({
        _id: item._id,
        question: item.question,
        options: item.options,
      }));
      // console.log(mcq_data);
      res.status(200).send({ mcqs: mcq_data });
    })
    .catch((err) => {
      res.status(500).send({ error: "something went wrong" });
    });
});

app.post("/save-score", (req, res) => {
  const { email, name, selectedAnswers } = req.body;

  // Validate if all required data is present
  if (!email || !name || !selectedAnswers) {
    return res.status(400).send({ message: "Incomplete data provided" });
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "kedarisettisai2001@gmail.com",
      pass: "iivw rbaj fxbp umfv",
    },
  });

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();

  let todayDate = `${day}-${month}-${year}`;
  let score = 0;

  testModel
    .find({})
    .then((mcqs) => {
      mcqs.forEach((item, index) => {
        if (item.correctAnswer == selectedAnswers[index]) {
          score++;
        }
      });

      let mailOptions = {
        from: "kedarisettisai2001@gmail.com",
        to: `${email}`,
        subject: "Cipher Schools Assignment Score",
        text: `Hello ${name},`,
        html: `Thank you for participating in the "Cipher Schools Entry Level Test" scheduled by Cipher Schools.<br>
               Your response was successfully submitted on ${todayDate}.<br>
               <h1 style="color:red">Score: ${score}</h1>`,
      };

      transporter.sendMail(mailOptions, (err, result) => {
        if (err) {
          console.log("Something went wrong while sending the mail...");
          return res.status(500).send({ error: "Email sending failed" });
        } else {
          console.log("Email sent successfully...");
        }
      });

      let scoredata = {
        email: email,
        name: name,
        score: score,
        date: todayDate,
      };
      console.log(scoredata);

      scoreModel
        .create(scoredata)
        .then((response) => {
          res.send({ status: true, data: response });
        })
        .catch(() => {
          res
            .status(500)
            .send({ error: "Something went wrong while saving the scores..." });
        });
    })
    .catch(() => {
      res
        .status(500)
        .send({
          error:
            "Something went wrong while fetching the data from the server...",
        });
    });
});

app.listen(3000, () => {
  console.log("server is running at 3000");
});

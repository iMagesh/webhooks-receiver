const express = require("express");
const multer = require("multer");
const upload = multer({
  dest: "json-files/", // this saves your file into a directory called "uploads"
});
const app = express();
const port = 4000;

const environment = process.env.NODE_ENV || "development";
// const config = require("./knexfile")[environment];
// const knex = require("knex")(config);
const cors = require("cors");
// import cors from "cors";
const EventEmitter = require("events");
app.set("view engine", "pug");

const path = require("path");
const fs = require("fs");
const directoryPath = path.join(__dirname, "json-files");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/files", (req, res) => {
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      return console.log("Unable to scan directory: " + err);
    }
    files.forEach(function (file) {
      console.log(file);
    });
    // res.json(files);
    console.log(files);
    res.render("files", { files: files });
  });
});

app.get("/form", (req, res) => {
  res.render("form");
});

// app.post("/upload", (req, res) => {
//   if (!req.files || Object.keys(req.files).length === 0) {
//     return res.status(400).send("No files were uploaded.");
//   }
//   console.log(req.files.file);
//   res.redirect("/forms");
// });

app.post("/upload", upload.single("file"), (req, res) => {
  res.redirect("/files");
});

app.get("/files/show", (req, res) => {
  console.log(req.query.file);
  let file = fs.readFileSync("json-files/" + req.query.file);
  let fileJSON = JSON.parse(file);
  console.log(fileJSON);
  res.send(syntaxHighlight(JSON.stringify(fileJSON, null, 4)));
});

function syntaxHighlight(json) {
  if (typeof json != "string") {
    json = JSON.stringify(json, undefined, 2);
  }
  json = json
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  return json.replace(
    /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
    function (match) {
      var cls = "number";
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          cls = "key";
        } else {
          cls = "string";
        }
      } else if (/true|false/.test(match)) {
        cls = "boolean";
      } else if (/null/.test(match)) {
        cls = "null";
      }
      return '<span class="' + cls + '">' + match + "</span>";
    }
  );
}

// app.options("/login", (req, res) => {
//   let json = {
//     status: 200,
//   };
//   res.status = 200;
//   res.json(json);
// });

// app.get("/", (req, res) => {
//   // myEmitter.emit('event');
//   knex("todos")
//     .select()
//     .then((result) => {
//       res.json(result);
//     })
//     .catch((err) => {
//       res.json({ status: 500, error: err });
//     });
// });

// function validTodo(todo) {
//   return (
//     typeof todo.title === "string" &&
//     todo.title.trim() !== "" &&
//     typeof todo.priority !== "undefined" &&
//     !isNaN(Number(todo.priority))
//   );
// }

// function buildTodoFields(req) {
//   return {
//     title: req.body.title,
//     description: req.body.description,
//     priority: req.body.priority,
//   };
// }

// app.post("/todos", (req, res) => {
//   const todo = buildTodoFields(req);
//   if (validTodo(todo)) {
//     knex("todos")
//       .returning(["id", "title", "priority"])
//       .insert(todo)
//       .then((todo) => {
//         res.json(todo);
//       });
//   } else {
//     // const errors = {messages: ""}
//     // res.render("new", errors)
//     res.send("Oops! You have an error on the form");
//   }
// });

// app.delete("/todos/:id", (req, res) => {
//   knex("todos")
//     .returning(["id"])
//     .where("id", req.params.id)
//     .del()
//     .then((resp) => {
//       console.log(resp);
//       res.json(resp[0].id);
//     });
// });

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

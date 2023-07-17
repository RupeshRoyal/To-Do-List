const express = require("express");
const bodyParser = require("body-parser");

const date= require(__dirname+"/date.js");//requiring from the exports modules through directory 
const app = express();

app.set('view engine', 'ejs');//sets the EJS template engine as the default for rendering dynamic views in an Express application.

let items = ["eat food", "cook food", "eat food"];
let item = "";
let workItems = [];

app.use(bodyParser.urlencoded({   //parsing URL encoded data in the body of the incoming HTTP requests, allowing easy access to form data.
  extended: true
}));

app.use(express.static("public"));// serves static files from the "public" directory in the Express application, making them accessible to clients

app.get("/", function(req, res) {
  const day = date.getDate();
  res.render('list', {   //rendering list.ejs
    listTitle: day,
    newListItems: items
  });
});

app.post("/", function(req, res) {

  let item = req.body.newItem;
  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }

});
app.get("/work", function(req, res) {
  res.render("list", {
    listTitle: "Work List",
    newListItems: workItems
  });
});
app.post("/work", function(req, res) {
  let item = req.body.newItem;
  res.redirect("/work");
});

app.get("/about",function(req,res){
  res.render("about");
});
app.listen(3000, function() {
  console.log("server started on port 3000");
});

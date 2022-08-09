const express = require("express");
const mongoose = require("mongoose");
// const date = require(__dirname + "/date.js");

const app = express();

// const items = [];
// const workItems = ["Work Item 1", "Work Item 2"];

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");

mongoose.connect("mongodb://127.0.0.1:27017/todolistDB", {
  useNewUrlParser: true,
});

const itemsSchema = {
  name: String,
};

const Item = mongoose.model("Item", itemsSchema);

const item1 = new Item({
  name: "Welcome to your ToDo list",
});

const item2 = new Item({
  name: "Enter items to add",
});

const defaultItems = [item1, item2];

// Item.insertMany(defaultItems, function (err) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Successfully inserted data");
//   }
// });

app.get("/", function (req, res) {
  // let day = date();

  Item.find({}, function (err, resultItems) {
    if (resultItems.length === 0) {
      Item.insertMany(defaultItems, function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log("Successfully inserted data");
        }
      });
      res.redirect("/");
    } else {
      res.render("list", { listTitle: "Today", newListItems: resultItems });
    }
  });
});

app.get("/work", function (req, res) {
  res.render("list", { listTitle: "Work List", newListItems: workItems });
});

app.post("/", function (req, res) {
  const itemName = req.body.newItem;

  const item = new Item({
    name: itemName,
  });

  item.save();

  res.redirect("/");
});

app.post("/delete", function (req, res) {
  const checkboxId = req.body.checkbox;

  Item.findByIdAndRemove(checkboxId, function (err) {
    if (!err) {
      console.log("Successfully deleted item");
    }
  });
  res.redirect("/");
});

app.listen(3000, function () {
  console.log("Server running on port 3000...");
});

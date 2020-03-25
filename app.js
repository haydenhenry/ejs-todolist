const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

let items = ["Buy Food", "Cook Food", "Eat Food"];
let workItems = [];

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"))

app.get("/", (req, res)=>{
    let today = new Date();
    const options = {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
    };

    let day = today.toLocaleDateString("en-US", options);
    res.render("list", {listTitle: day, newListItem: items});
});

app.get("/work", (req, res)=>{
    res.render("list", {listTitle: "Work List", newListItem: workItems})
});

app.get("/about", (req, res)=>{
    res.render("about")
})

app.post("/", (req, res)=>{
    let item = req.body.newItem;
    if(req.body.list === "Work List"){
        workItems.push(item);
        res.redirect("/work")
    } else {
        items.push(item);
        res.redirect("/");
    }
});

app.post("/work", (req, res)=>{
    let item = req.body.newItem;
    workItems.push(item);
    res.redirect("/work")
});



app.listen(port, ()=>{
    console.log("Server started on port 3000");
});
const express = require("express");
const hbs = require("hbs");
const fs = require("fs");

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set("view engine", "hbs");
app.use((req, res, next) => {
	var now = new Date().toString();
	var log = `${now}: ${req.method} ${req.url}`;

	// console.log(log);
	fs.appendFile("server.log", log+'\n', (err_msg) => {
		if(err_msg){
			console.log("Unable to append to server.log");
		}
	})

	// if next() is not called, the program won't continue
	// this is useful for logging request data for various purposes
	next();
})

/* Used for maintainance
app.use((req, res, next) => {
	res.render("maintainance.hbs");
})
*/

app.use(express.static(__dirname + "/public"));

hbs.registerHelper("getCurrentYear", () => {
	return new Date().getFullYear();
});

hbs.registerHelper("screamIt", (text) => {
	return text.toUpperCase();
});

app.get("/", (req, res) => {
	res.render("home.hbs", {
		page_title: "Home Page",
		welcome_message: "Welcome to my site!",
	});
})

app.get("/project", (req, res) => {
	res.render("project.hbs", {
		page_title: "Project Page",
		project_link: "http://yichuan33.blogspot.com/", 
		github_link: "https://github.com/yichuan99"
	})
})

app.get("/about", (req, res) => {
	res.render("about.hbs", {
		page_title: "About Page",
	});
})

app.get("/bad", (req, res) => {
	res.send({
		err_msg: "Unable to handle request"
	});
})

app.listen(port, () => {
	console.log(`Server running on port ${port}...`);
});
 
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const trailController = require("../controller/trailController");
const queries = require("../database/queries.js");

const app = express();
const PORT = 3000;

//extracts the entire body portion of an incoming request stream and exposes it on req.body
app.use(bodyParser.json());
app.use(cookieParser());
app.use("/assets", express.static(path.join(__dirname, "../assets")));
app.use("/build", express.static(path.join(__dirname, "../build")));
//sends index.html file upon entering home page
app.get("/homepage", (req, res) => {
	res.status(200).sendFile(path.resolve(__dirname, "../index.html"));
});
//fetches trail data from REI API
app.post("/data", trailController.getTrails, (req, res) => {
	res.status(200).send(res.locals.trails);
});
//routes post request upon login to verify user
app.post("/login", queries.verifyUser, queries.addSession, (req, res) => {
	const { verified } = res.locals;
	return res.status(200).json(verified);
});
app.get("/gettingUser", queries.getUserThroughCookie, (req, res) => {
	return res.status(200).json(res.locals.username);
});

// log out user
app.get("/logout", (req, res) => {
	res
		.clearCookie("session")
		.status(200)
		.end();
});

// post request that brings in user-input signup information, creates a new user in the database, and sends verification to the front end
app.post(
	"/signup",
	queries.createUser,
	queries.createSession,
	queries.addSession,
	(req, res) => {
		const { verified } = res.locals;
		return res.status(200).json(verified);
	}
);

// get favorites
app.post("/getfavorites", queries.getFavorites, (req, res) => {
	return res.status(200).json(res.locals.favorites);
});

// post favorites
app.post("/favorites", queries.addFavorite, (req, res) => {
	return res.setStatus(200);
});

// sends all comments pertaining to trail ID
app.get("/comments", queries.getComment, (req, res) => {
	res.status(200).send(res.locals.comments);
});

//posts new comment in database and sends back all comments pertaining to unique trail ID
app.post("/comments", queries.postComment, (req, res) => {
	res.status(200).send(res.locals.comments);
});

// catch-all route handler for any requests to an unknown route
app.all("*", (req, res) => {
	res.sendStatus(404);
});

//global error handler
app.use((err, req, res, next) => {
	const defaultErr = {
		log: "Express error handler caught unknown middleware error",
		status: 400,
		message: { err: "An error occurred" }
	};
	const errObj = Object.assign((defaultErr, err));
	console.log(errObj.log);
	res.status(errObj.status).json(errObj.message);
});

//start server
app.listen(PORT, () => {
	console.log(`Server listening on port: ${PORT}`);
});

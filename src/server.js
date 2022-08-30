import express from "express";

const PORT = 4000;

const app = express();

const logger = (req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
}
const privateMiddleware = (req, res, next) => {
    const url = req.url;
    if(url === "/protected"){
        return res.send("<h1>Not Allowed</h1>")
    }
    console.log("Allowd, you may continue.");
    next();
}

const handleHome = (req, res) => {
    return res.send("I love middleware.");
};

const handleLogin = (req, res) => {
    return res.send("Login here.");
}

const handelPretected = (req, res) => {
    return res.send("Welcome to the private logger");
}

// Route
app.use(logger);
app.use(privateMiddleware);
app.get("/", handleHome);
app.get("/protected", handelPretected);

const handleListening = () => 
    console.log(`Server listening on http://localhost:${PORT} 👋`);

app.listen(PORT, handleListening);

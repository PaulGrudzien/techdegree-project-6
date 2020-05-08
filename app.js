const express = require("express")
const data = require("./data.json")
const app = express()

app.set('view engine', 'pug');
app.use('/static', express.static('public'));

// route for the root
app.get('/', (req, res, next) => {
    res.locals = { data };
    res.render("index");
});

// route for the about page : who am I
app.get('/about', (req, res, next) => {
    res.render("about");
});

// route for a project if the id is valid
app.get('/projects/:id', (req, res, next) => {
    id = req.params.id;
    projects = data.projects.filter(project => project.id == id);
    if (projects.length == 0) {
        const err = new Error(`There is no project with id ${id}!`);
        err.status = "404";
        next(err);
    } else {
        res.locals = { project: projects[0] }
        res.render("project");
    };
});

// route for all inexisting page
app.use((req, res, next) => {
    const err = new Error(`Page not found (${req.originalUrl})`);
    err.status = "404";
    next(err);
});

// handle errors
app.use((error, req, res, next) => {
    console.error(`Error ${error.status}: ${error.message}`);
    res.locals = { error };
    res.render("error");
});

app.listen(3000, () => {console.log('Server is listening on port 3000')});

const { response } = require("express");
const express = require("express");
const routes = express.Router();
const { uuid } = require("uuidv4");
const validateProjectId = require("./middlewares/validateProjectId")


const projects = [];

routes.get("/projects", (req, res) => {
    const { title } = req.query;

    const results = title ? projects.filter(project => project.title.includes(title)) : projects;

    return res.json(results)
})

routes.post("/projects", (req, res) => {
    const { title, owner } = req.body;

    const project = {
        id: uuid(),
        title,
        owner
    }

    projects.push(project);

    return res.json(project);
})

routes.put("/projects/:id", validateProjectId, (req, res) => {
    const { id } = req.params;

    const { title, owner } = req.body;

    const projectIndex = projects.findIndex(project => project.id === id);

    if (projectIndex < 0) {
        return response.status(400).json({ error: "Project not found." })
    }

    const project = {
        id, 
        title: title ? title : projects[projectIndex].title, 
        owner: owner ? owner : projects[projectIndex].owner
    }

    projects[projectIndex] = project;

    return res.json(project)
})

routes.delete("/projects/:id", validateProjectId, (req, res) => {
    const { id } = req.params;

    const projectIndex = projects.findIndex(project => project.id === id);

    if (projectIndex < 0) {
        return response.status(400).json({ error: "Project not found." })
    }

    projects.splice(projectIndex, 1);

    return res.status(204).send();
})

module.exports = routes
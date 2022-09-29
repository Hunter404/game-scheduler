const fs = require("fs");
const express = require("express");
const cors = require("cors");
const app = express();

const dataPath = "./data/db.json"

// Save database
const saveDatabase = (data) => {
    const jsonData = JSON.stringify(data)
    fs.writeFileSync(dataPath, jsonData)
}

// Read database, empty array if file doesn't exist.
const getDatabase = () => {
    const stringData = fs.readFileSync(dataPath) || "[]"
    return JSON.parse(stringData)
}

app.use(cors())
app.use(express.static('./../frontend/dist'))

app.get('/schedule/:scheduleId', (req, res) => {
    const data = getDatabase()
    const repo = data[req.params.scheduleId]

    if (!repo) return res.sendStatus(404)

    return res.send(repo)
});

app.post('/schedule/:scheduleId', express.json(), function (req, res, next) {
    const data = getDatabase()
    const repo = data[req.params.scheduleId]

    if (!repo) return res.sendStatus(404)

    const user = req.body.user
    const schedule = req.body.data

    if (!user || !schedule) return res.sendStatus(500)

    repo.data.push({
        user,
        schedule
    })

    data[req.params.scheduleId] = repo
    saveDatabase(data)

    return res.sendStatus(200)
});

app.listen(8000);

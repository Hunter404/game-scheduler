const fs = require("fs");
const express = require("express");
const cors = require("cors");
const app = express();

const dataPath = "./data"
const fileExtension = ".json"

// Save database
const saveDatabase = (id, data) => {
    const sanitizedId = id.replace(/[^0-9a-z]/gi, '')

    const jsonData = JSON.stringify(data)
    fs.writeFileSync(`${dataPath}/${sanitizedId}${fileExtension}`, jsonData)
}

// Read database, empty array if file doesn't exist.
const getDatabase = (id) => {
    const sanitizedId = id.replace(/[^0-9a-z]/gi, '')

    const stringData = fs.readFileSync(`${dataPath}/${sanitizedId}${fileExtension}`) || "{}"
    return JSON.parse(stringData)
}

app.use(cors())
app.use(express.static('./../frontend/dist'))

app.get('/api/schedule/:scheduleId', (req, res) => {
    const data = getDatabase(req.params.scheduleId)

    if (!data) return res.sendStatus(404)

    return res.send(data)
});

app.post('/api/schedule/create', express.json(), (req, res) => {
    const data = {
        days: req.body.form.days,
        hourStart: req.body.form.hourStart,
        hourLength: req.body.form.hourLength,
        data: [],
    }

    const id = makeid(5)

    saveDatabase(id, data)

    return res.send({ id })
});

app.post('/api/schedule/:scheduleId', express.json(), function (req, res) {
    const data = getDatabase(req.params.scheduleId)

    if (!data) return res.sendStatus(404)

    const user = req.body.user
    const schedule = req.body.data

    if (!user || !schedule) return res.sendStatus(500)

    data.push({
        user,
        schedule
    })

    saveDatabase(id, data)

    return res.sendStatus(200)
});

function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}

app.listen(8000, '0.0.0.0');

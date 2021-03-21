const express = require('express')
const fs = require('fs')
const path = require('path')
const app = express()
const port = 3000

app.use(express.json())

//Noted
app.use('/static', express.static('public'))


app.get('/timestamp', (req, res) => {
	let timeStamp = Date.now()
	let dictTimeStamp = {"timestamp":`${timeStamp}`}
	res.send(JSON.stringify(dictTimeStamp))
})

const logPath = path.join(__dirname, 'logs')
if (!fs.existsSync(logPath)) {
	fs.mkdirSync(logPath)
}

app.post('/logs', (req, res) => {
	let logVal = {}
	logVal.timestamp = Date.now()
	logVal.level = req.body.level
	logVal.message = req.body.message
	fs.writeFile(`${logPath}/${logVal.timestamp}`, JSON.stringify(logVal), 'utf8', (err) => {
		if (err) {
			console.log("An error occured while recording Log file.");
        	return console.log(err);
		}
		console.log("Log saved successfully.")
	})
})

app.get('/logs', (req, res) => {
	let url = new URL(req.url, `http://${req.headers.host}`)
	let nRecent = url.searchParams.get("limit")
	let logsArr = []
	fs.readdir(logPath, (err, files) => {
		if (err) {
			return console.log("Unable to scan directory: " + err)
		}
		let totalFile = files.length
		if (totalFile < nRecent) {
			nRecent = totalFile
		}
		for (var i = totalFile - nRecent; i < totalFile; i++) {
			logsArr.push(JSON.parse(fs.readFileSync(`${logPath}/${files[i]}`, "utf-8")))
		}
		let dictLogs = {"logs": logsArr}
		res.send(JSON.stringify(dictLogs))
	})
})

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`)
})
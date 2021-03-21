# BE1010

#### Install dependencies:
```
npm install
```

#### Launch server:
```
node index.js
```

#### Access server API via web browser:
http://localhost:3000/<API>
<br /><i>Example: </i>
http://localhost:3000/timestamp

#### POST Request to /logs via shell:
curl --request POST \
--url http://localhost:3000/logs \
--header 'content-type: application/json' \
--data '{
    "level": <i>string</i>,
    "message": <i>string</i>
}'
<br /><i>Example: </i>
curl --request POST \
--url http://localhost:3000/logs \
--header 'content-type: application/json' \
--data '{
    "level": "info",
    "message": "Test Message"
}'
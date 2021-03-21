BE1010

Install dependencies:
```
npm install
```

Launch server:
```
node index.js
```

Access server API via web browser:
http://localhost:3000/<API>
Example: 
http://localhost:3000/timestamp

POST Request to /logs via shell:
curl --request POST \
--url http://localhost:3000/logs \
--header 'content-type: application/json' \
--data '{
    "level": string,
    "message": string
}'
Example:
curl --request POST \
--url http://localhost:3000/logs \
--header 'content-type: application/json' \
--data '{
    "level": "info",
    "message": "Test Message"
}'
JsToday has two main components.


jstoday-site: app that runs the actual site

jstoday-update-server: app that can be run like a cron job to update the databse.


App Structures

jstoday-site
  |
  |_ app/
    |_ models/
    |_ routes/
  |_ jspro.js
  |_ package.json

jstoday-update-server
  |
  |_ app/
    |_ cron/
    |_ models/
    |_ routes/
  |_ package.json
  |_ update-server.js
    |_ views/

### JsToday has two main components.

  jstoday-site: app that runs the actual site

  jstoday-update-server: app that can be run like a cron job to update the databse.


### Endpoints

JsToday has several restful url endpoints that provide json responses for the client side to use.

#### All feed items (date)
	// 0 is first record to return
	// Default sort by date
	jstoday.io/feed/all/0

#### All feed items (popularity)
	// 0 is first record to return
	// Sorted by popularity (number of votes)
	jstoday.io/feed/all/popular/0

#### User's starred items
	// 0 is first record to return
	// userId is user's id as provided by their account
	// in the database.
	jstoday.io/feed/stared/userId/0

#### User's starred items
	// Returns a simple list containing the ids of all starred items.
	jstoday.io/feed/allstarred/userId

#### User's voted items
	// Returns a simple list containing the ids of all voted items.
	jstoday.io/feed/allvoted/userId


### App Structures

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

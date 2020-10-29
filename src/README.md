
Thinkful JSON API
Bookmarks Endpoints
BASE URL: https://thinkful-list-api.herokuapp.com

**************************************************************************
**************************************************************************
IMPORTANT: The first section of the path must be a unique short string of your choice - we recommend you use your name. This unique name will allow you to persist the creation, updating, and deletion of items without conflicting with other students.

Example: https://thinkful-list-api.herokuapp.com/Lili/items

Note: this is not a typical API pattern but avoids the complexities of user authentication for now.
**************************************************************************
**************************************************************************



GET /Lili/bookmarks
Provides array of all bookmark objects.

Example request/response:

**************************************************************************
GET
**************************************************************************
GET /Lili/bookmarks
Provides array of all bookmark objects.

Example request/response:

  GET https://thinkful-list-api.herokuapp.com/Lili/bookmarks

  HTTP STATUS 200 OK
  [
    {
      "id": "8sdfbvbs65sd",
      "title": "Google",
      "url": "http://google.com",
      "desc": "An indie search engine startup",
      "rating": 4
    },
    {
      "id": "87fn36vd9djd",
      "title": "Fluffiest Cats in the World",
      "url": "http://medium.com/bloggerx/fluffiest-cats-334",
      "desc": "The only list of fluffy cats online",
      "rating": 5
    }
  ]


**************************************************************************
POST
**************************************************************************

POST /Lili/bookmarks
Creates a new item. Requires a request body.

Key	Value
title	string, required Min 1 length
url	string, required Min 5 length. Include protocol (http/https).
desc	string, optional Min 1 length
rating	number, optional Between 1 and 5
Example request/response:

  POST https://thinkful-list-api.herokuapp.com/Lili/bookmarks
  REQ BODY: { "title": "Yahoo", "url": "http://yahoo.com" }

  HTTP STATUS 201 Created
  Location: https://thinkful-list-api.herokuapp.com/Lili/bookmarks/8sdfbvbs65sd
  {
    "id": "8sdfbvbs65sd",
    "title": "Yahoo",
    "url": "http://yahoo.com"
  }


**************************************************************************
PATCH
**************************************************************************


PATCH /Lili/bookmarks/:id
Updates item matching id with the fields provided. Requires a request body with at least one valid field.

Key	Value
title	string, optional Min 1 length
url	string, optional Min 5 length. Include protocol (http/https).
desc	string, optional Min 1 length
rating	number, optional Between 1 and 5
Example request/response:

  PATCH https://thinkful-list-api.herokuapp.com/Lili/bookmarks/8sdfbvbs65sd
  REQ BODY: { "rating": 2 }
    
  HTTP STATUS 200 OK
  {} (empty)


**************************************************************************
DELETE
**************************************************************************


DELETE /Lili/bookmarks/:id
Deletes item matching id parameter.

Example request/response:

  DELETE https://thinkful-list-api.herokuapp.com/Lili/bookmarks/8sdfbvbs65sd
    
  HTTP STATUS 200 OK
  {} (empty)
# **Gelato API**
## Flavours
***
### <span style="color:#0CBC52">**GET**</span> Get all flavours
`/api/v1/flavours`
#### Example response:
```json 
{
    "success": true,
    "count": 4,
    "results": [
        {
            "flavour_id": 1,
            "name": "Vanilla"
        },
        {
            "flavour_id": 2,
            "name": "Chocolate"
        },
        {
            "flavour_id": 3,
            "name": "Strawberry"
        },
        {
            "flavour_id": 4,
            "name": "Blueberry"
        }
    ]
}
```
### <span style="color:#FFB401;font-weight:bold">**POST**</span> Create flavour
`/api/v1/flavours`
#### Example request body (JSON):
```json
{
  "name": "Cherry"
}
```
#### Example response:
```json
{
    "success": true,
    "flavour": {
        "flavour_id": 5,
        "name": "Cherry"
    }
}
```
### <span style="color:#505050">**PATCH**</span> Update flavour
`/api/v1/flavours/:id`
#### Example request body (JSON):
```json
{
  "name": "Pecan"
}
```
#### Example response:
```json
{
    "success": true,
    "flavour": {
        "flavour_id": 5,
        "name": "Pecan"
    }
}
```
## Users
***
### <span style="color:#FFB401;font-weight:bold">**POST**</span> Create user
`/api/v1/users`
#### Example request body:
```json
{
  "name": "Kenta",
  "email": "kenta@spray.se"
}
```
#### Example response:
```json
{
    "success": true,
    "user": {
        "user_id": 4,
        "name": "Kenta",
        "email": "kenta@spray.se",
        "favorite_mix": null
    }
}
```
### <span style="color:#0CBC52">**GET**</span> Get all users
`/api/v1/users/`
#### Example response:
```json
{
    "success": true,
    "count": 4,
    "results": [
        {
            "user_id": 1,
            "name": "Falle",
            "email": "falle@yahoo.com",
            "favorite_mix": null
        },
        {
            "user_id": 2,
            "name": "Koffe",
            "email": "koffe@yahoo.com",
            "favorite_mix": null
        },
        {
            "user_id": 3,
            "name": "Olle",
            "email": "olle@yahoo.com",
            "favorite_mix": null
        },
        {
            "user_id": 4,
            "name": "Kenta",
            "email": "kenta@spray.se",
            "favorite_mix": null
        }
    ]
}
```
### <span style="color:#0CBC52">**GET**</span> Get single user
`/api/v1/users/:id`
#### Example response:
```json
{
    "success": true,
    "result": {
        "user_id": 2,
        "name": "Koffe",
        "email": "koffe@yahoo.com",
        "favorite_mix": null
    }
}
```
### <span style="color:#505050">**PATCH**</span> Cast vote
`/api/v1/users/:user_id/mixes/:mix_id`
#### Example request body (JSON):
```json
{
    "email": "koffe@yahoo.com"
}
```
#### Example response:
```json
{
  "success": true,
  "message": "User with id 2 cast their vote on mix with id 4"
}
```
## Mixes
***
### <span style="color:#0CBC52">**GET**</span> Get all mixes
`/api/v1/mixes`
#### Example response:
```json
{
  "success": true,
  "count": 2,
  "results": [
    {
      "id": 1,
      "name": "Falles special",
      "flavours": [
        "Chocolate",
        "Blueberry",
        "Fudge"
      ],
      "creator": {
        "id": 1,
        "name": "Falle"
      }
    },
    {
      "id": 2,
      "name": "Kentas choklad special",
      "flavours": [
        "Chocolate",
        "Chocolate Chip Cookie",
        "Oreo"
      ],
      "creator": {
        "id": 4,
        "name": "Kenta"
      }
}
```
### <span style="color:#0CBC52">**GET**</span> Get votes for all mixes
`/api/v1/mixes/votes`
#### Example response:
```json
{
  "success": true,
  "message": "Only showing mixes with at least 1 vote",
  "count": 2,
  "results": [
    {
      "name": "Falles special",
      "votes": 3
    },
    {
      "name": "Kentas choklad special",
      "votes": 2
    }
  ]
}
```
### <span style="color:#0CBC52">**GET**</span> Get votes for single mix
`/api/v1/mixes/:id/votes`
#### Example response:
```json
{
  "success": true,
  "votes": 2
}
```
### <span style="color:#FFB401;font-weight:bold">**POST**</span> Create empty mix
`/api/v1/mixes/users/:id`
#### Example request (JSON)
```json
{
  "name": "Kentas bärbonanza"
}
```
#### Example response:
```json
{
    "success": true,
    "mix": {
        "name": "Kentas bärbonanza",
        "id": 5
    },
    "creator": {
        "name": "Kenta",
        "id": 4
    }
}
```

### <span style="color:#087BED;font-weight:bold">**PUT**</span> Add flavour to mix
`/api/v1/mixes/:mix_id/flavours/:flavour_id`
#### Example response:
```json
{
    "success": true,
    "mix": {
        "id": "1",
        "name": "Falles första mix"
    },
    "flavour": {
        "id": "4",
        "name": "Blueberry"
    }
}
```
### <span style="color:#EC2013;font-weight:bold">**DELETE**</span> Remove flavour from mix
`/api/v1/mixes/:mix_id/flavours/:flavour_id`
#### Example response:
```json
{
    "success": true,
    "message": "Removed flavour Chocolate from mix Koffes special"
}
```
### <span style="color:#EC2013;font-weight:bold">**DELETE**</span> Delete mix
`/api/v1/mixes/:id`
#### Example response:
```json
{
  "success": true,
  "message": "Mix with id 3 deleted"
}
```
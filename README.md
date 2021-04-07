# **Gelato API**
## Flavours
***
### <span style="color:#0CBC52">**GET**</span> Get all flavours
`/api/v1/flavours`
#### Example response:
```json 
{
  "success": true,
  "count": 13,
  "data": [
    {
      "name": "Vanilla",
      "id": 1
    },
    {
      "name": "Chocolate",
      "id": 2
    },
    {
      "name": "Strawberry",
      "id": 3
    }
  ]
}
```
### <span style="color:#FFB401;font-weight:bold">**POST**</span> Create flavour
`/api/v1/flavours`
#### Example request body (JSON):
```json
{
  "name": "Banana"
}
```
#### Example response:
```json
{
  "success": true,
  "flavour": {
    "name": "Raspberry",
    "id": 4
  }
}
```
### <span style="color:#505050">**PATCH**</span> Update flavour
`/api/v1/flavours/:id`
#### Example request body (JSON):
```json
{
  "name": "Blueberry"
}
```
#### Example response:
```json
{
  "success": true,
  "flavour": {
    "name": "Blueberry",
    "id": "4"
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
  "name": "Jonte",
  "email": "jonte@yahoo.com"
}
```
#### Example response:
```json
{
  "success": true,
  "user": {
    "name": "Jonte",
    "email": "jonte@yahoo.com",
    "id": 3
  }
}
```
### <span style="color:#0CBC52">**GET**</span> Get all users
`/api/v1/users/`
#### Example response:
```json
{
  "success": true,
  "count": 3,
  "data": [
    {
      "id": 1,
      "name": "Kenta",
      "email": "kenta@hotmail.com",
      "favoriteMix": 2
    },
    {
      "id": 2,
      "name": "Falle",
      "email": "falle@gmail.com",
      "favoriteMix": 4
    },
    {
      "id": 3,
      "name": "Jonte",
      "email": "jonte@yahoo.com",
      "favoriteMix": null
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
  "data": {
    "id": 2,
    "name": "Falle",
    "email": "falle@gmail.com",
    "favoriteMix": 4
  }
}
```
### <span style="color:#505050">**PATCH**</span> Cast vote
`/api/v1/users/:user_id/mixes/:mix_id`
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
        "id": 2,
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
        "id": 1,
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
  "name": "Jontes 115:e mix"
}
```
#### Example response:
```json
{
  "success": true,
  "mix": {
    "name": "Jontes 115:e mix",
    "id": 3
  },
  "creator": {
    "id": 3,
    "name": "Jonte"
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
    "id": "3",
    "name": "Jontes 115:e mix"
  },
  "flavour": {
    "id": "2",
    "name": "Chocolate"
  }
}
```
### <span style="color:#EC2013;font-weight:bold">**DELETE**</span> Remove flavour from mix
`/api/v1/mixes/:mix_id/flavours/:flavour_id`
#### Example response:
```json
{
  "success": true,
  "message": "Removed flavour Chocolate from mix Jontes 115:e mix"
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
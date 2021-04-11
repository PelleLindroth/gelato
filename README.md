# **Gelato API**
## Flavours
***
### Get all flavours
### <span style="color:#0CBC52">**GET**</span> `/api/v1/flavours`
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
### Create flavour
### <span style="color:#FFB401;font-weight:bold">**POST**</span> `/api/v1/flavours`
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
### Update flavour
### <span style="color:#505050">**PATCH**</span> `/api/v1/flavours/:id`
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
### Create user
### <span style="color:#FFB401;font-weight:bold">**POST**</span> `/api/v1/users`
#### Example request body:
```json
{
    "name": "Monica",
    "email": "månkan87@hotmail.com"
}
```
#### Example response:
```json
{
    "success": true,
    "user": {
        "user_id": 11,
        "name": "Monica",
        "email": "månkan87@hotmail.com",
        "favorite_mix": null,
        "role": "customer"
    }
}
```
### Get all users
### <span style="color:#0CBC52">**GET**</span> `/api/v1/users/`
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
### Get single user
### <span style="color:#0CBC52">**GET**</span> `/api/v1/users/:id`
#### Example response:
```json
{
    "success": true,
    "user": {
        "user_id": 5,
        "name": "Jonte",
        "email": "jonte87@gmail.com",
        "favorite_mix": 13,
        "role": "customer"
    }
}
```
### Cast vote
### <span style="color:#505050">**PATCH**</span> `/api/v1/users/:user_id/mixes/:mix_id`
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
### Get all mixes
### <span style="color:#0CBC52">**GET**</span> `/api/v1/mixes`
#### Example response:
```json
{
    "success": true,
    "count": 2,
    "results": [
        {
            "mix_id": 1,
            "name": "Falles första mix",
            "creator": {
                "user_id": 1,
                "name": "Falle"
            },
            "flavours": [
            {
                "flavour_id": 2,
                "name": "Chocolate"
            },
            {
                "flavour_id": 4,
                "name": "Blueberry"
            }
            ],
            "votes": 2
        },
        {
            "mix_id": 13,
            "name": "Koffes testmix",
            "creator": {
                "user_id": 2,
                "name": "Koffe"
            },
            "flavours": [
                {
                    "flavour_id": 4,
                    "name": "Blueberry"
                },
                {
                    "flavour_id": 8,
                    "name": "Pecan"
                }
            ],
            "votes": 2
        }
    ]
}
```
### Create empty mix
### <span style="color:#FFB401;font-weight:bold">**POST**</span> `/api/v1/mixes/users/:id`
#### Example request body (JSON)
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
### Add flavour to mix
### <span style="color:#087BED;font-weight:bold">**PUT**</span> `/api/v1/mixes/:mix_id/users/:user_id/flavours/:flavour_id`
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
Remove flavour from mix
### <span style="color:#EC2013;font-weight:bold">**DELETE**</span> `/api/v1/mixes/:mix_id/users/:user_id/flavours/:flavour_id`
#### Example response:
```json
{
    "success": true,
    "message": "Removed flavour Chocolate from mix Koffes special"
}
```
Delete mix
### <span style="color:#EC2013;font-weight:bold">**DELETE**</span> `/api/v1/mixes/:mix_id/users/:user_id`
#### Example response:
```json
{
  "success": true,
  "message": "Mix with id 3 deleted"
}
```
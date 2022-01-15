# Flipr Internship Coding round Task

## Description

> Added custom header `Name`, `Contact`

Endpoints:

```
BASE URL : https://hrishikesh-flipr-task.herokuapp.com
```

1. post point for getting latest 30 devices' latest 50 location

```http
POST /api/latest_locations
```

**response in format**

```json
{
    "device_id_1" : [...],
    "device_id_2" : [...],
    ...
}
```

2. post point for getting coordinates of posted array of addresses using google geocoding api

```http
POST /api/get_coordinates/
```

**response in format**

```json
[
    {
        "add": "address_1",
        "location" : [0.2, 21.3]
    },
    ...
]
```

## Note

**`.env`** file is present in this root dir which is not pushed as it contain google api key.
But following is the content of `.env` file:

```json
PORT=5000
GOOGLE_GEOCODE_API_KEY=
```

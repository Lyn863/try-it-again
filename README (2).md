{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "static"
  },
  "deploy": {
    "startCommand": "npx http-server -p $PORT -c-1"
  },
  "env": {
    "PORT": {
      "type": "number",
      "default": 3000,
      "description": "端口号"
    }
  },
  "domains": [
    {
      "domain": "personality-test",
      "region": "us-west1"
    }
  ]
}
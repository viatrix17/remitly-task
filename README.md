# Stock-market API

A scalable stock management application designed as an internship task (2026) for Remitly with High Availability and fault tolerance in mind.

## Features
- **High Availability**: load balancing between multiple app instances
- **Persistence**: data is stored in PostgresSQL database with volume support
- **Self-Healing**: automated container recovery policy via Docker
- **Idempotency**: utilizes SQL `UPSERT` operations to ensure data consistency across multiple identical requests

## Requirements
- Docker
- Docker Compose

## Run
The application is fully containerized. You can run it using a single command by defining the external `APP_PORT`:
- CLI (Bash):`APP_PORT=XXXX npm run docker:start`
- PowerShell:`$env:APP_PORT=XXXX; npm run docker:start`
- CMD:`set APP_PORT=XXXX && npm run docker:start`
where `XXXX` is the desired port number.
Once started, the API will accessible at `http://localhost:XXXX`

## Endpoints

`POST /wallets/{wallet_id}/stocks/{stock_name}`- simulates a buy or sell situation
`GET /wallets/{wallet_id}`- retrieves contents of a specific wallet
`GET /wallets/{wallet_id}/stocks/{stock_name}`- retrieves the quantity of a specific stock in a wallet
`GET /stocks`- retrieves the current state of the Bank
`POST /stocks`- updates/sets the state of the Bank
`GET /log`- fetches the system operation logs
`POST /chaos`- kills the instance serving this request

## Architecture

- Nginx: Load Balancer (listens on `APP_PORT`, forwards to port 80 internally)
- Node.js (Express): two application replicas (`app-1` and `app-2`) running on port 3000
- PostgresSQL: centralized database (port 5432) 


## Environment variables
The application uses the following variables (configured via docker-compose.yml and .env):

**Application configuration**:
- `APP_PORT`: The host port on which the Nginx Load Balancer will be accessible (e.g., 8080, 9000)

**Database connectivity**:
- `DB_HOST`: The hostname used by the app to connect to the database (set to db in Docker)
- `DB_NAME`: The name of the PostgreSQL database (default: stock_market)
- `DB_USER`: The username for database authentication (default: postgres)
- `DB_PASSWORD`: The password for the database user
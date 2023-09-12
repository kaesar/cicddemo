# CI-CD Demo

---

## About the example

Think that you have devices or drones that are capable of carrying and delivering things (payload). For this use case, a basic model has the following...

- serial number (100 characters max);
- model (Lightweight, Middleweight, Cruiserweight, Heavyweight);
- weight limit (500gr max);
- battery capacity (percentage);
- state (IDLE by default, then LOADED).
- payload (object, without specification by the moment)

The service, via REST API, allows clients to communicate with the devices. The specific communicaiton is outside the scope. 

> With this exercise I want to include CI/CD capabilities with Docker, Terraform & AWS App Runner. 

---

## Getting Started

### Project Folder

```
democicd/
├── __tests__/
├── iac/
├── dist/
│   └── index.js
├── data/
│   └── database.json
├── src/
│   ├── adapter/
│   │   └── dbAccess.ts
│   ├── handler/
│   │   └── droneHandler.ts
│   ├── models/
│   │   ├── models.ts
│   ├── routes/
│   │   └── apiRoutes.ts
│   └── index.ts
└── package.json
```

### Build the Bundle

To bundle just use a shell and execute from the folder...

```bash
npm run build
```

### Check the Tests

To tests just use a shell and execute from the folder...

```bash
npm test
```

> Insted of this, you can use: `jest --coverage --coverageReporters="json-summary"`

### Launch the Service

To launch just use a shell and execute from the folder...

```bash
npm start
```

> Instead of this, you can use: `node dist/index.js`

### Main API's end-points

Method | Path
------ | --
GET    | /drones
POST   | /drones
DELETE | /drones/:id
GET    | /drones/:id
GET    | /drones/idle

---

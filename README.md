# Drones

[[_TOC_]]

---

:scroll: **START**

## About the example

We have devices or drones that are capable of carrying things, and capable of delivering small loads (payload). For our use case the model has...

- serial number (100 characters max);
- model (Lightweight, Middleweight, Cruiserweight, Heavyweight);
- weight limit (500gr max);
- battery capacity (percentage);
- state (IDLE by default, then LOADED).
- payload (object, without specification by the moment)

The service, via REST API, allows clients to communicate with the devices. The specific communicaiton is outside the scope. 

> With this exercise is included CI/CD capabilities with Terraform + AWS. 

---

## Getting Started

### Project Folder

```
democicd/
├── __tests__/
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

:scroll: **END** 

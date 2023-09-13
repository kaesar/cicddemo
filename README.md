# Demostración CI-CD

---

## Sobre el ejemplo

Piensa que tienes dispositivos o drones que son capaces de transportar y entregar cosas (carga útil). El servicio, el cual se encuentra escrito en Typescript bajo Node.js/Express y pruebas con Jest, permitiría a los clientes comunicarse con los dispositivos. La comunicación específica está fuera del ámbito. 

> Con este ejercicio quiero incluir capacidades de CI/CD con Docker, Terraform & AWS App Runner. 

---

## Getting Started

### Carpeta del Proyecto

```
democicd/
├── __tests__/
├── iac/
├── dist/
│   └── index.js
├── data/
│   └── database.json
├── src/
│ ├── adaptador/
│ │   └── dbAccess.ts
│ ├── handler/
│ │   └── droneHandler.ts
│ ├── modelos/
│ │   └── models.ts
│ ├── rutas/
│ │   └── apiRoutes.ts
│ └── index.ts
└── package.json
```

### Build

Para hacer el bundle basta con usar un shell y ejecutar desde la carpeta....

```bash
npm run build
```

### Comprobar las pruebas

Para las pruebas simplemente usa una shell y ejecuta desde la carpeta...

```bash
npm test
```

> En lugar de esto, puedes usar: `jest --coverage --coverageReporters="json-summary"`

### Lanzar el Servicio

Para lanzarlo simplemente usa un shell y ejecútalo desde la carpeta...

```bash
npm start
```

> En lugar de esto, puedes usar `node dist/index.js`

### API's end-points

Metodo | Ruta
------ | --
GET    | /drones
POST   | /drones
DELETE | /drones/:id
GET    | /drones/:id
GET    | /drones/idle

Para este caso de uso, un modelo de datos básico tiene lo siguiente...

- **serialNumber**: número de serie (64 caracteres máximo).
- **model**: modelo.
- **weightLimit**: límite de peso (500gr máx).
- **batteryCapacity**: capacidad de la batería (porcentaje)
- **state**: estado (IDLE por defecto, luego LOADED).
- **payload**: Carga útil (objeto, sin especificar por el momento).

---

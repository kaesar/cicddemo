# Demostración CI-CD

**GitHub (Repo) ~ Docker (Container) ~ Jenkins (Pipeline) ~ Terraform (IaC) ~ AWS App Runner (Serverless Containers - Cloud)**

---

## Sobre el ejemplo

Piensa que tienes dispositivos o drones que son capaces de transportar y entregar cosas (carga útil). El servicio, el cual se encuentra escrito en Typescript bajo Node.js/Express y pruebas con Jest, permitiría a los clientes comunicarse con los dispositivos. La comunicación específica está fuera del alcance. 

> Con este ejercicio se busca incluir capacidades de CI/CD usando GitHub (Repo), Docker (Container), Jenkins (Pipeline), Terraform (IaC) & AWS App Runner (Serverless Containers - Cloud).

---

## Getting Started

### Carpeta del Proyecto

```
democicd/
├── __tests__/
├── dist/
│   └── index.js
├── data/
│   └── database.json
├── iac/
│   └── main.tf
├── pipe/
│   └── Jenkinsfile
├── src/
│   ├── adaptador/
│   │   └── dbAccess.ts
│   ├── handler/
│   │   └── droneHandler.ts
│   ├── modelos/
│   │   └── models.ts
│   ├── rutas/
│   │   └── apiRoutes.ts
│   └── index.ts
├── Dockerfile
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
GET    | /api/drones
POST   | /api/drones
DELETE | /api/drones/:id
GET    | /api/drones/:id
GET    | /api/drones/idle
GET    | /health

Para este caso de uso, un modelo de datos básico tiene lo siguiente...

- **serialNumber**: número de serie (64 caracteres máximo).
- **model**: modelo.
- **weightLimit**: límite de peso (500gr máx).
- **batteryCapacity**: capacidad de la batería (porcentaje)
- **state**: estado (IDLE por defecto, luego LOADED).
- **payload**: Carga útil (objeto, sin especificar por el momento).

Ejemplo de datos para POST:

```json
{
    "serialNumber": "d20",
    "model": "Middleweight",
    "weightLimit": 350,
    "batteryCapacity": 20
}
```

---
<!--
## Algunos comandos Docker y otros

A continuación se presentan ejemplos de algunos comandos con Docker y otros para validar en tu máquina, asumiendo que tienes instalado Docker bajo WSL (Windows Subsystem for Linux) o Colima (macOS/Linux, iniciando con: `colima sart`) y te encuentras ubicado dentro de la carpeta del proyecto...

```bash
git clone https://github.com/kaesar/cicddemo.git

npm run build

node dist/index.js

docker ps

docker build -t cicddemo:v1 .

docker run -d -p 3000:3000 --name cicddemo cicddemo:v1

docker logs cicddemo

docker exec -it cicddemo /bin/sh

docker stop cicddemo

aws iam create-user --user-name cicd-user

aws iam create-access-key --user-name cicd-user

aws iam attach-user-policy --user-name cicd-user --policy-arn arn:aws:iam::aws:policy/AmazonS3FullAccess

aws iam attach-user-policy --user-name cicd-user --policy-arn arn:aws:iam::aws:policy/AWSAppRunnerFullAccess

aws iam attach-user-policy --user-name cicd-user --policy-arn arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryPowerUser

aws iam attach-user-policy --user-name cicd-user --policy-arn arn:aws:iam::aws:policy/AdministratorAccess

aws iam list-users

aws iam list-groups-for-user --user cicd-user

aws ecr create-repository --repository-name cicd-hub --region us-east-1

aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 117979987706.dkr.ecr.us-east-1.amazonaws.com

docker tag cicddemo:v1 117979987706.dkr.ecr.us-east-1.amazonaws.com/cicd-hub:v1

docker push 117979987706.dkr.ecr.us-east-1.amazonaws.com/cicd-hub:v1

aws s3api create-bucket --bucket tfstate-demo-2023 -region us-east-1

cd iac

terraform init

terraform validate

terraform plan -out=tfplan

terraform apply "tfplan" -auto-approve

terraform destroy
```
-->

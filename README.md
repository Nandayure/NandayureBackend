# 🏛️ NandayureBackend

## 📝 Descripción

**NandayureBackend** es un sistema backend desarrollado con **NestJS** para brindar soporte a los procesos administrativos de la Municipalidad de Nandayure. Este backend expone una API REST que permite gestionar eficientemente los recursos humanos del municipio y automatizar tareas clave de la institución.

El sistema está orientado principalmente al área de **Recursos Humanos**, pero también contempla funcionalidades transversales que involucran documentación oficial, análisis de datos y comunicaciones internas.

### Funcionalidades principales

#### 👥 Gestión de personal
- Administración de **departamentos** y sus respectivos empleados.
- Gestión de **empleados**, incluyendo datos personales, historial laboral, y contacto.
- Registro y control de **posiciones laborales**.
- Administración de los **estudios académicos** de cada empleado.
- Creación y administración de **usuarios del sistema**.

#### 📆 Procesos administrativos
- Solicitud, revisión y aprobación de **vacaciones**.
- Generación automatizada de **constancias laborales**.
- Emisión de **certificados de pago**.

#### 🗂️ Gestión documental y digitalización
- Integración con la **API de Google Drive** para:
  - Creación automática de carpetas por empleado o departamento.
  - Carga y almacenamiento seguro de documentos institucionales.
  - Organización centralizada de archivos digitales.

#### 📩 Comunicaciones internas
- Envío automatizado de **correos electrónicos** para notificaciones del sistema, como aprobaciones o alertas de solicitud.

#### 📊 Analítica y entidades externas
- Visualización de **analíticas del sistema** para evaluación y monitoreo.
- Registro y administración de **instituciones financieras** asociadas.

---

## 🚀 Tecnologías utilizadas

### 🧱 Backend y lenguaje
- **[NestJS](https://nestjs.com/)** – Framework progresivo de Node.js.
- **[Node.js](https://nodejs.org/)** – Entorno de ejecución para JavaScript.
- **[TypeScript](https://www.typescriptlang.org/)** – Lenguaje con tipado estático.

### 🗃️ Base de datos
- **[MySQL](https://www.mysql.com/)** – Sistema de base de datos relacional.
- **[TypeORM](https://typeorm.io/)** – ORM para manejo de entidades.
- **[typeorm-extension](https://www.npmjs.com/package/typeorm-extension)** – Utilidades para creación y seeding de base de datos.

### 📧 Correos electrónicos
- **[@nestjs-modules/mailer](https://github.com/nest-modules/mailer)** – Módulo NestJS para envío de correos.
- **[Nodemailer](https://nodemailer.com/)** – Motor de envío subyacente.
- **[dotenv](https://www.npmjs.com/package/dotenv)** – Carga variables desde `.env`.

### ☁️ Google Drive y archivos
- **[googleapis](https://www.npmjs.com/package/googleapis)** – SDK oficial de Google.
- **[@google-cloud/local-auth](https://www.npmjs.com/package/@google-cloud/local-auth)** – Autenticación local.
- **[nestjs-googledrive-upload](https://www.npmjs.com/package/nestjs-googledrive-upload)** – Carga de archivos a Drive.

### 🔧 Utilidades
- **[bcrypt](https://www.npmjs.com/package/bcrypt)** – Encriptación de contraseñas.
- **[uuid](https://www.npmjs.com/package/uuid)** – Identificadores únicos.
- **[class-validator](https://www.npmjs.com/package/class-validator)** – Validación de DTOs.
- **[class-transformer](https://www.npmjs.com/package/class-transformer)** – Transformación de objetos.
- **[cache-manager](https://www.npmjs.com/package/cache-manager)** – Manejo de caché.
- **[cors](https://www.npmjs.com/package/cors)** – Permitir solicitudes entre dominios.

### 🧪 Testing y calidad
- **[Jest](https://jestjs.io/)** – Pruebas unitarias.
- **[Supertest](https://www.npmjs.com/package/supertest)** – Pruebas e2e.
- **[ESLint](https://eslint.org/)** y **[Prettier](https://prettier.io/)** – Linter y formateador.

---

## ▶️ Manual para ejecutar el backend

### 1. 📥 Clonar el repositorio y instalar librerías

```bash
git clone https://github.com/tu-usuario/nandayure-backend.git
cd nandayure-backend
npm install
```

## ⚙️ Configuración del entorno

### 1. 📂 Archivo `.env`

Crear un archivo `.env` en la raíz del proyecto y completar con lo siguiente:

```env
# Puerto en el que se ejecuta el servidor (por defecto: 8000)
PORT=8000

# ⚙️ Configuración de la base de datos (modo local)
DB_HOST=localhost                  # Dirección del servidor de la base de datos
DB_PORT=3306                       # Puerto de conexión (3306 para MySQL)
DB_USERNAME=tu_usuario_mysql       # Usuario de la base de datos
DB_PASSWORD=tu_contraseña_mysql    # Contraseña del usuario
DB_NAME=nombre_base_datos_local    # Nombre de la base de datos local

# ☁️ Conexión a base de datos en Railway (modo producción)
MYSQL_PUBLIC_URL=mysql://usuario:contraseña@host:puerto/base_de_datos

# 🔐 Clave secreta para JWT
JWT_SECRET=una_clave_secreta_segura_para_firmar_tokens

# 🌐 URLs del frontend
FrontEndBaseURL=http://localhost:3000/                  # Dirección raíz del frontend
FrontEndLoginURL=http://localhost:3000/auth/login       # Ruta de pantalla de inicio de sesión
ResetPasswordURL=http://localhost:3000/auth/reset-password # Ruta de restablecimiento de contraseña

# 📧 Configuración SMTP para envío de correos
EMAIL_HOST=host_smtp               # Ej: sandbox.smtp.mailtrap.io
EMAIL_USERNAME=usuario_smtp
EMAIL_PASSWORD=contraseña_smtp

# ☁️ Google Drive API
MUNICIPALITY_FOLDER_ID=id_de_la_carpeta_en_drive
GOOGLE_PROJECT_ID=id_del_proyecto_google_cloud
GOOGLE_CLIENT_EMAIL=cuenta_de_servicio_google@example.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...clave privada...\n-----END PRIVATE KEY-----\n"
```
> 🔁 **Notas importantes:**
>
> - Las **URLs del frontend** (`FrontEndBaseURL`, `FrontEndLoginURL`, `ResetPasswordURL`) deben coincidir con las rutas definidas en el frontend.  
>   En entorno de producción, recordá actualizar estas URLs al dominio real de la aplicación.
>
> - Para **desarrollo**, se recomienda usar [Mailtrap](https://mailtrap.io/) como servicio SMTP para evitar el envío de correos reales.
>
> - En **producción**, es recomendable usar un proveedor real como **Gmail** (usando App Passwords o OAuth2) o **Google Workspace** para asegurar la entrega de correos.
>
> - Asegurate de que la clave privada (`GOOGLE_PRIVATE_KEY`) mantenga los saltos de línea con `\n` escapados, como en el ejemplo, para evitar errores de autenticación.
> - 
> 🧠 **Nota importante sobre cuentas de Google:**
>
> Para el correcto funcionamiento del sistema, se recomienda crear una cuenta de Google exclusiva del proyecto institucional (ej. `sistemarrhh.nandayure@gmail.com`).  
> Esta cuenta será utilizada para:
>
> - Enviar correos electrónicos mediante SMTP (por ejemplo, con Gmail y App Passwords).
> - Configurar y acceder a la **API de Google Drive** a través de una **cuenta de servicio** vinculada.




## 🔧 Configuración de servicios externos

### 📬 Envío de correos

#### ➤ Opción 1: Configurar Mailtrap (recomendado para desarrollo)

1. Crear una cuenta en [Mailtrap.io](https://mailtrap.io/).
2. Iniciar sesión y crear un nuevo inbox.
<br>
<img width="933" alt="ASDF" src="https://github.com/user-attachments/assets/91b0f693-fac9-48df-8707-6bffc4352e98" />
<br>
3. Elegir el inbox creado.
4. Elegir la integración con **SMTP** y copiar:
   - `EMAIL_HOST`
   - `EMAIL_USERNAME`
   - `EMAIL_PASSWORD`
5. Agregar estos valores al archivo `.env`.

📷 Nuevo inbox:
<br>
<img width="500" alt="mailtrapHome" src="https://github.com/user-attachments/assets/5cb813af-df06-46f7-b87f-fa5979cddb54" />
<br>

📷 Ejemplo de configuración SMTP en Mailtrap:
<br>
<img width="500" alt="mailtrapCredential" src="https://github.com/user-attachments/assets/9c7664a8-6df3-4be9-ba3a-13f440b9cd29" />
<br>

### ➤ Opción 2: Configurar un proveedor real (producción)

#### Ejemplo: Usar Gmail con App Passwords

1. Ir a [https://myaccount.google.com/security](https://myaccount.google.com/security).
2. Activar la **verificación en dos pasos** en tu cuenta de Gmail.
<img width="500" alt="2stepVerifiction" src="https://github.com/user-attachments/assets/0a3a4fa5-6e05-4f7b-b70b-36b30a1f3278" />
<br>
3. Crear una nueva contraseña de aplicación en la sección **"Contraseñas de aplicaciones"**.
<br>
<img width="500" alt="2" src="https://github.com/user-attachments/assets/b609d183-062f-4ca8-aacd-e3dd4ea68547" />
<br>
4. Crea un nombre.
<br>
<img width="500" alt="3" src="https://github.com/user-attachments/assets/18aa7aff-0a54-4e2f-8722-d9b2a348b91f" />
<br>
5. Copia la codigo generado (lo vas a usar en las variables de entorno del proyecto).
<br>
<img width="500" alt="4" src="https://github.com/user-attachments/assets/de518b7f-14e2-4a61-80fc-6c200e028f73" />
<br>
6. Agregar los siguientes valores al archivo `.env`:

```env
EMAIL_HOST=smtp.gmail.com
EMAIL_USERNAME=tuemail@gmail.com
EMAIL_PASSWORD=contraseña_de_aplicación
```

## ☁️ Integración con Google Drive

El sistema está integrado con la **API de Google Drive** para gestionar archivos institucionales de forma segura y organizada. Permite:

- Crear carpetas automáticamente por **empleado**.
- Subir documentos desde el sistema a Drive.
- Consultar los archivos de cada empleado.

### ➤ ¿Cómo se conecta?

Utiliza una **cuenta de servicio de Google Cloud** que actúa como un robot con acceso autorizado a una carpeta principal de Drive.

---

### ✅ Pasos para configurar la API de Google Drive

1. Iniciar sesión en [Google Cloud Console](https://console.cloud.google.com/).
<br>
<img width="500" alt="1" src="https://github.com/user-attachments/assets/4cc5130b-f482-4539-9922-83314f231bc1" />
<br>
2. Crear un nuevo proyecto (si aún no existe).
<br>
<img width="500" alt="2" src="https://github.com/user-attachments/assets/0ed7dca3-5d19-42f4-ab43-104047f66c00" />
<br>
3. Habilitar la API de Google Drive.
<br>
<img width="500" alt="3" src="https://github.com/user-attachments/assets/af3a662a-63b6-4147-a3c3-16d92d355c0b" />
<br>
<img width="500" alt="5" src="https://github.com/user-attachments/assets/23ede099-71f4-46a9-a7cd-71875b9e6b8f" />
<br>
<br>
<img width="500" alt="4" src="https://github.com/user-attachments/assets/1754bfc1-81bd-4f1c-becf-22e670d0ed0a" />
<br>
4. Crear una **cuenta de servicio** desde la sección "Credentials" → "Cuentas de servicio" llenando el formulario.
<br>
<img width="500" alt="6" src="https://github.com/user-attachments/assets/2caca2c2-39cc-4de3-9c82-f4fd524c472a" />
<br>
<img width="500" alt="crearCuenta de servicio" src="https://github.com/user-attachments/assets/8cdecd75-6974-47ad-be9c-deeecdc3c76a" />
<br>
Formulario:
<br>
<img width="500" alt="creandoCuenta" src="https://github.com/user-attachments/assets/30a5726f-4c49-432c-87ec-04a895ba4094" />
<br>
5. Generar una **clave privada en formato JSON**.
<br>
<img width="500" alt="aaaa" src="https://github.com/user-attachments/assets/a120be6a-000a-40e7-8c4a-63ac1c833bc9" />
<br>
<img width="500" alt="7" src="https://github.com/user-attachments/assets/0206022d-3188-4ad8-af17-7326d7900fd3" />
<br>
<img width="500" alt="8" src="https://github.com/user-attachments/assets/ff85e03b-9d78-4857-adcd-d67e4b0468f9" />
<br>
<img width="500" alt="9" src="https://github.com/user-attachments/assets/27d8d1c6-5c55-4981-aa94-f2b0c0f24e7b" />
<br>
<img width="500" alt="10" src="https://github.com/user-attachments/assets/1b904928-b750-41dd-8877-00898094a122" />

<br>
6. En el archivo `.env`, completar los siguientes valores con la informacion del JSON guardado:

```env
# ☁️ Google Drive API
GOOGLE_PROJECT_ID=ID_del_proyecto_en_Google_Cloud
GOOGLE_CLIENT_EMAIL=correo_de_la_cuenta_de_servicio@project-id.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...clave privada...\n-----END PRIVATE KEY-----\n"
```
### 📁 Compartir acceso a la carpeta de Drive

Es fundamental que la carpeta principal de Drive (`MUNICIPALITY_FOLDER_ID`) esté compartida con la cuenta de servicio que conecta el backend con Google Drive.

#### ➤ Pasos para configurar correctamente el acceso:

1. Ingresar a Google Drive con la cuenta de google creada para el proyecto.
<br>
<img width="500" alt="teeest" src="https://github.com/user-attachments/assets/a35179d6-6de9-4ecc-90f2-8a7a8801b2f8" />
<br>
2. Crear una carpeta raíz que servirá como contenedor principal de toda la documentación del municipio.
<br>
<img width="500" alt="crearCarpeta" src="https://github.com/user-attachments/assets/20286cfe-e198-4b08-b0ef-0f95d687abc6" />
<br>
3. Entrar dentro de la carpeta creada y copiar su **ID desde la URL**. Este valor será el que se coloca en la variable `MUNICIPALITY_FOLDER_ID` del archivo `.env`.

   **Ejemplo de URL:** https://drive.google.com/drive/u/3/folders/1n5yRIbHad04XUx3qh2ZrSIaDkeaXhHBN

El ID de la carpeta es: `1n5yRIbHad04XUx3qh2ZrSIaDkeaXhHBN`
<br>

<img width="500" alt="compartiendo" src="https://github.com/user-attachments/assets/41700c35-9e54-40c7-a4ae-b369915b593a"/>

<br>
4. Volver a Google Drive, hacer clic derecho sobre la carpeta raíz → **"Compartir"**.
<br>
<img width="500" alt="compartiendo" src="https://github.com/user-attachments/assets/9c24ff74-67aa-45d2-a403-6b1c10f5c4db"/>

<br>
5. Pegar el correo de la cuenta de servicio (`GOOGLE_CLIENT_EMAIL`) y otorgarle **permiso de editor**.
<br>
<img width="500" alt="compartiendo" src="https://github.com/user-attachments/assets/6ff9bbc9-7f6b-4e4a-950d-f6db941d64dc" />
<br>

### 🧠 Recordatorio sobre la cuenta de Google

La misma cuenta institucional de Google que se utiliza para enviar correos electrónicos también puede ser utilizada para crear y administrar el proyecto en Google Cloud.

📌 Esto mejora la organización, facilita el mantenimiento y evita depender de cuentas personales.  
Se recomienda usar una cuenta como:

---

### 🧪 Librerías utilizadas para la integración

- `googleapis` – SDK oficial de Google para Node.js.
- `@google-cloud/local-auth` – Autenticación local con cuentas de servicio.
- `nestjs-googledrive-upload` – Utilidad para subir archivos a Drive fácilmente desde NestJS.

### ▶️ 7. Ejecutar el backend

Una vez configurado todo correctamente, iniciá el servidor con:

```bash
npm run start
```

El backend quedará escuchando en el puerto definido en tu archivo .env (por defecto el 8000):
http://localhost:8000

### ✅ Si estás en desarrollo, también podés usar:

```bash
npm run start:dev
```
**para que se reinicie automáticamente al guardar cambios.**

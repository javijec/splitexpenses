# Control de Gastos v2

Aplicación para gestionar gastos compartidos entre grupos de personas. Permite crear grupos, invitar miembros, registrar gastos y visualizar balances. Desarrollada con React y Material UI para una interfaz moderna y responsiva.

## Arquitectura del Proyecto

El sistema sigue el enfoque de **Clean Architecture Modular**, separando responsabilidades en capas bien definidas:

```
├── src/
│   ├── presentation/      # Capa de presentación (UI y componentes visuales)
│   │   ├── components/    # Componentes reutilizables
│   │   ├── screens/       # Páginas de la aplicación
│   │   ├── navigation/    # Configuración de rutas y navegación
│   │   └── theme/        # Configuración de estilos y temas
│   │
│   ├── application/      # Capa de lógica de aplicación
│   │   ├── contexts/     # Contextos globales de React
│   │   ├── hooks/        # Hooks personalizados
│   │   └── utils/        # Funciones auxiliares
│   │
│   ├── domain/           # Capa de dominio (Reglas de negocio)
│   │   ├── models/       # Definición de entidades y modelos de datos
│   │   ├── usecases/     # Casos de uso de la aplicación
│   │   └── repositories/ # Interfaces para acceder a los datos
│   │
│   ├── infrastructure/   # Capa de infraestructura
│   │   ├── api/          # Servicios de comunicación con APIs externas
│   │   ├── database/     # Configuración y acceso a Firestore
│   │   ├── services/     # Servicios concretos (autenticación, pagos, etc.)
│   │   ├── config/       # Configuraciones generales
│   │   └── adapters/     # Adaptadores para convertir datos entre capas
│   │
│   └── App.jsx           # Punto de entrada principal
│
└── firebase/             # Configuración y reglas de seguridad de Firebase
```

### Principios Claves:

- **Separación de responsabilidades**: Cada capa tiene su función específica.
- **Módulos reutilizables**: Facilita la escalabilidad y el mantenimiento.
- **Independencia de la infraestructura**: Permite cambiar Firebase por otra base de datos sin afectar la lógica de negocio.
- **Interfaz consistente**: Utiliza Material UI para mantener una experiencia de usuario coherente y moderna.

## CRUD en Firebase Firestore

Para gestionar los datos en Firestore, se deben seguir estas operaciones básicas:

### 📌 Crear un documento

```javascript
import { db } from "../infrastructure/config/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

async function addExpense(expense) {
  try {
    const docRef = await addDoc(collection(db, "expenses"), expense);
    console.log("Documento agregado con ID: ", docRef.id);
  } catch (e) {
    console.error("Error agregando documento: ", e);
  }
}
```

### 📌 Leer documentos

```javascript
import { db } from "../infrastructure/config/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

async function getExpenses() {
  const querySnapshot = await getDocs(collection(db, "expenses"));
  const expenses = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return expenses;
}
```

### 📌 Actualizar un documento

```javascript
import { db } from "../infrastructure/config/firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";

async function updateExpense(id, updatedData) {
  try {
    const docRef = doc(db, "expenses", id);
    await updateDoc(docRef, updatedData);
    console.log("Documento actualizado");
  } catch (e) {
    console.error("Error actualizando documento: ", e);
  }
}
```

### 📌 Eliminar un documento

```javascript
import { db } from "../infrastructure/config/firebaseConfig";
import { doc, deleteDoc } from "firebase/firestore";

async function deleteExpense(id) {
  try {
    await deleteDoc(doc(db, "expenses", id));
    console.log("Documento eliminado");
  } catch (e) {
    console.error("Error eliminando documento: ", e);
  }
}
```

## 🚀 Instalación y Ejecución

1. Clona el repositorio:
   ```sh
   git clone https://github.com/usuario/control-gastos.git
   cd control-gastos
   ```
2. Instala las dependencias:
   ```sh
   npm install
   ```
   El proyecto ya incluye Material UI como dependencia (versión 6.4.8).
3. Ejecuta el proyecto en modo desarrollo:
   ```sh
   npm run dev
   ```

## ⚙️ Configuración de Firebase

1. Crea un proyecto en Firebase.
2. Habilita Firestore y Authentication.
3. Descarga el archivo `firebaseConfig` desde Firebase y guárdalo en `src/infrastructure/config/firebaseConfig.js`.
4. Configura las reglas de seguridad en `firebase/firestore.rules`.

## 🚀 Despliegue

### **Vercel**

```sh
npm run build
vercel deploy
```

### **Firebase Hosting**

```sh
npm run build
firebase deploy
```

## 🔍 Debugging y Errores Comunes

- **Error de permisos en Firestore**: Verifica las reglas de seguridad en `firebase/firestore.rules`.
- **Problemas con la autenticación**: Asegúrate de haber habilitado el proveedor de autenticación en Firebase.
- **Dependencias que fallan en la instalación**: Ejecuta `npm audit fix` o reinstala con `rm -rf node_modules && npm install`.

## 📌 Guía de Estilo

Para mantener la consistencia del código, se siguen las siguientes convenciones:

- **Componentes React:** PascalCase (`Button.jsx`, `ErrorAlert.jsx`)
- **Archivos de utilidades y servicios:** camelCase (`auth.js`, `groups.js`)
- **Archivos de configuración:** kebab-case (`vite-config.js`)
- **Funciones:** Comenzar con un verbo (`getUser`, `createGroup`)
- **Constantes globales:** UPPER_SNAKE_CASE

Cada módulo de características sigue la estructura modular definida anteriormente. La documentación de cada componente debe incluir JSDoc y mantener una separación clara entre componentes de presentación y lógica.

## 🎨 Material UI

Este proyecto utiliza Material UI (versión 6.4.8) para la interfaz de usuario. A continuación, se muestran ejemplos básicos de uso:

### Importación de componentes

```javascript
import { Button, TextField, Typography, Box } from "@mui/material";
```

### Ejemplo de uso de componentes

```javascript
function LoginForm() {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Iniciar Sesión
      </Typography>
      <TextField label="Email" variant="outlined" fullWidth margin="normal" />
      <TextField
        label="Contraseña"
        type="password"
        variant="outlined"
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
        Ingresar
      </Button>
    </Box>
  );
}
```

### Personalización del tema

El tema de Material UI se configura en `src/presentation/theme/index.js`. Puedes personalizar colores, tipografía y otros aspectos de la interfaz modificando este archivo.

## Rutas Protegidas

Para proteger rutas en la aplicación, se utiliza el componente `ProtectedRoute`. Este componente verifica si el usuario está autenticado antes de permitir el acceso a la ruta. Si el usuario no está autenticado, se redirige a la página de inicio de sesión.

### Ejemplo de uso

```javascript
import ProtectedRoute from '@/presentation/navigation/ProtectedRoute';

<ProtectedRoute path="/home" component={Home} />
```

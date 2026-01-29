# 🎫 Sistema de Tickets

Sistema sencillo de gestión de tickets desarrollado como prueba técnica utilizando **Next.js**, **Redux Toolkit** y **RTK Query**, con persistencia en **localStorage** para simular una API.

---

## 📋 Descripción

La aplicación permite:

- Reportar un problema mediante un formulario.
- Visualizar y administrar los tickets creados.
- Paginar los resultados del listado.
- Eliminar y consultar el detalle de cada ticket.

---

## 🚀 Tecnologías

- Next.js
- React
- TypeScript
- Redux Toolkit
- RTK Query
- Material UI
- localStorage

---

## 🧠 Arquitectura

- **RTK Query** gestiona los datos y el caché.
- **Redux slices** manejan únicamente estado de UI (paginación, selección).
- **localStorage** simula la persistencia de datos.
- Paginación del lado del cliente mediante selectors.

---

## 🧩 Funcionalidades

- Crear tickets (asunto, prioridad, detalle, archivo).
- Listar tickets con paginación.
- Ver detalle del ticket.
- Eliminar tickets.
- Manejo de estados de carga y estado vacío.

---

## 🛠 Instalación

```bash
npm install
npm run dev
```

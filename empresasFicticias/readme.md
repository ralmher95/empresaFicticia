Descripción Funcional (Qué hace y Objetivos)

Este proyecto consiste en el desarrollo de una página web que trabaja con un archivo marcas.json, el cual contiene información sobre empresas ficticias provenientes de películas, series, cómics y videojuegos.

La aplicación permite:

📋 Mostrar dinámicamente un <select> con los nombres de las empresas.

🗂️ Generar dinámicamente un grupo de botones radio para filtrar por categoría.

🔎 Filtrar las empresas del <select> según la categoría seleccionada.

📖 Mostrar información detallada de la empresa seleccionada:

Descripción

Universo

Año de aparición

🎯 Objetivos del Examen

Separar correctamente:

Estructura → HTML5 semántico

Presentación → CSS

Comportamiento → JavaScript

Manipular datos en formato JSON.

Generar elementos HTML dinámicamente desde JavaScript.

Gestionar eventos (change) para actualizar contenido.

Aplicar principios básicos de accesibilidad.

Documentar el código explicando los procedimientos utilizados.

Este ejercicio evalúa tanto la funcionalidad como la comprensión interna de los métodos empleados en JavaScript.

2️⃣ Arquitectura y Stack (Tecnologías Usadas)
🧱 Tecnologías principales

HTML5 semántico

Uso de <header>, <main>, <section>, <form>, <label>, etc.

CSS

Separación completa de estilos respecto a la estructura.

JavaScript (Vanilla JS)

Manipulación del DOM

Gestión de eventos

Filtrado de datos

Archivo JSON externo (marcas.json)

Fuente de datos del proyecto

🔌 Conceptos técnicos aplicados

fetch() para cargar el archivo JSON.

Métodos modernos de arrays:

map() → para generar opciones dinámicamente.

filter() → para filtrar empresas por categoría.

forEach() → para recorrer estructuras.

Creación dinámica de elementos:

document.createElement()

appendChild()

Gestión de eventos con addEventListener().

Accesibilidad:

Uso correcto de <label for="">

Asociación de controles con id

Uso de aria-live para actualización dinámica

Estructura semántica clara

📌 Explicación técnica relevante

En lugar de utilizar bucles tradicionales como for, se emplearon métodos modernos como map() y filter().

Internamente:

map() recorre cada elemento del array ejecutando una función de callback y devuelve un nuevo array transformado.

filter() recorre el array evaluando una condición y devuelve un nuevo array con los elementos que cumplen dicha condición.

Estos métodos encapsulan el recorrido interno del array, simplificando el código y mejorando su legibilidad.

3️⃣ ⚙️ Guía de Instalación y Ejecución
📌 Requisitos

Navegador moderno compatible con ES6.

No requiere servidor backend.

El archivo marcas.json debe estar en la misma carpeta del proyecto.

▶️ Pasos para ejecutar

Clonar el repositorio:

git clone https://github.com/tuusuario/tu-repositorio.git

Acceder a la carpeta del proyecto:

cd tu-repositorio

Abrir el archivo index.html en el navegador.

⚠️ En caso de restricciones de fetch() por política CORS, ejecutar mediante un servidor local (por ejemplo Live Server).

📁 Estructura del Proyecto
/examen-marcas
│── index.html
│── style.css
│── script.js
│── marcas.json
│── README.md
♿ Accesibilidad Implementada

Asociación correcta entre <label> y controles de formulario.

Agrupación semántica de radios mediante <fieldset> y <legend>.

Uso de aria-live para actualizar información dinámica.

Estructura clara y jerárquica para lectores de pantalla.

🧠 Conclusiones 

Este ejercicio demuestra:

Dominio de manipulación del DOM.

Comprensión del uso de JSON en frontend.

Capacidad de generación dinámica de contenido.

Aplicación de métodos modernos de arrays.

Atención a la accesibilidad.

Separación adecuada de responsabilidades (HTML / CSS / JS).
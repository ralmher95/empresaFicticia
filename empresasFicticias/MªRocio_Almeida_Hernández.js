
let marcas = []; // crear un ARRAY

document.addEventListener("DOMContentLoaded", async () => { // "DOMContentLoaded" lo utilizo para evitar errores y cargo de forma asincrona
    await cargarDatos(); 
    generarRadiosCategorias(); // para cargar los radios por categorias
    probarSelect("Todas"); // es para que aparezcan todas
});

async function cargarDatos() {
    try {
        const response = await fetch('marcas.json'); // volvar lo datos de json
        if (!response.ok) throw new Error("Error en carga"); // en el caso de que no se vuelque me muestre este mensaje
        marcas = await response.json();
    } catch (error) {
        console.log.error("Error:", error);
    }
}

// 2. Generar botones de radio dinámicamente 
function generarRadiosCategorias() {
    const contenedor = document.getElementById("contenedorRadios"); 
    const categorias = ['Todas', ...new Set(marcas.map(m => m.category))]; // creo en categorias Todas junto con Set que basicamente hace que no se repitan las empresas y utilizo un .map para encontrar dicha categoria

    categorias.forEach(cat => {
        const label = document.createElement('label'); // creo el elemento label junto con su input
        const radio = document.createElement('input');
        
        radio.type = 'radio'; // en el input le añado la categoria
        radio.name = 'categoria-filtro'; // Todos los botones radio que comparten el mismo nombre (name)
        radio.value = cat; // Asigna un valor interno al botón 
        radio.checked = (cat === 'Todas');
        
        // Texto de la categoría
        const textoNodo = document.createTextNode(` ${cat}`); // método JavaScript del DOM que crea un nodo de texto puro con el contenido de texto que le pases como argumento
        
        label.appendChild(radio); // digo que aparezca por pantalla el radio
        label.appendChild(textoNodo); // digo que tambien aparezcan las categorias
        label.style.marginRight = "15px"; // le pongo al label un estilo de margen a la derecha
        contenedor.appendChild(label); // que en el contenedor de radios aparezca en el label

        radio.addEventListener("change", () => probarSelect(cat)); // chance funciona cuando el estado del radio button cambia y se lo seleciona por categorias
    });
}

// 1 y 3. Probar SELECT dinámicamente
function probarSelect(filtro) {
    const select = document.getElementById("empresas-select");
    
    // Limpiar el primer hijo de select select 
    while (select.firstChild) {
        select.removeChild(select.firstChild);
    }

    const opciones = document.createElement("option"); // crear un elemento 
    opciones.value = ""; // creo el valor del elemento
    opciones.textContent = "-- Selecciona empresa --"; 
    select.appendChild(opciones);

    /**
     * FILTER: Recorre el array "marcas" y genera un nuevo array solo con los elementos
     * que devuelven "true" en la comparación de categoría.
     */
    const filtradas = filtro === 'Todas' // Es un operador ternario. Comprueba si el usuario ha seleccionado la opción de ver todo.
        ? marcas // si lo hace enseñale todas 
        : marcas.filter(m => m.category === filtro); // sino filtrarsela por categorias

    filtradas.forEach(m => {  // para que recorra todos los datos
        const opt = document.createElement('option');
        opt.value = m.id;
        opt.textContent = m.name;
        select.appendChild(opt);
    });
}

// 4. Mostrar información pulsa en una de las opciones 
document.getElementById("empresas-select").addEventListener("change", (e) => {
    const contenedorInfo = document.getElementById("info-content");
    const idSeleccionado = parseInt(e.target.value);
    
    // Limpiar el primer hijo del contenedor de informacion
    while (contenedorInfo.firstChild) {
        contenedorInfo.removeChild(contenedorInfo.firstChild);
    }

    /**
     *  FIND: Busca el primer objeto cuyo ID coincida. Internamente hasta que encuentra
     * la coincidencia y retorna el objeto.
     */
    const empresa = marcas.find(m => m.id === idSeleccionado);

    if (empresa) {
        const fragmento = document.createDocumentFragment(); // Se crea un objeto DocumentFragment vacio, el cual queda listo para que pueda insertarseles nodos en el.

        const h3 = document.createElement('h3');
        h3.textContent = empresa.name;
        
        const pDesc = crearParrafo("Descripción: ", empresa.description); // aqui te pongo el parrafo para que saque la descripcion de la empresa
        const pUniv = crearParrafo("Universo: ", empresa.universe); // aqui te pongo el parrafo para que saque el universo
        const pAnio = crearParrafo("Año de aparición: ", empresa.firstAppearance); // aqui te pongo el parrafo para que saque el año de aparicion

        fragmento.appendChild(h3);  // lo inserto como un h3 todos los parrafos
        fragmento.appendChild(pDesc);
        fragmento.appendChild(pUniv);
        fragmento.appendChild(pAnio);
        
        contenedorInfo.appendChild(fragmento); // muevo todo el contenido a "info-content" el id del html
    } else {
        const mensaje = document.createElement("p"); // creo un parrafo 
        mensaje.textContent = "Selecciona una empresa para ver sus detalles."; // le añado este mensaje "Selecciona una empresa para ver sus detalles."
        contenedorInfo.appendChild(mensaje); // lo muestro en pantalla
    }
});

// Función para crear párrafos con negrita
function crearParrafo(variable, valor) {
    const p = document.createElement("p"); // creo elemento parrafo
    const strong = document.createElement("strong"); // creo elemento negrita
    strong.textContent = variable;
    p.appendChild(strong); 
    p.appendChild(document.createTextNode(valor)); // createTextNode es crear un elemento de texto en el parrafo
    return p;
}
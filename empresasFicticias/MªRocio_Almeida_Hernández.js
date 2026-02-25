
let marcas = []; 

document.addEventListener("DOMContentLoaded", async () => { 
    generarRadiosCategorias(); 
    probarSelect("Todas"); 
});

async function cargarDatos() {
    try {
        const response = await fetch('marcas.json'); 
        if (!response.ok) throw new Error("Error en carga"); 
        marcas = await response.json();
    } catch (error) {
        console.log.error("Error:", error);
    }
}


function generarRadiosCategorias() {
    const contenedor = document.getElementById("contenedorRadios"); 
    const categorias = ['Todas', ...new Set(marcas.map(m => m.category))]; 

    categorias.forEach(cat => {
        const label = document.createElement('label'); 
        const radio = document.createElement('input');
        
        radio.type = 'radio'; 
        radio.name = 'categoria-filtro'; 
        radio.value = cat; 
        radio.checked = (cat === 'Todas');
        
        
        const textoNodo = document.createTextNode(` ${cat}`);
        
        label.appendChild(radio); 
        label.appendChild(textoNodo); 
        label.style.marginRight = "15px"; 
        contenedor.appendChild(label); 

        radio.addEventListener("change", () => probarSelect(cat)); 
    });
}

function probarSelect(filtro) {
    const select = document.getElementById("empresas-select");
    

    while (select.firstChild) {
        select.removeChild(select.firstChild);
    }

    const opciones = document.createElement("option"); 
    opciones.value = ""; 
    opciones.textContent = "-- Selecciona empresa --"; 
    select.appendChild(opciones);

    const filtradas = filtro === 'Todas' 
        ? marcas 
        : marcas.filter(m => m.category === filtro); 

    filtradas.forEach(m => {  
        const opt = document.createElement('option');
        opt.value = m.id;
        opt.textContent = m.name;
        select.appendChild(opt);
    });
}


document.getElementById("empresas-select").addEventListener("change", (e) => {
    const contenedorInfo = document.getElementById("info-content");
    const idSeleccionado = parseInt(e.target.value);
    

    while (contenedorInfo.firstChild) {
        contenedorInfo.removeChild(contenedorInfo.firstChild);
    }

    const empresa = marcas.find(m => m.id === idSeleccionado);

    if (empresa) {
        const fragmento = document.createDocumentFragment(); 

        const h3 = document.createElement('h3');
        h3.textContent = empresa.name;
        
        const pDesc = crearParrafo("Descripción: ", empresa.description); 
        const pUniv = crearParrafo("Universo: ", empresa.universe); 
        const pAnio = crearParrafo("Año de aparición: ", empresa.firstAppearance); 

        fragmento.appendChild(h3);  
        fragmento.appendChild(pDesc);
        fragmento.appendChild(pUniv);
        fragmento.appendChild(pAnio);
        
        contenedorInfo.appendChild(fragmento);
    } else {
        const mensaje = document.createElement("p"); 
        mensaje.textContent = "Selecciona una empresa para ver sus detalles."; 
    }
});


function crearParrafo(variable, valor) {
    const p = document.createElement("p"); 
    const strong = document.createElement("strong"); 
    strong.textContent = variable;
    p.appendChild(strong); 
    p.appendChild(document.createTextNode(valor)); 
    return p;
}
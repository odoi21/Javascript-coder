alert("Hola, Bienvenido a Register-List. Esta es una app web donde podrás llevar una planilla como por ejemplo de estudiantes con su información: Nombre y Apellido.");

let items = [];
let cambioIndex = -1;

const form = document.getElementById('formStudients');
const surName = document.getElementById('nameSurname');
const gmail = document.getElementById('gmail');
const classNumber = document.getElementById('classNumber');
const notas = document.getElementById('notas');
const itemList = document.getElementById('itemList');
const searchBar = document.getElementById('searchBar');

// Cargar elementos desde localStorage al iniciar
function loadItems() {
    const storedItems = localStorage.getItem('items');
    if (storedItems) {
        items = JSON.parse(storedItems);
        renderItems();
    }
}

// Función para renderizar los elementos
function renderItems(filteredItems = items) {
    itemList.innerHTML = ''; // Limpiar la tabla
    filteredItems.forEach((item, index) => {
        const tr = document.createElement('tr');

        const tdName = document.createElement('td');
        tdName.textContent = item.name; // Mostrar nombre
        tr.appendChild(tdName);

        const tdGmail = document.createElement('td');
        tdGmail.textContent = item.gmail; // Mostrar correo
        tr.appendChild(tdGmail);

        const tdClass = document.createElement('td');
        tdClass.textContent = item.class; // Mostrar número de clase
        tr.appendChild(tdClass);

        const tdPromedio = document.createElement('td');
        tdPromedio.textContent = item.promedio; // Mostrar promedio
        tr.appendChild(tdPromedio);

        const tdEstado = document.createElement('td');
        tdEstado.textContent = item.estado; // Mostrar estado (Aprobado/Desaprobado)
        tr.appendChild(tdEstado);

        // Columna de acciones
        const tdActions = document.createElement('td');

        // Botón de editar
        const editButton = document.createElement('button');
        editButton.textContent = 'Editar';
        editButton.className = 'edit-button';
        editButton.onclick = () => editItem(index);
        tdActions.appendChild(editButton);

        // Botón de eliminar
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.className = 'delete-button';
        deleteButton.onclick = () => deleteItem(index);
        tdActions.appendChild(deleteButton);

        tr.appendChild(tdActions);
        itemList.appendChild(tr);
    });
}

// Evento para el formulario
form.addEventListener('submit', function (event) {
    event.preventDefault();
    const nameValue = surName.value.trim();
    const gmailValue = gmail.value.trim();
    const classValue = classNumber.value.trim();
    const notasValue = notas.value.trim();

    // Calcular el promedio de las notas
    const notasArray = notasValue.split(',').map(nota => parseFloat(nota.trim())).filter(nota => !isNaN(nota));
    const totalSum = notasArray.reduce((acc, nota) => acc + nota, 0);
    const promedio = notasArray.length > 0 ? totalSum / notasArray.length : 0; // Evitar división por cero
    const estado = promedio >= 7 ? 'Aprobado' : 'Desaprobado'; // Determinar estado

    if (cambioIndex === -1) {
        // Crear
        items.push({ name: nameValue, gmail: gmailValue, class: classValue, promedio: promedio.toFixed(2), estado: estado });
    } else {
        // Actualizar
        items[cambioIndex] = { name: nameValue, gmail: gmailValue, class: classValue, promedio: promedio.toFixed(2), estado: estado };
        cambioIndex = -1; // Resetear el índice de edición
    }

    // Guardar en localStorage
    localStorage.setItem('items', JSON.stringify(items));

    // Limpiar los campos
    surName.value = '';
    gmail.value = '';
    classNumber.value = '';
    notas.value = '';
    renderItems();
});

// Función para editar un elemento
function editItem(index) {
    surName.value = items[index].name;
    gmail.value = items[index].gmail;
    classNumber.value = items[index].class;
    notas.value = ''; // Limpiar el campo de notas para la edición
    cambioIndex = index; // Establecer el índice de edición
}

// Función para eliminar un elemento
function deleteItem(index) {
    items.splice(index, 1);
    // Actualizar localStorage después de eliminar
    localStorage.setItem('items', JSON.stringify(items));
    renderItems(); // Renderizar los elementos después de eliminar
}

//Evento para mostrar y ocultar el input del search

document.getElementById('searchButton').addEventListener('click', function() {
    const searchInput = document.getElementById('searchBar');
    // Alternar la visibilidad del input
    if (searchInput.style.display === 'none' || searchInput.style.display === '')  {
        searchInput.style.display = 'block'; // Mostrar el input
    } 
    else {
        searchInput.style.display = 'none'; // Ocultar el input
    }
});

// Función para filtrar elementos según la búsqueda
searchBar.addEventListener('input', function () {
    const searchValue = this.value.toLowerCase();
    const filteredItems = items.filter(item => item.name.toLowerCase().includes(searchValue));
    renderItems(filteredItems);
});

//filtrar por desaprobados aprobados y num de clases



//ClearButton para eliminar toda la planilla de una 

document.getElementById('clearButton').addEventListener('click', function() {
    // Confirmar la acción
    if (confirm("¿Estás seguro de que deseas eliminar toda la planilla? Esta acción no se puede deshacer.")) {
        items = []; // Vaciar el array de items
        localStorage.removeItem('items'); // Eliminar los datos de localStorage
        renderItems(); // Volver a renderizar la lista (que ahora estará vacía)
    }
});

// Cargar elementos al iniciar
loadItems();
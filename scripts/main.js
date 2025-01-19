alert("Hola, Bienvenido a Register-List. Esta es una app web donde podrás llevar una planilla como por ejemplo de estudiantes con su información: Nombre y Apellido.");

let items = [];
let cambioIndex = -1;

const form = document.getElementById('crudForm');
const surName = document.getElementById('nameSurname');
const gmail= document.getElementById('gmail')
const classNumber = document.getElementById('classNumber')
const itemList = document.getElementById('itemList'); // Corregido

form.addEventListener('submit', function(event) {
    event.preventDefault();
    const nameValue = surName.value.trim();
    const gmailValue = gmail.value.trim()
    const classValue = classNumber.value.trim()

    if (cambioIndex === -1) {
        // Crear
        items.push({ name: nameValue, gmail: gmailValue, class: classValue });
    } else {
        // Actualizar
        items[cambioIndex] = {name: nameValue, gmail: gmailValue, class: classValue};
        cambioIndex = -1; // Resetear el índice de edición
    }

    surName.value = '';
    gmail.value = '';
    classNumber.value = '';
    renderItems();
});

function renderItems() {
    itemList.innerHTML = ''; // Limpiar la tabla
    items.forEach((item, index) => {
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

        // Columna de acciones
        const tdActions = document.createElement('td');
        
        // Botón de editar
        const editButton = document.createElement('button');
        editButton.textContent = 'Editar';
        editButton.onclick = () => editItem(index);
        tdActions.appendChild(editButton);
        
        // Botón de eliminar
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.onclick = () => deleteItem(index);
        tdActions.appendChild(deleteButton);

        tr.appendChild(tdActions);
        itemList.appendChild(tr);
    });
}

function editItem(index) {
    surName.value = items[index].name;
    gmail.value = items[index].gmail;
    classNumber.value = items[index].class;
    cambioIndex = index; // Establecer el índice de edición
}

function deleteItem(index) {
    items.splice(index, 1);
    renderItems();
}
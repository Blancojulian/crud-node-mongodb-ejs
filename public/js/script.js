const table = document.querySelector('#table');
const modalEditAlumno = new bootstrap.Modal(document.getElementById('modalEditAlumno'));
const fromEdit = document.getElementById('form-edit');

const addFunctionToEvent = (element, event, selector, flagPrevent, handler) => {
    
    element.addEventListener(event, (e) => {
        if(flagPrevent) e.preventDefault();
        if(e.target.closest(selector)){
            handler(e);
        }
    })
}

const deleteAlumno = async (event) => {
    console.log(event.target);
    if(event.target.classList.contains('btn-eliminar'))
    {
        await fetch(event.target.href, {method: 'DELETE'});
        window.location.replace('/');
    }
}

const fillModalForm = (event) =>{
    const fila = event.target.parentNode.parentNode;

    const form = {
        id: fromEdit.querySelector("input[name='id']"),
        nombre: fromEdit.querySelector("input[name='nombre']"),
        edad: fromEdit.querySelector("input[name='edad']")
    }
    
    form.id.value = fila.children[0].innerText;
    form.nombre.value = fila.children[1].innerText;
    form.edad.value = fila.children[2].innerText;
    modalEditAlumno.show()
}

addFunctionToEvent(table, 'click', '.btn-eliminar', true, deleteAlumno);
addFunctionToEvent(table, 'click', '.btn-editar', false, fillModalForm);
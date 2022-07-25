//import swal from 'sweetalert';

//const { default: swal } = require("sweetalert");

const table = document.querySelector('#table');
const modalEditAlumno = new bootstrap.Modal(document.getElementById('modalEditAlumno'));
const formCreate = document.getElementById('form-create');
const formEdit = document.getElementById('form-edit');

const addFunctionToEvent = (element, event, selector, flagPrevent, handler) => {
    
    element.addEventListener(event, async (e) => {
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
        const resSwal = await swal({
            title: "Desea eliminar el alumno",
            text: "Una vez eliminado, no se podra recuperar la información",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })

        if (resSwal) {
            const response = await fetch(event.target.href, {method: 'DELETE'});

            const data = await response.json();
            
            if(response.status === 200)
            {
                await swal(`${data.message}`, {
                    icon: "success",
                });
                window.location.replace('/');
            }
            else
            {
                await swal(`${data.message}`, {
                    icon: "error",
                });
            }
        } else {
            swal("Selecciono cancelar");
        }
    }
}

const updateAlumno = async (event) => {
    const form = event.currentTarget;
    
    const formData = new FormData(form);
    let object = {};
    formData.forEach((value, key) => object[key] = value);
    
    const response = await fetch(form.action,{
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(object)
    })

    const data = await response.json();

    
    if(response.status === 200)
    {
        await swal(`${data.message}`, {
            icon: "success",
        });
        window.location.replace('/');
    }
    else
    {
        await swal(`${data.message}`, {
            icon: "error",
        });
    }
}

const createAlumno = async (event) => {
    const form = event.currentTarget;
    
    const formData = new FormData(form);
    let object = {};
    formData.forEach((value, key) => object[key] = value);
  
    const response = await fetch(form.action,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(object)
    })

    const data = await response.json();

    
    if(response.status === 200)
    {
        await swal(`${data.message}`, {
            icon: "success",
        });
        window.location.replace('/');
    }
    else
    {
        await swal(`${data.message}`, {
            icon: "error",
        });
    }
}

const fillModalForm = (event) =>{
    const fila = event.target.parentNode.parentNode;

    const form = {
        id: formEdit.querySelector("input[name='id']"),
        nombre: formEdit.querySelector("input[name='nombre']"),
        edad: formEdit.querySelector("input[name='edad']"),
        email: formEdit.querySelector("input[name='email']")
    }
    
    form.id.value = fila.children[0].innerText;
    form.nombre.value = fila.children[1].innerText;
    form.edad.value = fila.children[2].innerText;
    form.email.value = fila.children[3].innerText;
    modalEditAlumno.show()
}

addFunctionToEvent(table, 'click', '.btn-eliminar', true, deleteAlumno);
addFunctionToEvent(table, 'click', '.btn-editar', false, fillModalForm);
addFunctionToEvent(formEdit, 'submit', '#form-edit', true, updateAlumno);
addFunctionToEvent(formCreate, 'submit', '#form-create', true, createAlumno);//create
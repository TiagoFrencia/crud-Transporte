//funcion listar paquetes 
function listarPaquetes() {
    let listPaquetes = [];
    let url = 'http://localhost:3000/paquetes';
    fetch(url)
        .then(data => data.json())
        .then(paquetes => {
            listPaquetes = paquetes;
            listPaquetes.map((paquete, i) => {
                let row = document.createElement('tr');
                row.innerHTML = `
                    <td>${paquete.codigo}</td>
                    <td>${paquete.descripcion}</td>
                    <td>${paquete.destinatario}</td>
                    <td>${paquete.direccion}</td>
                    <td>
                        <a href="/paquetes/editar/${paquete.codigo}" class="btn btn-warning">Editar</a>
                        <button class="btn btn-danger" onclick="eliminarPaquete(${paquete.codigo})">Eliminar</button>
                    </td>
                `;
                document.getElementById('paquetes').appendChild(row);
            })
        }).catch(error => console.log(error)); 
}
//aca quedo agos en el boton

function obtenerDatosPaquete(){
    let codigo = document.getElementById("codigo").value;
    let descripcion = document.getElementById("descripcion").value;
    let destinatario = document.getElementById("destinatario").value;
    let direccion = document.getElementById("direccion").value;
    
    if(codigo.length == 0 || descripcion.length == 0 || destinatario.length == 0 || direccion.length == 0){
        return false;
    }else{

    let data = {codigo: codigo, descripcion: descripcion, destinatario: destinatario, direccion: direccion}
    return data;
    }
}

//funcion crear paquete

function crearPaquete() {
        var url = 'http://localhost:3000/paquetes/create';
        if (obtenerDatosPaquete() == false){
            alert("Por favor complete todos los campos");
        }else{
        var data = obtenerDatosPaquete();
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .catch(error => console.log('Error', error))
            .then(response => console.log('Success', response));
        alert("Paquete creado");
        }
}


function eliminarPaquete(codigo){
    if(confirm("¿Está seguro que desea eliminar el paquete?")){
    let url = `http://localhost:3000/paquetes/${codigo}`;
    fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            location.href = "/paquetes";
        })
        .catch(error => console.log(error));
    }
    alert("Paquete eliminado");
}


//funcion obtener codigo paquete
function getCodigo(){
    let url = window.location.href;
    const urlArray = url.split("/");
    const codigo = urlArray[urlArray.length - 1];
    return codigo;
}

//obtener paquete 
function obtenerPaquete(){
    let codigo = getCodigo();
    let url = `http://localhost:3000/paquetes/${codigo}`;
    fetch(url)
        .then(response => {return response.json()})
        .then(data => {
            console.log(data);
            document.getElementById("codigo").value = data.codigo;
            document.getElementById("descripcion").value = data.descripcion;
            document.getElementById("destinatario").value = data.destinatario;
            document.getElementById("direccion").value = data.direccion;
        })
        .catch(error => console.log(error));
}

//funcion editar paquete

function editarPaquete(){
    let codigo = getCodigo();
    let url = `http://localhost:3000/paquetes/edit/${codigo}`;
    let data = obtenerDatosPaquete();
    fetch(url, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
        .catch(error => console.log('Error', error))
        .then(response => console.log('Success', response))
        .then(location.href = "/paquetes");
    console.log("se edito el paquete");
}

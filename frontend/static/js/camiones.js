//funcion listar camiones
function listarCamiones(){
         
    let listCamiones = [];
    let url = 'http://localhost:3000/camiones';
    fetch(url)
        .then(data => data.json())
        .then(camiones => {
        listCamiones = camiones;
        listCamiones.map((camion, i) => {
            let row = document.createElement('tr');
            row.innerHTML = `
                <td>${camion.matricula}</td>
                <td>${camion.modelo}</td>
                <td>${camion.tipo}</td>
                <td>${camion.potencia}</td>
                <td>
                    <a href="/camiones/editar/${camion.matricula}" class="btn btn-warning">Editar</a>
                   <td> <button class="btn btn-danger" onclick="eliminarCamion('${camion.matricula}')">Eliminar</button></td>
                </td>
            `;
            document.getElementById('camiones').appendChild(row);
})
        })
        .catch(err => console.log(err));
   
    }

//obtener datos de camion
function obtenerDatosCamiones() {
    let matricula = document.getElementById("matricula").value;
    let tipo = document.getElementById("tipo").value;
    let modelo = document.getElementById("modelo").value;
    let potencia = document.getElementById("potencia").value;
    if(matricula.length == 0 || tipo.length == 0 || modelo.length == 0 || potencia.length == 0){
        return false;
    }else{
    var data = { matricula: matricula, tipo: tipo, modelo: modelo, potencia: potencia };
    return data;
    }
}

//funcion crear camion

function crearCamion() {
    
    let url = "http://localhost:3000/camiones/create";
    if(obtenerDatosCamiones() == false){
        alert("Rellene todos los campos");
    }else{
    var data = obtenerDatosCamiones();
    fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        },
    }).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => console.log('Success:', response));
    alert("Camion creado");
}
}  


//funcion eliminar camion
function eliminarCamion(matricula){
    let url = `http://localhost:3000/camiones/${matricula}`;
    fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(data => data.json())
    .then(camion => {
        console.log(camion);
        window.location.href = '/camiones';
    })
    .catch(err => console.log(err));
    console.log(matricula);
}




//funcion para obtener matricula del camion
function getMatricula(){
    const url = window.location.href;
    const urlArray = url.split('/');
    const matricula = urlArray[urlArray.length - 1];
    return matricula;
}

//funcion obtener camion
function getCamion (){
    const matricula = getMatricula();
    const url = `http://localhost:3000/camiones/${matricula}`;
    fetch(url)
    .then(res => {return res.json()})
    .then(data => {
        document.getElementById('matricula').value = data.matricula;
        document.getElementById('potencia').value = data.potencia;
        document.getElementById('modelo').value = data.modelo;
        document.getElementById('tipo').value = data.tipo;
    })
    .catch(err => console.log(err));
    }
    





//funcion editar camion

function editarCamion(){
    const matricula = getMatricula();
    const potencia = document.getElementById('potencia').value;
    const modelo = document.getElementById('modelo').value;
    const tipo = document.getElementById('tipo').value;
    const camion = {
        matricula: matricula,
        potencia: potencia,
        modelo: modelo,
        tipo: tipo
    }
    const url = `http://localhost:3000/camiones/edit/${matricula}`;
    fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(camion)
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);
        window.location.href = '/camiones';
    })
}
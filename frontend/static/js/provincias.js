//funcion listar provincias
function listarProvincias() {
    let listProvincias = [];
    let url = "http://localhost:3000/provincias";
    fetch(url)
        .then(data => data.json())
        .then(provincias => {
            listProvincias = provincias;
            listProvincias.map((provincia, i) => {
                let row = document.createElement("tr");
                row.innerHTML = `
                <td>${provincia.codigo_provincia}</td>
                <td>${provincia.nombre}</td>
                <td>
                    <a href="/provincias/edit/${provincia.codigo_provincia}" class="btn btn-warning">Editar</a>
                    <button onclick="eliminarProvincia('${provincia.codigo_provincia}')" class="btn btn-danger">Eliminar</button>
                </td>
                `;
                document.getElementById("provincias").appendChild(row);
            })
        })
        .catch(error => console.log(error));
}



//obtener datos de la provincia

function obtenerDatosProvincia(){
    let codigo_provincia = document.getElementById("codigo_provincia").value;
    let nombre = document.getElementById("nombre").value;
    if (codigo_provincia.length == 0 || nombre.length == 0) {
        return false;
    } else {
    let provincia = {codigo_provincia: codigo_provincia, nombre: nombre};
    return provincia;
    }
}



//funcion crear provincia
function crearProvincia() {
    if (obtenerDatosProvincia() == false) {
        alert("Ingrese todos los datos");
    } else {
    let provincia = obtenerDatosProvincia();
    let url = "http://localhost:3000/provincias/create";
    fetch(url, {
        method: 'POST',
        body: JSON.stringify(provincia),
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        }).then(
            setTimeout(function(){
            location.href = "/provincias";
            }, 1000)
        )
        .catch(error => console.log(error));
    }
    alert("Provincia creada");
}

//funcion obtener codigo provincia
function getCodigo_Provincia(){

    let url = window.location.href;
    const urlArray = url.split("/");
    const codigo_provincia = urlArray[urlArray.length - 1];
    return codigo_provincia;
}


function obtenerProvincia(){
    let codigo_provincia = getCodigo_Provincia();
    let url = `http://localhost:3000/provincias/${codigo_provincia}`;
    fetch(url)
        .then(response => {return response.json()})
        .then(data => {
            document.getElementById("codigo_provincia").value = data.codigo_provincia;
            document.getElementById("nombre").value = data.nombre;
        })
        .catch(error => console.log(error));

}

function editarProvincia(){
    let codigo_provincia = getCodigo_Provincia();
    let provincia = obtenerDatosProvincia();
    let url = `http://localhost:3000/provincias/${codigo_provincia}`;
    fetch(url, {
        method: 'PUT',
        body: JSON.stringify(provincia),
        headers: {
            'Content-Type': 'application/json'
        },
    }).then(res => res.json())
    .catch(error => console.log('Error', error))
    .then(response => console.log('Success', response))
    .then(location.href = "/provincias");
    console.log("se edito la Provincia");

}

//funcion eliminar provincia
function eliminarProvincia(codigo_provincia) {
    if(confirm("¿Está seguro de eliminar la provincia?")){
    let url = `http://localhost:3000/provincias/${codigo_provincia}`;
    fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            location.href = "/provincias";
        })
        .catch(error => console.log(error));
    }
    alert("Provincia eliminada");
}

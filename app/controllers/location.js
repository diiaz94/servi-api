const fetch = require("node-fetch");
const util = require('../utils/util');
const states = [
    {
        id: 0,
        name: "Seleccione Estado"
    }, {
        id: "2",
        name: "Amazonas"
    }, {
        id: "3",
        name: "Anzoategui"
    }, {
        id: "4",
        name: "Apure"
    }, {
        id: "5",
        name: "Aragua"
    }, {
        id: "6",
        name: "Barinas"
    }, {
        id: "7",
        name: "Bolívar"
    }, {
        id: "8",
        name: "Carabobo"
    }, {
        id: "9",
        name: "Cojedes"
    }, {
        id: "24",
        name: "Delta Amacuro"
    }, {
        id: "10",
        name: "Falcón"
    }, {
        id: "1",
        name: "Gran Caracas"
    }, {
        id: "11",
        name: "Guarico"
    }, {
        id: "12",
        name: "Lara"
    }, {
        id: "13",
        name: "Mérida"
    }, {
        id: "14",
        name: "Miranda"
    }, {
        id: "15",
        name: "Monagas"
    }, {
        id: "16",
        name: "Nueva Esparta"
    }, {
        id: "17",
        name: "Portuguesa"
    }, {
        id: "18",
        name: "Sucre"
    }, {
        id: "19",
        name: "Tachira"
    }, {
        id: "20",
        name: "Trujillo"
    }, {
        id: "21",
        name: "Vargas"
    }, {
        id: "22",
        name: "Yaracuy"
    }, {
        id: "23",
        name: "Zulia"
    }
]


exports.states = (req, res, next) => {
    return util.okResponse(res, 201, states);
}

exports.cities = (req, res, next) => {
    let cod = req.query.cod;
    console.log(cod);
    
    fetch('https://infoguia.com/data/listado_ciudades.php?cod='+cod, {
        headers: {
            Cookie: "codb=; modob=; _ga=GA1.2.1724317573.1560869216; _gid=GA1.2.484622847.1560869216; ASPSESSIONIDAEDCBCRC=DGFAIGEANJLBFCEEBPDMJOAB"
        }
    }).then(res => res.json()).then(function (data) {
        //returned = data.json();
        return util.okResponse(res, 201, data);
    });
}

exports.zones = (req, res, next) => {
    let cod = req.query.cod;
    console.log(cod);
    
    fetch('https://infoguia.com/data/listado_urbanizaciones.php?cod='+cod, {
        headers: {
            Cookie: "codb=; modob=; _ga=GA1.2.1724317573.1560869216; _gid=GA1.2.484622847.1560869216; ASPSESSIONIDAEDCBCRC=DGFAIGEANJLBFCEEBPDMJOAB"
        }
    }).then(res => res.json()).then(function (data) {
        return util.okResponse(res, 201, data);
    });
}
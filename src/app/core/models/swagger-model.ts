//version 1
// export interface IRutas {
//     idRutas: number;
//     ciudadOrigen: string;
//     ciudadId: string;
//     ciudadDestino: string;
//     destinoId: string;
//     fechaSalida: string;
//     fechaLlegada: string;
// }
export interface IViajes {
    idViajes:       number;
    servicio:       string;
    precioMinimo:   number;
    idBuses:        number;
    numeroAsientos: string;
    idConductor:    number;
    idRutas:        number;
    fechaSalida:    Date;
    fechaLlegada:   Date;
    estado:         boolean;
}
// tabla busesDetalles
export interface IBusesDetalles {
    idBusesDetalles:  number;
    origen:           string;
    horaSalida:       string;
    destino:          string;
    horaLlegada:      string;
    fechaSalida:      Date;
    distanciaKm:      number;
    terminalSaliente: string;
    terminalEntrante: string;
    precioPromedio:   number;
    idRutasBuses:     number;
    idRutas:          number;
}


//tabla buses

export interface IBuses {
    idBuses:        number;
    matricula:      string;
    marcaModelo:    string;
    precioMinimo:   number;
    precioPromedio: number;
    numeroAsientos: number;
    idConductor:    number;
    idRutas:        number;
    estado:         boolean;
}

export interface IRutas {
    idRutas:       number;
    ciudadOrigen:  string;
    ciudadId:      string;
    ciudadSeoId:   string;
    ciudadDestino: string;
    destinoId:     string;
    destinoSeoId:  string;
    estado:        boolean;
}

//I para la maqueta de seat selection 
export interface Asiento {
    numero: number;         // Número del asiento
    estaSeleccionado: boolean; // Indica si el asiento está seleccionado
    tieneIcono: boolean;      // Indica si el asiento tiene un icono
    iconoUrl?: string;        // URL del icono (opcional)
    visible: boolean;         // Indica si el asiento debe ser visible
}



//utilizar para filtro de rutas = ruta detalles
//utilizar para busesdetalles =
// Asiento
//{
//     "idAsiento": 5,
//     "numeroAsiento": 10,
//     "idBuses": 1,
//     "idPasajero": 1,
//     "idUsuario": 2,
//     "nombreUsuario": "adrian15",
//     "numeroPiso": 2,
//     "precioPen": 45,
//     "tipoAsiento": "Premium",
//     "estado": true
//   },

// buses
// {
//     "idBuses": 1,
//     "matricula": "A5W-957",
//     "marcaModelo": "Mercedes Benz - Marcopolo",
//     "precioMinimo": 35,
//     "precioPromedio": 45,
//     "numeroAsientos": 50,
//     "idConductor": 1,
//     "idRutas": 1,
//     "estado": true
//   },
// Rutas
// {
//     "idRutas": 1,
//     "ciudadOrigen": "Lima",
//     "ciudadId": "LIM",
//     "ciudadSeoId": "lima",
//     "ciudadDestino": "Tarma",
//     "destinoId": "TAR",
//     "destinoSeoId": "tarma",
//     "estado": true
//   },
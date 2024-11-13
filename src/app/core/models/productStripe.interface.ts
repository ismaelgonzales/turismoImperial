export interface IProductStripe {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
  qty: number;
  pasajero: IPasajero;
  asiento:IAsientoStripe;
  subTotal: number;
}
export interface IComprobantes {
  id: number;
  idCliente: number ;
  idEmpledo: number ;
  numeroComprobante: string;
  tipoComprobante : string ;
  fechaEmision : Date ;
  montoTotal : number ;
  idPagos: number ;
  estado :boolean ;

} 

export interface IPasajero {
  id: number;
  nombre_completo: string;
  ID_TipoDocumento: string;
  Numero_Documento: number

}

export interface IAsientoStripe {
  id:number;
  numeroPiso: number;
  idPajero: number;
  numeroAsiento: number ;
  idBus:number;
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
//Rutas
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
// rutaDetalles
// {
//   "idRutaDetalles": 1,
//   "ciudadOrigen": "Lima",
//   "ciudadDestino": "Tarma",
//   "fechaSalida": "2024-11-08",
//   "idRutas": 1
// }
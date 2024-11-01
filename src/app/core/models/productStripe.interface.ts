export interface IPasajero {
  id: number;
  nombre_completo: string;
  ID_TipoDocumento: string;
  Numero_Documento: number

}

export interface IAsiento {
  id:number;
  numeroPiso: number;
  idPajero: number;
  numeroAsiento: number ;
  idBus:number;
}

export interface IProductStripe {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
  qty: number;
  pasajero: IPasajero;
  asiento:IAsiento;
  subTotal: number;
}

// {
//   id: 1,
//   title: "Lima-Tarma",
//   price: 50,
//   category: "Regular",
//   description: "blablabla",
//   image: "https://res.cloudinary.com/dyelvotz0/image/upload/v1727587318/LogoImperial_nvve7x.png",
//   qty: 2,
//   pasajero: { id: 1;
//   nombre_completo: "CHRISTOPHER ISMAEL , GONZALES DAVILA";
//   numeroDni: 77338315;
//   }
//   asiento: {
//   id:1;
//   numeroPiso: 2;
//   idPajero: 1;
//   numeroAsiento: 23 ;
//   idBus:23;
// }

//   subTotal: 100,
// }




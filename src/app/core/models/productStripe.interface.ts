export interface IProductStripe {
    id: number;
    title: string;
    price: number;
    category: string;
    description: string;
    // image: string;
    qty: number;
    // pasajero: IPasajero;
    // asiento:IAsientoStripe;
    tipo_doc: string;
    documento: string;
    asiento: number;
    bus: string;

    subTotal: number;
}

export interface IPropietario {
    // Campos comunes
    nombres: string; // "CHRISTOPHER ISMAEL" o "ENRIQUE MARTIN EULALIO"
    tipoDocumento: string; // "DNI" o "Pasaporte"

    // Propiedades comunes en ambas estructuras, con campos opcionales
    apellidos?: string; // Puede ser "DAVILA GONZALES" o "SANCHEZ ABURTO"
    apellido_paterno?: string; // Solo en la primera estructura
    apellido_materno?: string; // Solo en la primera estructura
    nombre_completo?: string; // Solo en la primera estructura
    numero: string; // "77338315"
    numeroDocumento?: string; // Solo en la segunda estructura

    // Propiedades opcionales específicas de la primera estructura
    codigo_verificacion?: number; // Solo en la primera estructura
    direccion?: string; // Solo en la primera estructura
    ubigeo?: (string | null)[]; // Solo en la primera estructura
    ubigeo_sunat?: string; // Solo en la primera estructura
}

export interface IPasajero {
    asiento: number; // Número de asiento
    propietario: IPropietario; // Propietario del asiento, utilizando la interface unificada
}

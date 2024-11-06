export interface IStrapiResponse<T> {
    data: T[];
    meta: {
        pagination: {
            page: number;
            pageSize: number;
            pageCount: number;
            total: number;
        };
    };
}


export interface IBusesDetalles {
    id:              number;
    documentId:      string;
    origen:          string;
    horaSalida:      string;
    destino:         string;
    horaLlegada:     string;
    fechaSalida:     string;  // Cambiado a string para manejar el formato de Strapi
    distanciaKm:     number;
    terminalSaliente: string;
    terminalEntrante: string;
    precioPromedio:  number;
    // createdAt:       string;
    // updatedAt:       string;
    // publishedAt:     string;
    // locale:          string | null;
}


// strapi-model.ts
export interface IAsiento {
    id: number;
    documentId: string;
    numeroAsiento: number;
    numeroPiso: number;
    estado: boolean;
    precio: number;
    // createdAt: string;
    // updatedAt: string;
    // publishedAt: string;
    // locale: string | null;
    buses_detalle: IBusesDetalles;  // Relación con el detalle del bus
}

export interface IAsientoResponse {
    data: IAsiento[];
    meta: {
        pagination: {
            page: number;
            pageSize: number;
            pageCount: number;
            total: number;
        };
    };
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
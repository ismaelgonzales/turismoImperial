export interface ApiResponse<T> {
    message: 'Accion realizada con exito';

    data: T;
}
export interface IRutas {
    idRutas: number;
    ciudadOrigen: string;
    ciudadId: string;
    ciudadSeoId: string;
    ciudadDestino: string;
    destinoId: string;
    destinoSeoId: string;
    estado: boolean;
}

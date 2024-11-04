export interface ApiResponse<T> {
    message: 'Accion realizada con exito';

    data: T;
}
export interface IParadas {
    idParadas: number;
    idViaje: number;
    direccion: string;
    nombreCiudad: string;
    fecha: string;
    estado: boolean;
}

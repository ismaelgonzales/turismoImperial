export interface ApiResponse<T> {
    message: 'Accion realizada con exito';

    data: T;
}

export interface IReportes {
    idOpinion: number;
    idUsuario: number;
    idRutas: number;
    comentarios: string;
    calificacion: number;
    estado: boolean;
    fechaOpinion: string;
}

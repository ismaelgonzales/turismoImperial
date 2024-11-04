export interface ApiResponse<T> {
    message: 'Accion realizada con exito';

    data: T;
}

export interface IUsuario {
    idUsuario: number;
    nombre: string;
    apellido: string;
    username: string;
    correo: string;
    contraseña: string;
}

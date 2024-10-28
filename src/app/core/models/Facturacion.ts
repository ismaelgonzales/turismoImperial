export interface ApiResponse<T> {
    message: 'Accion realizada con exito';

    data: T;
}

export interface IFacturacion {
    idComprobante: number;
    idCliente: number;
    numeroComprobante: string;
    tipoComprobante: string;
    fechaEmision: string;
    montoTotal: number;
    idPago: number;
}

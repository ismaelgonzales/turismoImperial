export interface RutasBuses {
    idRutasBuses: number;
    ciudadOrigenId: number;
    origen: string;
    ciudadDestinoId: number;
    destino: string;
    totalBusesDiarios: number;
    duracionMin: string;
    primeraHoraSalida: string;
    ultimaHoraSalida: string;
    precioMinimo: number;
    precioPromedio: number;
    duracionPromedio: string;
    distanciaKm: number;
    terminalSaliente: string;
    terminalEntrante: string;
    popular: boolean;
}

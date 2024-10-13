export interface RutasBuses {
    IdRutasBuses: number;
    CiudadOrigenId: number;
    Origen: string;
    CiudadDestinoId: number;
    Destino: string;
    TotalBusesDiarios: number;
    DuracionMin?: string;
    PrimeraHoraSalida?: string;
    UltimaHoraSalida?: string;
    PrecioMinimo?: number;
    PrecioPromedio?: number;
    DuracionPromedio?: string;
    DistanciaKm: number;
    TerminalSaliente: string;
    TerminalEntrante: string;
    Popular: boolean;
}

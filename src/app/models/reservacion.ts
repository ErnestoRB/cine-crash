export interface Reservacion extends ReservacionBase {
  fechaReservacion: Date;
  fechaGenerado: Date;
}

export interface ReservacionBase {
  titulo: string;
  idPelicula: number;

  cliente: string;
  boletos: number;
}

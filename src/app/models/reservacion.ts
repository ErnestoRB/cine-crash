export interface Reservacion {
  titulo: string;
  idPelicula: number;
  fechaReservacion: Date;
  fechaGenerado: Date;
  cliente: string;
  boletos: number;
}

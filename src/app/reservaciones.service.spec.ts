import { TestBed } from '@angular/core/testing';

import { ReservacionesService } from './reservaciones.service';
import { LocalStorageService } from './local-storage.service';
import { Reservacion } from './reservacion';

describe('ReservacionesService', () => {
  let service: ReservacionesService;
  let spy: any;

  beforeEach(() => {
    spy = jasmine.createSpyObj('localStorageService', ['save', 'get']);
    TestBed.configureTestingModule({
      providers: [{ provide: LocalStorageService, useValue: spy }],
    });
    service = TestBed.inject(ReservacionesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should validate the date accurately', () => {
    expect(
      service.isFechaValida(new Date(Date.now() - 24 * 60 * 60 * 1000))
    ).toBeFalse();
    expect(service.isFechaValida(new Date())).toBeTrue();
    expect(
      service.isFechaValida(new Date(Date.now() + 24 * 60 * 60 * 1000))
    ).toBeTrue();
  });

  it('return an empty array of "reservaciones" when LocalStorage#get is undefined', () => {
    expect(service.reservaciones).toEqual([]);
  });

  it('return the same array of "reservaciones" from LocalStorage#get', () => {
    const reservacion: Reservacion[] = [
      {
        cliente: 'Ernesto',
        fechaGenerado: new Date(),
        fechaReservacion: new Date(),
        idPelicula: '1',
        titulo: 'Mario Bros',
      },
    ];
    spy.get.and.returnValue(reservacion);
    service.loadReservaciones(); // cargar reservaciones (llamar a LocalStorage nuevamente)
    expect(spy.get).toHaveBeenCalledTimes(2);
    expect(service.reservaciones).toEqual(reservacion);
  });

  it('should persist when reservar()', () => {
    const reservacion: Reservacion = {
      cliente: 'Ernesto',
      fechaGenerado: new Date(),
      fechaReservacion: new Date(),
      idPelicula: '1',
      titulo: 'Mario Bros',
    };
    service.reservar(reservacion);
    expect(spy.save).toHaveBeenCalledWith(service.key, service.reservaciones);
  });

  it('should fail persist when reservacion is outdated', () => {
    const reservacion: Reservacion = {
      cliente: 'Ernesto',
      fechaGenerado: new Date(),
      fechaReservacion: new Date(Date.now() - 24 * 60 * 60 * 1000),
      idPelicula: '1',
      titulo: 'Mario Bros',
    };
    expect(() => service.reservar(reservacion)).toThrowError(/ya pasó/);
    expect(spy.save).not.toHaveBeenCalled();
  });
});

import { TestBed } from '@angular/core/testing';

import { LocalStorageService } from './local-storage.service';

describe('LocalStorageService', () => {
  let service: LocalStorageService;
  let mockedGetItem: jasmine.Spy<(key: string) => string | null>;
  let mockedSetItem: jasmine.Spy<(key: string, value: any) => void>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalStorageService);
    mockedGetItem = spyOn(window.localStorage, 'getItem');
    mockedSetItem = spyOn(window.localStorage, 'setItem');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an object when valid', () => {
    mockedGetItem.and.returnValue('{ "hola": 3}');
    expect(service.get<{ hola: number }>('hola')).toEqual({ hola: 3 });
  });

  it('should return undefined when valid', () => {
    mockedGetItem.and.returnValue(null);
    expect(service.get('hola')).toBeUndefined();
  });

  it('should fail when no object is passed to save()', () => {
    /// @ts-ignore
    expect(() => service.save('exit', 0)).toThrowError(/No se permiten/);
    expect(mockedSetItem).not.toHaveBeenCalled();
  });

  it('should call localStorage.setItem when object is passed to save()', () => {
    service.save('exit', []);
    expect(mockedSetItem).toHaveBeenCalled();
    expect(mockedSetItem).toHaveBeenCalledWith('exit', '[]');
  });
});

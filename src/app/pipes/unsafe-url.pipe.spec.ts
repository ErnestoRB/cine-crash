import { UnsafeUrlPipe } from './unsafe-url.pipe';

describe('UnsafeUrlPipe', () => {
  it('create an instance', () => {
    const pipe = new UnsafeUrlPipe();
    expect(pipe).toBeTruthy();
  });
});

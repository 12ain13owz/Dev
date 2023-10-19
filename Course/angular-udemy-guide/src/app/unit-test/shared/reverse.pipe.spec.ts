import { ReversePipe } from './reverse.pipe';

describe('FilterPipe', () => {
  it('create an instance', () => {
    const pipe = new ReversePipe();
    expect(pipe.transform('hello')).toEqual('olleh');
  });
});

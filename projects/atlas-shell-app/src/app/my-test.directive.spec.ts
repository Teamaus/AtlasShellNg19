import { MyTestDirective } from './my-test.directive';

describe('MyTestDirective', () => {
  it('should create an instance', () => {
    const directive = new MyTestDirective();
    expect(directive).toBeTruthy();
  });
});

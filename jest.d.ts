declare module 'jest' {
  interface Matchers<R> {
    toMatchSnapshot(): R;
  }
}

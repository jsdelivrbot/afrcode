import configureStore from './configureStore';

it('A redux store deveria ter sido criada sem erros!', () => {
  const store = configureStore();

  expect(store.getState()).toEqual(expect.anything());
});
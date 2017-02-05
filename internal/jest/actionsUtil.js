import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

export const syncTest = ({ name, expectedAction, action, params }) => {
  it(name, () => {
    expect(action.call(null, ...params)).toEqual(expectedAction)
  });
};

export const asyncTest = ({ name, action, params, thunkArg, expectedActions,
                            initialState }) => {
  const middlewares = [ thunk.withExtraArgument(thunkArg) ]
  const mockStore = configureMockStore(middlewares)
  const store = mockStore(initialState)

  it(name, () => store.dispatch(action.call(null, ...params))
    .then(args => expect(store.getActions()).toEqual(expectedActions))
  )
}


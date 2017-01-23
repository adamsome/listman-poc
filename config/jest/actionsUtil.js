import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

export const syncTest = ({ testName, expectedAction, action, params }) => {
  it(testName, () => {
    expect(action.call(null, ...params)).toEqual(expectedAction)
  });
};

export const asyncTest = ({ name, action, params, mockAPI, expectedActions,
                            initialState }) => {
  const middlewares = [ thunk.withExtraArgument(mockAPI) ]
  const mockStore = configureMockStore(middlewares)
  const store = mockStore(initialState)

  it(name, () => store.dispatch(action.call(null, ...params))
    .then(args => expect(store.getActions()).toEqual(expectedActions))
  )
}


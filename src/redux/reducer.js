import { WIDGET_ADD_ITEM, WIDGET_FETCH_PENDING, WIDGET_FETCH_FULFILLED, WIDGET_FETCH_REJECTED } from './actions.js';

const initialState = {
  items: [],
  status: 'idle',
  error: undefined
};

export function widgetReducer(state = initialState, action) {
  switch (action?.type) {
    case WIDGET_ADD_ITEM:
      return { ...state, items: [...state.items, action.payload] };
    case WIDGET_FETCH_PENDING:
      return { ...state, status: 'loading', error: undefined };
    case WIDGET_FETCH_FULFILLED:
      return { ...state, status: 'succeeded', items: action.payload };
    case WIDGET_FETCH_REJECTED:
      return { ...state, status: 'failed', error: action.error };
    default:
      return state;
  }
}
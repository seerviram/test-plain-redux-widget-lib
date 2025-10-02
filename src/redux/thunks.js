import { fetchPending, fetchFulfilled, fetchRejected } from './actions.js';

/**
 * Optional thunk (requires redux-thunk middleware).
 */
export function fetchWidgetDataThunk() {
  return async (dispatch, getState) => {
    try {
      dispatch(fetchPending());
      await new Promise(r => setTimeout(r, 300));
      const items = Array.from({ length: 12 }).map((_, i) => ({
        id: String(i + 1),
        value: Math.round(Math.random() * 100)
      }));
      dispatch(fetchFulfilled(items));
    } catch (e) {
      dispatch(fetchRejected(e?.message ?? 'Unknown error'));
    }
  };
}
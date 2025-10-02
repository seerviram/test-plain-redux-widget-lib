export const WIDGET_ADD_ITEM = 'widget/ADD_ITEM';
export const WIDGET_FETCH_PENDING = 'widget/FETCH_PENDING';
export const WIDGET_FETCH_FULFILLED = 'widget/FETCH_FULFILLED';
export const WIDGET_FETCH_REJECTED = 'widget/FETCH_REJECTED';

export const addItem = (item) => ({ type: WIDGET_ADD_ITEM, payload: item });
export const fetchPending = () => ({ type: WIDGET_FETCH_PENDING });
export const fetchFulfilled = (items) => ({ type: WIDGET_FETCH_FULFILLED, payload: items });
export const fetchRejected = (error) => ({ type: WIDGET_FETCH_REJECTED, error });
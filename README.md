# @yourname/plain-redux-widget-lib

A tiny component library built for **React 18.0.0**, **react-redux 8.1.1**, and **redux 4.2.1**.  
**No Redux Toolkit**, just plain Redux. Uses **inline CSS** (no CSS Modules).

## Install

```bash
npm install @yourname/plain-redux-widget-lib
# ensure peer versions (exact):
npm install react@18.0.0 react-dom@18.0.0 react-redux@8.1.1 redux@4.2.1
# optional: if you want to use the async thunk provided
npm install redux-thunk@^2.4.2
```

## What you get

- `<InlineChart />` – minimal SVG line chart that uses inline styles.
- Plain Redux exports:
  - `widgetReducer` – reducer you can mount under your chosen key.
  - `addItem`, action constants.
  - `fetchWidgetDataThunk()` – optional async thunk (requires `redux-thunk`).

## Usage (plain Redux, with redux-thunk)

```tsx
import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider, useSelector, useDispatch } from 'react-redux';
import {
  widgetReducer,
  addItem,
  fetchWidgetDataThunk,
  InlineChart
} from '@yourname/plain-redux-widget-lib';

const store = createStore(
  combineReducers({ widget: widgetReducer }),
  applyMiddleware(thunk)
);

function Dashboard() {
  const dispatch = useDispatch();
  const items = useSelector((s: any) => s.widget.items);

  React.useEffect(() => {
    dispatch(fetchWidgetDataThunk());
  }, [dispatch]);

  const data = items.map((it: any, i: number) => ({ x: i, y: it.value }));

  return (
    <div>
      <button onClick={() => dispatch(addItem({ id: String(Date.now()), value: Math.round(Math.random()*100) }))}>
        Add random item
      </button>
      <InlineChart width={720} height={280} data={data} title="Inline Chart" slotLabel="Dashboard/Main" />
    </div>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <Dashboard />
    </Provider>
  );
}
```

## API

- `InlineChart({ width=600, height=240, data: Array<{x:number,y:number}>, title?, slotLabel? })`
- Redux:
  - `widgetReducer(state, action)`
  - Action constants: `WIDGET_ADD_ITEM`, `WIDGET_FETCH_PENDING`, `WIDGET_FETCH_FULFILLED`, `WIDGET_FETCH_REJECTED`
  - Action creators: `addItem(item)`, `fetchPending()`, `fetchFulfilled(items)`, `fetchRejected(error)`
  - Thunk (optional): `fetchWidgetDataThunk()`

## Local dev

```bash
npm install
npm run build
npm pack   # optional: produce a .tgz to test from another app
```

## Publish

```bash
npm login
npm publish --access public
```

> Tip: change the package name in `package.json` to your own scope before publishing.
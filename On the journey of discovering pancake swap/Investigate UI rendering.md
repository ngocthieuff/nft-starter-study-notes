### Live Charts: :fire:

<img src="/assets/images/dex/swap_components.png" />

Library: 
- [recharts](https://www.npmjs.com/package/recharts): a redefined chart library built with React and D3
- [redux](https://www.npmjs.com/package/redux): predictable state container for JS apps
- [wagmi](https://www.npmjs.com/package/wagmi/v/0.3.0-next.4): react hooks for Ethereum

```typescript
import { ResponsiveContainer, XAxis, YAxis, Tooltip, AreaChart, Area } from 'recharts'

...

if (!data || data.length === 0) {
    return <LineChartLoader />
  }
  return (
    <ResponsiveContainer>
    ...
    </ResponsiveContainer>
  )
```

```typescript
        <SwapLineChart
          data={pairPrices}
          setHoverValue={setHoverValue}
          setHoverDate={setHoverDate}
          isChangePositive={isChangePositive}
          timeWindow={timeWindow}
        />
```

``data`` for real-time update is fetched from:

```typescript
  const { pairPrices = [], pairId } = useFetchPairPrices({
    token0Address,
    token1Address,
    timeWindow,
    currentSwapPrice,
  })
```
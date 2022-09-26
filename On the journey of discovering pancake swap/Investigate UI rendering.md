### Live Charts: :fire:

<img src="/assets/images/dex/swap_components.png" />

Using:
- [Oracle Chainlink](https://chain.link/) 
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

**Derived data** is computed or extrapolated from other existing data. 

```typescript
export const useFetchPairPrices = ({
  token0Address,
  token1Address,
  timeWindow,
  currentSwapPrice,
}: useFetchPairPricesParams) => {
  
  useEffect(() => {
  }, [
    pairId,
    timeWindow,
    pairData,
    currentSwapPrice,
    token0Address,
    token1Address,
    derivedPairData,
    dispatch,
    isLoading,
  ])

  useEffect(() => {
  }, [token0Address, token1Address, pairId])
}
```


**Get Data on hovering and stream new data for displaying :scream_cat::**

<img src="/assets/images/dex/pc_chart_hover.png" />

**1. On hovering:**

in whole ``BasicChart`` component:

```typescript
        <SwapLineChart
          data={pairPrices}
          setHoverValue={setHoverValue}
          setHoverDate={setHoverDate}
          isChangePositive={isChangePositive}
          timeWindow={timeWindow}
        />
```

in ``SwapLineChart``:

```typescript
export type SwapLineChartProps = {
  data: any[]
  setHoverValue: Dispatch<SetStateAction<number | undefined>> // used for value on hover
  setHoverDate: Dispatch<SetStateAction<string | undefined>> // used for label of value
  isChangePositive: boolean
  timeWindow: PairDataTimeWindowEnum
} & React.HTMLAttributes<HTMLDivElement>


// Calls setHoverValue and setHoverDate when part of chart is hovered
// Note: this NEEDs to be wrapped inside component and useEffect, if you plug it as is it will create big render problems (try and see console)
const HoverUpdater = ({ locale, payload, setHoverValue, setHoverDate }) => {
  useEffect(() => {
    setHoverValue(payload.value)
    setHoverDate(
      payload.time.toLocaleString(locale, {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      }),
    )
  }, [locale, payload.value, payload.time, setHoverValue, setHoverDate])

  return null
}


// -------------------------------- rendering part --------------------------------
  if (!data || data.length === 0) {
    return <LineChartLoader />
  }
  return (
    <ResponsiveContainer>
      <AreaChart
        data={data}
        margin={{
          top: 5,
          right: 0,
          left: 0,
          bottom: 5,
        }}
        onMouseLeave={() => {
          if (setHoverDate) setHoverDate(undefined)
          if (setHoverValue) setHoverValue(undefined)
        }}
      >
        <defs>
          <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={colors.gradient1} stopOpacity={0.34} />
            <stop offset="100%" stopColor={colors.gradient2} stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis
          dataKey="time"
          axisLine={false}
          tickLine={false}
          tickFormatter={(time) => time.toLocaleString(locale, dateFormatting)}
          minTickGap={8}
        />
        <YAxis dataKey="value" axisLine={false} tickLine={false} domain={['auto', 'auto']} hide />
        <Tooltip
          cursor={{ stroke: theme.colors.textDisabled }}
          contentStyle={{ display: 'none' }}
          formatter={(tooltipValue, name, props) => (
            <HoverUpdater
              locale={locale}
              payload={props.payload}
              setHoverValue={setHoverValue}
              setHoverDate={setHoverDate}
            />
          )}
        />
        <Area dataKey="value" type="linear" stroke={colors.stroke} fill="url(#gradient)" strokeWidth={2} />
      </AreaChart>
    </ResponsiveContainer>

```

2. On updating new pair price:
   
Component for rendering:
```typescript
          <PairPriceDisplay
            value={pairPrices?.length > 0 && valueToDisplay}
            inputSymbol={inputCurrency?.symbol}
            outputSymbol={outputCurrency?.symbol}
          >
            <Text color={isChangePositive ? 'success' : 'failure'} fontSize="20px" ml="4px" bold>
              {`${isChangePositive ? '+' : ''}${changeValue.toFixed(3)} (${changePercentage}%)`}
            </Text>
          </PairPriceDisplay>
```

where to get data for displaying:

```typescript
  const { pairPrices = [], pairId } = useFetchPairPrices({
    token0Address,
    token1Address,
    timeWindow,
    currentSwapPrice,
  })
```

dive into ``useFetchPairPrices``:

```typescript

```



**Render color by positive/negative changes:**

```typescript
  const { changePercentage, changeValue } = getTimeWindowChange(pairPrices)
  const isChangePositive = changeValue >= 0

    <Text color={isChangePositive ? 'success' : 'failure'} fontSize="20px" ml="4px" bold>
        {`${isChangePositive ? '+' : ''}${changeValue.toFixed(3)} (${changePercentage}%)`}
    </Text>
```
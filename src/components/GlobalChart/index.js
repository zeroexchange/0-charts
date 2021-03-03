import React, { useState, useMemo, useEffect, useRef } from 'react'
import { ResponsiveContainer } from 'recharts'
import { timeframeOptions } from '../../constants'
import { useGlobalChartData, useGlobalData } from '../../contexts/GlobalData'
import { useMedia } from 'react-use'
import DropdownSelect from '../DropdownSelect'
import TradingViewChart, { CHART_TYPES } from '../TradingviewChart'
import { RowFixed } from '../Row'
import { OptionButton } from '../ButtonStyled'
import { getTimeframe } from '../../utils'
import { TYPE } from '../../Theme'

const CHART_VIEW = {
  VOLUME: 'Volume',
  LIQUIDITY: 'Liquidity',
}

const VOLUME_WINDOW = {
  WEEKLY: 'WEEKLY',
  DAYS: 'DAYS',
}
const GlobalChart = ({ display }) => {
  // chart options
  const [chartView, setChartView] = useState(display === 'volume' ? CHART_VIEW.VOLUME : CHART_VIEW.LIQUIDITY)

  // time window and window size for chart
  const timeWindow = timeframeOptions.ALL_TIME
  const [volumeWindow, setVolumeWindow] = useState(VOLUME_WINDOW.DAYS)

  // global historical data
  const [dailyData, weeklyData] = useGlobalChartData()
  // these values are sane
  const {
    totalLiquidityUSD,
    oneDayVolumeUSD,
    volumeChangeUSD,
    liquidityChangeUSD,
    oneWeekVolume,
    weeklyVolumeChange,
  } = useGlobalData()


  // dailyData looks like 
  // dailyVolumeETH: "162423.2860178005932075614440893966"
  // dailyVolumeUSD: 2574161.832883792
  // date: 1612483200
  // id: "18663"
  // totalLiquidityETH: "338202.4585066298896705281959824431"
  // totalLiquidityUSD: "5981166.185364733054445272095599672"
  // totalVolumeUSD: "0"
  // console.log('dailyData', dailyData)
  // console.log('weeklyData', weeklyData)
  // weeklyData looks like
  // 0: {date: 1612569600, weeklyVolumeUSD: 12083168.678718774}
  // 1: {date: 1613174400, weeklyVolumeUSD: 24178324.95422318}
  // 2: {date: 1613779200, weeklyVolumeUSD: 41911687.18889007}
  // 3: {date: 1614124800, weeklyVolumeUSD: 26529047.660693746

  // dailyData = dailyData?.forEach(d => {
  //   d.dailyVolumeETH = '0'
  // })

  // based on window, get starttim
  let utcStartTime = getTimeframe(timeWindow)

  const chartDataFiltered = useMemo(() => {
    let currentData = volumeWindow === VOLUME_WINDOW.DAYS ? dailyData : weeklyData

    return currentData?.filter(item => item.date > utcStartTime)
  }, [dailyData, utcStartTime, volumeWindow, weeklyData])
  const below800 = useMedia('(max-width: 800px)')

  // update the width on a window resize
  const ref = useRef()
  const isClient = typeof window === 'object'
  const [width, setWidth] = useState(ref?.current?.container?.clientWidth)
  useEffect(() => {
    if (!isClient) {
      return false
    }
    function handleResize() {
      setWidth(ref?.current?.container?.clientWidth ?? width)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [isClient, width]) // Empty array ensures that effect is only run on mount and unmount

  return chartDataFiltered ? (
    <>
      {below800 && (
        <DropdownSelect options={CHART_VIEW} active={chartView} setActive={setChartView} color={'#ff007a'} />
      )}

      {chartDataFiltered && chartView === CHART_VIEW.LIQUIDITY && (
        <ResponsiveContainer aspect={60 / 28} ref={ref}>
          <TradingViewChart
            data={dailyData}
            base={totalLiquidityUSD}
            baseChange={liquidityChangeUSD}
            title="Liquidity"
            field="totalLiquidityUSD"
            width={width}
            type={CHART_TYPES.AREA}
          />
        </ResponsiveContainer>
      )}
      {chartDataFiltered && chartView === CHART_VIEW.VOLUME && (
        <ResponsiveContainer aspect={60 / 28}>
          <TradingViewChart
            data={chartDataFiltered}
            base={volumeWindow === VOLUME_WINDOW.WEEKLY ? oneWeekVolume : oneDayVolumeUSD}
            baseChange={volumeWindow === VOLUME_WINDOW.WEEKLY ? weeklyVolumeChange : volumeChangeUSD}
            title={volumeWindow === VOLUME_WINDOW.WEEKLY ? 'Volume (7d)' : 'Volume'}
            field={volumeWindow === VOLUME_WINDOW.WEEKLY ? 'weeklyVolumeUSD' : 'dailyVolumeUSD'}
            width={width}
            type={CHART_TYPES.BAR}
            useWeekly={volumeWindow === VOLUME_WINDOW.WEEKLY}
          />
        </ResponsiveContainer>
      )}
      {display === 'volume' && (
        <RowFixed
          style={{
            bottom: '70px',
            position: 'absolute',
            left: '20px',
            zIndex: 10,
          }}
        >
          <OptionButton
            active={volumeWindow === VOLUME_WINDOW.DAYS}
            onClick={() => setVolumeWindow(VOLUME_WINDOW.DAYS)}
          >
            <TYPE.body>D</TYPE.body>
          </OptionButton>
          <OptionButton
            style={{ marginLeft: '4px' }}
            active={volumeWindow === VOLUME_WINDOW.WEEKLY}
            onClick={() => setVolumeWindow(VOLUME_WINDOW.WEEKLY)}
          >
            <TYPE.body>W</TYPE.body>
          </OptionButton>
        </RowFixed>
      )}
    </>
  ) : (
      ''
    )
}

export default GlobalChart

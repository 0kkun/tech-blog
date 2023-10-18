import * as React from 'react'
import { useTheme } from '@mui/material/styles'
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts'

import Title from '../../../../components/admin/elements/Title'
import { ChartRecord } from '../types/chart' 

const createData = (date: string, count?: number) => {
  return { date, count }
}

const data: ChartRecord[] = [
  createData('2023/7/1', 0),
  createData('2023/7/2', 300),
  createData('2023/7/3', 600),
  createData('2023/7/4', 800),
  createData('2023/7/5', 1500),
  createData('2023/7/6', 2000),
  createData('2023/7/7', 2400),
  createData('2023/7/8', 2400),
  createData('2023/7/9', undefined),
]

export const Chart = () => {
  const theme = useTheme()
  const verticalAxisTitle = 'アクセス数'

  return (
    <React.Fragment>
      <Title>今月のアクセス数</Title>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis
            dataKey="date"
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          />
          <YAxis stroke={theme.palette.text.secondary} style={theme.typography.body2}>
            <Label
              angle={270}
              position="left"
              style={{
                textAnchor: 'middle',
                fill: theme.palette.text.primary,
                ...theme.typography.body1,
              }}
            >
              {verticalAxisTitle}
            </Label>
          </YAxis>
          <Line
            isAnimationActive={false}
            type="monotone"
            dataKey="count"
            stroke={theme.palette.primary.main}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  )
}

import * as React from 'react'
import { useTheme } from '@mui/material/styles'
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts'
import { Grid, Paper } from '@mui/material'
import Title from '../../../../components/admin/elements/Title'
import { ChartRecord } from '../types/chart'

export interface ChartProps {
  chartRecords: ChartRecord[]
}

export const Chart: React.FC<ChartProps> = ({ chartRecords }) => {
  const theme = useTheme()
  const verticalAxisTitle = 'アクセス数'

  return (
    <>
      <Grid item xs={12} md={8} lg={9}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: 240,
          }}
        >
          <Title>今月のアクセス数</Title>
          <ResponsiveContainer>
            <LineChart
              data={chartRecords}
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
                dataKey="access_count"
                stroke={theme.palette.primary.main}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </Paper>
      </Grid>
    </>
  )
}

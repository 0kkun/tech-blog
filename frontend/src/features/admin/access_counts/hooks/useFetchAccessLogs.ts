import { useState } from 'react'
import { sendFetchAccessLogsApi } from '../apis/accessLogApi'
import { AccessLogDaily } from '../types/accessCount'

export const useFetchAccessLogs = () => {
  const [accessLogs, setAccessLogs] = useState<AccessLogDaily[]>([])
  const [totalCount, setTotalCount] = useState<number>(0)

  const fetchAccessLogs = async (targetYear: number, targetMonth: number) => {
    let response
    try {
      response = await sendFetchAccessLogsApi(targetYear, targetMonth)
      if (response.status === 200) {
        // レスポンスデータを状態として更新
        setAccessLogs(response.data as AccessLogDaily[])
        setTotalCount(sumAccessCounts(response.data))
      }
      return response.data
    } catch (e) {
      console.log(e)
    }
  }

  const sumAccessCounts = (data: AccessLogDaily[]) => {
    let totalAccessCount = 0;
    for (let i = 0; i < data.length; i++) {
      totalAccessCount += data[i].access_count || 0 // null や undefined の場合に備えて0を足す
    }
    return totalAccessCount;
  }

  return {
    fetchAccessLogs,
    accessLogs,
    setAccessLogs,
    totalCount,
  }
}

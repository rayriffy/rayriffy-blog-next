import dayjs from 'dayjs'

import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

export const serializeDate = (isoTimestamp: string | Date) => {
  dayjs.extend(utc)
  dayjs.extend(timezone)

  return dayjs(isoTimestamp).tz('Asia/Tokyo').format('DD MMM YYYY')
}

import * as dayjs from 'dayjs'

import * as utc from 'dayjs/plugin/utc'
import * as timezone from 'dayjs/plugin/timezone'

export const serializeDate = (isoTimestamp: string) => {
  dayjs.extend(utc)
  dayjs.extend(timezone)

  return dayjs(isoTimestamp).tz('Asia/Tokyo').format('DD MMM YYYY')
}

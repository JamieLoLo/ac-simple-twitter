import moment from 'moment'
const useMoment = (createdAt) => {
  moment.updateLocale('zh-tw', {
    meridiemParse: /凌晨|早上|上午|中午|下午|晚上/,
    meridiemHour: function (h, meridiem) {
      let hour = h
      if (hour === 12) {
        hour = 0
      }
      if (meridiem === '凌晨' || meridiem === '早上' || meridiem === '上午') {
        return hour
      } else if (meridiem === '下午' || meridiem === '晚上') {
        return hour + 12
      } else {
        // '中午'
        return hour >= 11 ? hour : hour + 12
      }
    },
    meridiem: function (hour, minute) {
      const hm = hour * 100 + minute
      if (hm < 600) {
        return '凌晨'
      } else if (hm < 900) {
        return '早上'
      } else if (hm < 1130) {
        return '上午'
      } else if (hm < 1230) {
        return '中午'
      } else if (hm < 1800) {
        return '下午'
      } else {
        return '晚上'
      }
    },
  })
  const date = new Date(createdAt)
  const timestamp = date.getTime()
  const fromNow = moment(timestamp).fromNow().replace('ago', '')
  let result = '剛剛'

  if (fromNow.includes('hour')) {
    if (fromNow.includes('an')) {
      result = '1 小時前'
    } else {
      result = fromNow.replace('hours', '') + ' 小時前'
    }
  }


  if (fromNow.includes('minutes')) {
    result = '1 小時內'
  }

  if (fromNow.includes('day')) {
    result = moment(timestamp).format('AHH:mm[・]YYYY[年]MM[月]DD[日]')
  }
  // an hour
  // minutes
  // days

  

  return result
}

export default useMoment

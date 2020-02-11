// "updated": "2020-02-08T13:39:22.188Z"
export function getUpdateMsg (updateTime) {
  // "2020/02/08 13:39:22
  updateTime = updateTime.replace(/T/g, ' ').replace(/-/g, '/').replace(/\.[\d]{3}Z/, '')
  updateTime = Math.round(new Date(updateTime).getTime() / 1000)
  const currentTime = Math.round(new Date().getTime() / 1000)
  const timeDifference = currentTime - updateTime
  if (timeDifference < 0) {
    return
  }
  let msg = ''
  if (timeDifference && timeDifference < 3600) {
    msg = Math.round(timeDifference / 60) + '分钟前'
  } else if (timeDifference < 86400) {
    msg = Math.round(timeDifference / 3600) + '小时前'
  } else if (timeDifference < 2629800) {
    msg = Math.round(timeDifference / 86400) + '天前'
  } else if (timeDifference < 31557600) {
    msg = Math.round(timeDifference / 2629800) + '月前'
  } else {
    msg = Math.round(timeDifference / 31557600) + '年前'
  }
  return msg
}

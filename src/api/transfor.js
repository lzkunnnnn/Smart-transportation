export function stateTransfor(state) {
  if (state == 0) {
    return '🟢已处理';
  }
  if (state == 1) {
    return '🔴待处理';
  } else return '未知';
}

export function timeTransfor(Time) {
  if (Time == null) {
    return '未知';
  } else return Time.replace('T', ' ').replace(/-/g, '/');
}

export function levelTransfor(level) {
  if (level == 0) {
    return '一级';
  } else if (level == 1) {
    return '二级';
  } else if (level == 2) {
    return '三级';
  } else if (level == 3) {
    return '四级';
  } else {
    return '未知等级';
  }
}

export function typeTransfor(type) {
  if (type == 'flow') {
    return '流量监测';
  } else if (type == 'speed') {
    return '区间测速';
  } else if (type == 'check') {
    return '卡口摄像';
  } else if (type == 'park') {
    return '违停抓拍';
  } else if (type == 'lane') {
    return '车道监测';
  } else if (type == 'environment') {
    return '环境监测';
  }
  return '未知';
}

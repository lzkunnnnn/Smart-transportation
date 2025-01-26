import request from '@/utils/request';

/**
 * 根据事件ID返回关联图谱
 * @param name
 * @returns {*}
 */
export function getCorrGraphByEventID(name) {
  return request.get('/correlation-analysis/getEventByName', {entityName:name});
}

/**
 * 查询子节点信息
 */
export function getCorrGraphBySonName(name){
  return request.get('/correlation-analysis/searchSonEvent',{name:name})
}


/**
 * 新建节点和关系
 * @param label
 * @param node1
 * @param relation
 * @param node2
 * @returns {*}
 */
export function addCorrelation(label,node1,relation,node2){
  return request.post("/correlation-analysis/saveEntity",{labelName:label,entityFrom:node1,relation:relation,entityTo:node2})
}

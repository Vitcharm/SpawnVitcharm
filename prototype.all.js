'use strict';
const mountSpawn = require('prototype.spawn');
const mountCreep = require('prototype.creep');
// const mountRoom = require('./mount.room')

// 挂载所有的额外属性和方法
module.exports = function() {
    // console.log('[mount] 重新挂载拓展');
    mountSpawn();
    mountCreep();
    // mountRoom()
    // 其他更多拓展...
};
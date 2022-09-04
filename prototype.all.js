const mountSpawn = require('prototype.spawn');
// const mountFlag = require('./mount.flag')
// const mountRoom = require('./mount.room')

// 挂载所有的额外属性和方法
module.exports = function() {
    console.log('[mount] 重新挂载拓展');
    mountSpawn();
    // mountFlag()
    // mountRoom()
    // 其他更多拓展...
};
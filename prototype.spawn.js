'use strict';
// 将拓展签入 Spawn 原型
module.exports = function() {
    _.assign(Spawn.prototype, SpawnExtension);
};

// 自定义的 Spawn 的拓展
const SpawnExtension = {

    initSpawnTask(roleMap) {
        console.log("Init");
        Memory.spawnList = [];
        roleMap.forEach(function(typeValue) {
            for (let i = 0; i < typeValue.size; i++) {
                Memory.spawnList.push(typeValue);
            }
        });
        console.log('Init done, spawnList size:', Memory.spawnList.length);
    },

    checkSpawnTask(spawn) {
        if (spawn.spawning ||
            !Memory.spawnList ||
            Memory.spawnList.length === 0) return;
        const spawnOk = this.mainSpawn(spawn, Memory.spawnList[0]);
        if (spawnOk === OK) Memory.spawnList.shift();
    },

    addSpawnTask(roleType) {
        Memory.spawnList.push(roleType);
        return Memory.spawnList.length;
    },

    mainSpawn(spawn, roleType) {
        if (!Memory.creepNameCounter) Memory.creepNameCounter = 0;
        let newName = roleType.name + Memory.creepNameCounter;
        let spawningRet = spawn.spawnCreep(roleType.body, newName,
            {memory: {role: roleType.name}});
        if (spawningRet === OK) {
            Memory.creepNameCounter++;
            console.log(
                'Spawning new creep:' + roleType.name + ' name:' + newName +
                ' ret:' + spawningRet);
        }

        return spawningRet;
    },
};
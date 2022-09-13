'use strict';
// 将拓展签入 Spawn 原型
module.exports = function() {
    _.assign(Spawn.prototype, SpawnExtension);
};

// 自定义的 Spawn 的拓展
const SpawnExtension = {

    initSpawnTask(roleMap) {
        console.log('Init Spawn Task');
        Memory.spawnList = [];
        roleMap.forEach(function(typeValue) {
            console.log(`creep ${typeValue.configName} 开始初始化`);
            for (let i = 0; i < typeValue.size; i++) {
                Memory.spawnList.push(typeValue);
            }
        });
        console.log('Init done, spawnList size:', Memory.spawnList.length);
    },

    checkSpawnTask() {
        if (this.spawning ||
            !Memory.spawnList ||
            Memory.spawnList.length === 0) {
            console.log("no add spawn list");
            console.log(this.spawning === true);
            return;
        }
        console.log("ready to add spawn list");
        const spawnOk = this.mainSpawn(Memory.spawnList[0]);
        if (spawnOk === OK) Memory.spawnList.shift();
    },

    addSpawnTask(roleType) {
        Memory.spawnList.push(roleType);
        return Memory.spawnList.length;
    },

    mainSpawn(roleType) {
        if (!Memory.creepNameCounter) Memory.creepNameCounter = 0;
        let newName = roleType.role + Memory.creepNameCounter;
        let spawningRet = this.spawnCreep(roleType.body, newName,
            {memory: {role: roleType.role, configName: roleType.configName}});
        console.log("call spawn rst code: " + spawningRet);
        if (spawningRet === OK) {
            Memory.creepNameCounter++;
            creepApi.add(roleType.configName, roleType.role,
                roleType.targetSite);
            console.log(
                'Spawning new creep:' + roleType.role + ' name:' + newName +
                ' ret:' + spawningRet);
        }
        console.log("spawn process END");
        return spawningRet;
    },

    vizSpawning() {
        if (this.spawning) {
            var spawningCreep = Game.creeps[this.spawning.name];
            this.room.visual.text(
                '🛠️' + spawningCreep.memory.role,
                this.pos.x + 1, this.pos.y, {
                    align: 'left',
                    opacity: 0.8,
                });
        }
    },
};
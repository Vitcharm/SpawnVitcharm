'use strict';
// 将拓展签入 Spawn 原型
module.exports = function () {
    _.assign(Spawn.prototype, SpawnExtension);
};

// 自定义的 Spawn 的拓展
const SpawnExtension = {

    initSpawnTask(roleMap) {
        console.log('Init Spawn Task');
        Memory.spawnList = [];
        roleMap.forEach(function (typeValue) {
            console.log(`creep ${typeValue.configName} 开始初始化`);
            for (let i = 0; i < typeValue.size; i++) {
                Memory.spawnList.push(typeValue);
            }
        });
        console.log('Init done, spawnList size:', Memory.spawnList.length);
    },

    checkSpawnTask() {
        if (this.spawning !== null ||
            Memory.spawnList.length === 0) {
            console.log("spawn free space: " + this.store.getFreeCapacity(RESOURCE_ENERGY));
            console.log("spawn list length: " + Memory.spawnList.length);
            console.log("spawn spawning?: " + (this.spawning !== null) + " " + (this.spawning.name));
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
        console.log(newName + " " + roleType.configName);
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
        // Game.spawns['Spawn'].spawnCreep([WORK, WORK, CARRY, MOVE, MOVE], 'haBak4',
        //     {memory: {role: 'harvester', configName: 'har_Lv1_ALPHA'}});

        // Game.spawns['Spawn'].spawnCreep([WORK, CARRY, MOVE], 'upBak3',
        //     {memory: {role: 'upgrader', configName: 'upg_Lv0_ALPHA'}});

        // Game.spawns['Spawn'].spawnCreep([WORK, CARRY, MOVE], 'caBak1',
        //     {memory: {role: 'carrier', configName: 'car_Lv0'}});

        // Game.spawns['Spawn'].spawnCreep([WORK, CARRY, MOVE], 'blBak2',
        //     {memory: {role: 'builder', configName: 'bui_Lv0_ALPHA'}});

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
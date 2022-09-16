'use strict';
// 将拓展签入 Spawn 原型
module.exports = function() {
    _.assign(Spawn.prototype, SpawnExtension);
};

// 自定义的 Spawn 的拓展
const SpawnExtension = {

    runSpawnManager() {
        console.log('!!!running spawn manager!!!');

        if (!Memory.spawnList) baseSpawn.initSpawnTask(RoleTypeMap);
        baseSpawn.checkCreepSpawnList();
        let processRet = baseSpawn.processSpawnTask();
        console.log(`process Spawn Task rst:${processRet}`);
        baseSpawn.vizSpawning();
    },

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

    checkCreepSpawnList() {
        let isSomeOneDead = false;
        for (const curName in Memory.creeps) {
            if (!Game.creeps[curName]) {
                console.log(
                    `${curName} has come to its end, deleting memory...`);
                delete Memory.creeps[curName];
                isSomeOneDead = true;
            }
        }
        if (Memory.spawnList.length === 0) {
            console.log(
                `Check new spawn config...length [${Memory.spawnList.length}], someone dead?${isSomeOneDead}`);
            RoleTypeMap.forEach(function(typeValue) {
                let creepsInType = _.filter(Game.creeps,
                    (creep) => creep.memory.configName ===
                        typeValue.configName);
                if (creepsInType.length < typeValue.size) {
                    let updatedSize = baseSpawn.addSpawnTask(typeValue);
                    console.log(
                        `spawn list size updated: ${updatedSize},
                     configName:${typeValue.configName},
                     now size ${creepsInType.length},
                     target size ${typeValue.size}`);
                }
            });
        }
    },

    addSpawnTask(roleType) {
        Memory.spawnList.push(roleType);
        return Memory.spawnList.length;
    },

    processSpawnTask() {
        if (Memory.spawnList.length === 0) {
            return -10;
        }
        let roleType = Memory.spawnList[0];
        if (!Memory.creepNameCounter) Memory.creepNameCounter = 0;
        let newName = roleType.role + Memory.creepNameCounter;
        let mockRet = this.spawnCreep(roleType.body, newName,
            {memory: {role: roleType.role, configName: roleType.configName}},
            {dryRun: true});
        if (mockRet !== OK) {
            console.log(`No launch spawning ${newName} ${roleType.configName} ${mockRet}`);
            if (mockRet === ERR_NAME_EXISTS) Memory.creepNameCounter++;
            return mockRet;
        }
        // spawn creep here
        let spawnRet = this.spawnCreep(roleType.body, newName,
            {memory: {role: roleType.role, configName: roleType.configName}});
        // update spawnList
        Memory.spawnList.shift();
        // update creep config
        creepApi.add(roleType.configName, roleType.role, roleType.targetSite);
        // update counter
        Memory.creepNameCounter = Memory.creepNameCounter + 1;

        return spawnRet;
    },

    vizSpawning() {
        if (this.spawning !== null) {
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
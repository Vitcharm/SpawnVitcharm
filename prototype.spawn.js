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
        if (Memory.spawnList.length === 0) {
            console.log('spawn list length: ' + Memory.spawnList.length);
            console.log('spawn spawning?: ' + (this.spawning !== null) + ' ' +
                (this.spawning.name));
            return;
        }
        // console.log('ready to add spawn list');
        const spawnOk = this.mainSpawn(Memory.spawnList[0]);
        // console.log(`call spawn rst code: ${spawnOk}`);
        // console.log('spawn process END');
    },

    addSpawnTask(roleType) {
        Memory.spawnList.push(roleType);
        return Memory.spawnList.length;
    },

    mainSpawn(roleType) {
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
        let spawnRet = this.spawnCreep(roleType.body, newName,
            {memory: {role: roleType.role, configName: roleType.configName}});

        // update spawnList
        console.log(`spawn success, now size: ${Memory.spawnList.length}`);
        Memory.spawnList.shift();
        console.log(`update list, now size: ${Memory.spawnList.length}`);

        // update creep config
        creepApi.add(roleType.configName, roleType.role,
            roleType.targetSite);
        console.log(`Spawning new creep: ${roleType.role} ${roleType.configName}`);

        // update counter
        Memory.creepNameCounter = Memory.creepNameCounter + 1;
        console.log(`now counter is ${Memory.creepNameCounter}`);

        return spawnRet;
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
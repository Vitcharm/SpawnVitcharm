'use strict';
require('prototype.all')();
require('config');

module.exports.loop = function() {

    /** Creep number manager system v2.0 **/
    if (!Memory.spawnList) baseSpawn.initSpawnTask(RoleTypeMap);
    for (const curName in Memory.creeps) {
        if (!Game.creeps[curName]) {
            let curRoleType = RoleTypeMap.get(Memory.creeps[curName].role);
            let creepsInType = _.filter(Game.creeps,
                (creep) => creep.memory.role === curRoleType.name);
            if (creepsInType.length >= curRoleType.size) {
                delete Memory.creeps[curName];
                break;
            }
            console.log('spawn list size: ', baseSpawn.addSpawnTask(
                curRoleType));
            delete Memory.creeps[curName];
        }
    }
    baseSpawn.checkSpawnTask();
    baseSpawn.vizSpawning();

    /** Creep role work system v2.0 **/
    Object.values(Game.creeps).forEach(creep => creep.work());
};


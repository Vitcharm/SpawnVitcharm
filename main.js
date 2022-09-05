'use strict';
require('prototype.all')();
require('config');

module.exports.loop = function() {

    /** Creep number manager system v2.0 **/
    if (!Memory.spawnList) baseSpawn.initSpawnTask(RoleTypeMap);
    for (const curName in Memory.creeps) {
        if (!Game.creeps[curName]) {
            baseSpawn.addSpawnTask(
                RoleTypeMap.get(Memory.creeps[curName].role));
            delete Memory.creeps[curName];
        }
    }
    baseSpawn.checkSpawnTask();
    baseSpawn.vizSpawning();

    /** Creep role work system v2.0 **/
    for (let name in Game.creeps) {
        let creep = Game.creeps[name];
        RoleTypeMap.get(creep.memory.role).action.run(creep);
    }
};


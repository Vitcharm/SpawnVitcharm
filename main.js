'use strict';
require('prototype.all')();
require('config');
require('creepApi');

module.exports.loop = function() {
    /** Creep number manager system v2.0 **/
    if (!Memory.spawnList) baseSpawn.initSpawnTask(RoleTypeMap);
    for (const curName in Memory.creeps) {
        if (!Game.creeps[curName]) {
            console.log(`${curName} has come to its end, deleting memory...`);
            delete Memory.creeps[curName];
        }
    }
    if (Memory.spawnList.length === 0) {
        console.log('Check new spawn config...');
        RoleTypeMap.forEach(function(typeValue) {
            let creepsInType = _.filter(Game.creeps,
                (creep) => creep.memory.configName === typeValue.configName);
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

    baseSpawn.checkSpawnTask();
    // baseSpawn.vizSpawning();

    /** Creep role work system v2.0 **/
    Object.values(Game.creeps).forEach(creep => creep.creepWork());
};


'use strict';
require('prototype.all')();
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');

const RoleTypeList = [
    {
        id: 0,
        name: 'harvester',
        body: [WORK, CARRY, MOVE],
        size: 3,
        cost: 200,
        action: roleHarvester,
    },
    {
        id: 1,
        name: 'builder',
        body: [WORK, CARRY, MOVE],
        size: 2,
        cost: 200,
        action: roleBuilder,
    },
    {
        id: 2,
        name: 'upgrader',
        body: [WORK, CARRY, MOVE],
        size: 2,
        cost: 200,
        action: roleUpgrader,
    },
];
var RoleTypeMap = new Map();
for (let i in RoleTypeList) {
    RoleTypeMap.set(RoleTypeList[i].name, RoleTypeList[i]);
}
var baseSpawn = Game.spawns['SpawnVit'];

module.exports.loop = function() {

    /** Creep number manager system v2.0 **/
    if (!Memory.spawnList) baseSpawn.initSpawnTask(RoleTypeMap);
    for (const curName in Memory.creeps) {
        if (!Game.creeps[curName]) {
            baseSpawn.addSpawnTask(RoleTypeMap.get(Memory.creeps[curName].role));
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


'use strict';
require('prototype.all')();
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');

var CreepType = [
    {
        id: 0,
        name: 'upgrader',
        body: [WORK, CARRY, MOVE],
        size: 2,
        action: roleUpgrader,
    },
    {
        id: 1,
        name: 'harvester',
        body: [WORK, CARRY, MOVE],
        size: 2,
        action: roleHarvester,
    },
    {
        id: 2,
        name: 'builder',
        body: [WORK, CARRY, MOVE],
        size: 2,
        action: roleBuilder,
    },
];
var baseSpawn = Game.spawns['SpawnVit'];

module.exports.loop = function() {

    // Creep number manager system v1.0
    for (var curName in Memory.creeps) {
        if (!Game.creeps[curName]) {
            delete Memory.creeps[curName];
            console.log('Clearing non-existing creep memory:', curName);
        }
    }
    for (var i in CreepType) {
        // 此处可能变化的点：1.role的type数量会改变 2.每种creep的数量改变 3.分基地
        baseSpawn.CheckAndSpawnCreep(baseSpawn, CreepType[i]);
    }

    // Creep role play system v1.0
    for (var name in Game.creeps) {
        var creep = Game.creeps[name];

        for (var index in CreepType) {
            if (creep.memory.role === CreepType[i].name) {
                CreepType[i].action.run(creep);
            }
        }
    }
};


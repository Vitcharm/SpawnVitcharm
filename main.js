'use strict';
require('prototype.all')();
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');

var SPAWN_NAME = 'SpawnVit';
var CreepType = [
    {
        id: 0,
        name: 'upgrader',
        body: [WORK, CARRY, MOVE],
        size: 2,
    },
    {
        id: 1,
        name: 'harvester',
        body: [WORK, CARRY, MOVE],
        size: 2,
    },
    {
        id: 2,
        name: 'builder',
        body: [WORK, CARRY, MOVE],
        size: 2,
    },
];

var baseSpawn = Game.spawns[SPAWN_NAME];

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
        baseSpawn.CheckAndSpawnCreep(baseSpawn, CreepType[i].name,
            CreepType[i].size);
    }

    // Creep role play system v1.0
    for (var name in Game.creeps) {
        var creep = Game.creeps[name];
        if (creep.memory.role === CreepType[0].name) {
            roleUpgrader.run(creep);
        }
        if (creep.memory.role === CreepType[1].name) {
            roleHarvester.run(creep);
        }
        if (creep.memory.role === CreepType[2].name) {
            roleBuilder.run(creep);
        }
    }
};


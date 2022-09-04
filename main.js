'use strict';
require('prototype.all')();
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');

var SPAWN_NAME = 'SpawnVit';
var UPGRADER_TYPE = 'upgrader';
var HARVESTER_TYPE = 'harvester';
var BUILDER_TYPE = 'builder';
var baseSpawn = Game.spawns[SPAWN_NAME];

module.exports.loop = function() {

    // Creep number manager system v1.0
    for (var curName in Memory.creeps) {
        if (!Game.creeps[curName]) {
            delete Memory.creeps[curName];
            console.log('Clearing non-existing creep memory:', curName);
        }
    }
    // 此处可能变化的点：1.role的type数量会改变 2.每种creep的数量改变 3.分基地
    baseSpawn.CheckAndSpawnCreep(SPAWN_NAME, HARVESTER_TYPE, 2);
    baseSpawn.CheckAndSpawnCreep(SPAWN_NAME, BUILDER_TYPE, 2);
    baseSpawn.CheckAndSpawnCreep(SPAWN_NAME, UPGRADER_TYPE, 2);

    // Creep role play system v1.0
    for (var name in Game.creeps) {
        var creep = Game.creeps[name];
        if (creep.memory.role === HARVESTER_TYPE) {
            roleHarvester.run(creep);
        }
        if (creep.memory.role === UPGRADER_TYPE) {
            roleUpgrader.run(creep);
        }
        if (creep.memory.role === BUILDER_TYPE) {
            roleBuilder.run(creep);
        }
    }
};


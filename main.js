var SPAWN_NAME = 'SpawnVit';
var UPGRADER_TYPE = 'upgrader';
var HARVESTER_TYPE = 'harvester';
var BUILDER_TYPE = 'builder';
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
require('prototypeAll')();

module.exports.loop = function() {


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


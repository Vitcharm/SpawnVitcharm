'use strict';
const roleHarvester = require('role.harvester');
const roleUpgrader = require('role.upgrader');
const roleBuilder = require('role.builder');

global.RoleTypeList = [
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
        size: 1,
        cost: 200,
        action: roleBuilder,
    },
    {
        id: 2,
        name: 'upgrader',
        body: [WORK, CARRY, MOVE],
        size: 1,
        cost: 200,
        action: roleUpgrader,
    },
];
global.RoleTypeMap = new Map();
for (let i in RoleTypeList) {
    RoleTypeMap.set(RoleTypeList[i].name, RoleTypeList[i]);
}
global.baseSpawn = Game.spawns['SpawnVit'];
global.SPAWN_STORE_RESERVE_RATIO = 0.8;
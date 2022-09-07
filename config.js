'use strict';

global.RoleTypeList = [
    {
        id: 0,
        name: 'harvester',
        body: [WORK, CARRY, MOVE],
        size: 3,
        cost: 200,
    },
    {
        id: 1,
        name: 'builder',
        body: [WORK, CARRY, MOVE],
        size: 1,
        cost: 200,
    },
    {
        id: 2,
        name: 'upgrader',
        body: [WORK, CARRY, MOVE],
        size: 1,
        cost: 200,
    },
];
global.RoleTypeMap = new Map();
for (let i in RoleTypeList) {
    RoleTypeMap.set(RoleTypeList[i].name, RoleTypeList[i]);
}
global.baseSpawn = Game.spawns['SpawnVit'];
global.REPAIR_RATIO = 0.8;
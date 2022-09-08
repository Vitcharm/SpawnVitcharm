'use strict';
global.baseSpawn = Game.spawns['SpawnVit'];
global.SITE_SOURCES = ['84307db01394a36247a65a99', 'ae5953e84bc50b4efcc4f183'];
global.SITE_CONTAINERS = ['1', '2'];
global.SITE_EXTENSIONS = ['1', '2'];
global.SITE_STORAGE = ['1', '2'];
global.REPAIR_RATIO = 0.8;
global.RoleTypeList = [
    {
        role: 'harvester',
        body: [WORK, CARRY, MOVE],
        size: 3,
        cost: 200,
        targetSite: SITE_SOURCES[0],
        configName: 'har_Lv0_ALPHA',
    },
    {
        role: 'builder',
        body: [WORK, CARRY, MOVE],
        size: 0,
        cost: 200,
        targetSite: SITE_SOURCES[1],
        configName: 'bui_Lv0_ALPHA',
    },
    {
        role: 'upgrader',
        body: [WORK, CARRY, MOVE],
        size: 1,
        cost: 200,
        targetSite: SITE_SOURCES[1],
        configName: 'upg_Lv0_ALPHA',
    },
];
global.RoleTypeMap = new Map();
for (let i in RoleTypeList) {
    RoleTypeMap.set(RoleTypeList[i].role, RoleTypeList[i]);
}

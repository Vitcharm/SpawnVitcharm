'use strict';
global.baseSpawn = Game.spawns['SpawnVit'];
global.SITE_SOURCES = ['1e2689b842e73b9df00beea8', '43c838a32b2ef754181907d2'];
global.SITE_CONTAINERS = ['1', '2'];
global.SITE_EXTENSIONS = ['1', '2'];
global.SITE_STORAGE = ['1', '2'];
global.REPAIR_RATIO = 0.9;
global.RoleTypeList = [
    {
        role: 'harvester',
        configName: 'har_Lv0_ALPHA',
        size: 2,
        body: [WORK, CARRY, MOVE],
        cost: 200,
        targetSite: baseSpawn.id,
    },
    {
        role: 'builder',
        configName: 'bui_Lv0_ALPHA',
        size: 1,
        body: [WORK, CARRY, MOVE],
        cost: 200,
        targetSite: SITE_SOURCES[0],
    },
    {
        role: 'builder',
        configName: 'bui_Lv0_BETA',
        size: 1,
        body: [WORK, CARRY, MOVE],
        cost: 200,
        targetSite: baseSpawn.id,
    },
    {
        role: 'upgrader',
        configName: 'upg_Lv0_ALPHA',
        size: 1,
        body: [WORK, CARRY, MOVE],
        cost: 200,
        targetSite: SITE_SOURCES[0],
    },
    {
        role: 'upgrader',
        body: [WORK, CARRY, MOVE],
        size: 2,
        cost: 200,
        targetSite: baseSpawn.id,
        configName: 'upg_Lv0_BETA',
    },
];
global.RoleTypeMap = new Map();
for (let i in RoleTypeList) {
    RoleTypeMap.set(RoleTypeList[i].configName, RoleTypeList[i]);
}

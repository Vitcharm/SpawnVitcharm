'use strict';
global.baseSpawn = Game.spawns['Spawn'];
global.SITE_SOURCES = ['5bbcaf909099fc012e63ac7e', '5bbcaf909099fc012e63ac7f'];
global.SITE_CONTAINERS = ['1', '2'];
global.SITE_EXTENSIONS = ['1', '2'];
global.SITE_STORAGE = ['1', '2'];
global.REPAIR_RATIO = 0.9;
global.RoleTypeList = [
    {
        role: 'harvester',
        configName: 'har_Lv0_ALPHA',
        size: 3,
        body: [WORK, CARRY, MOVE],
        cost: 200,
        targetSite: SITE_SOURCES[0],
    },
    {
        role: 'harvester',
        configName: 'har_Lv0_BETA',
        size: 1,
        body: [WORK, CARRY, MOVE],
        cost: 200,
        targetSite: SITE_SOURCES[1],
    },
    {
        role: 'upgrader',
        configName: 'upg_Lv0_ALPHA',
        size: 2,
        body: [WORK, CARRY, MOVE],
        cost: 200,
        targetSite: SITE_SOURCES[1],
    },
    {
        role: 'upgrader',
        body: [WORK, CARRY, MOVE],
        size: 1,
        cost: 200,
        targetSite: baseSpawn.id,
        configName: 'upg_Lv0_BETA',
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
];
global.RoleTypeMap = new Map();
for (let i in RoleTypeList) {
    RoleTypeMap.set(RoleTypeList[i].configName, RoleTypeList[i]);
}

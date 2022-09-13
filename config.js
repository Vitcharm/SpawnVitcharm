'use strict';
global.baseSpawn = Game.spawns['Spawn'];
global.SITE_SOURCES = ['5bbcaf909099fc012e63ac7e', '5bbcaf909099fc012e63ac7f'];
global.SITE_CONTAINERS = ['1', '2'];
global.SITE_EXTENSIONS = ['63209e5186a36d264af1b441', '2'];
global.SITE_STORAGE = ['1', '2'];
global.REPAIR_RATIO = 0.9;
global.RoleTypeList = [
    {
        role: 'harvester',
        configName: 'har_Lv0_ALPHA',
        size: 0,
        body: [WORK, CARRY, MOVE],
        cost: 200,
        targetSite: SITE_SOURCES[0],
    },
    {
        role: 'harvester',
        configName: 'har_Lv0_BETA',
        size: 0,
        body: [WORK, CARRY, MOVE],
        cost: 200,
        targetSite: SITE_SOURCES[1],
    },
    {
        role: 'upgrader',
        configName: 'upg_Lv0_ALPHA',
        size: 1,
        body: [WORK, CARRY, MOVE],
        cost: 200,
        targetSite: SITE_SOURCES[1],
    },
    {
        role: 'upgrader',
        body: [WORK, CARRY, MOVE],
        size: 0,
        cost: 200,
        targetSite: baseSpawn.id,
        configName: 'upg_Lv0_BETA',
    },
    {
        role: 'builder',
        configName: 'bui_Lv0_ALPHA',
        size: 0,
        body: [WORK, CARRY, MOVE],
        cost: 200,
        targetSite: SITE_SOURCES[0],
    },
    {
        role: 'builder',
        configName: 'bui_Lv0_BETA',
        size: 0,
        body: [WORK, CARRY, MOVE],
        cost: 200,
        targetSite: baseSpawn.id,
    },
    {
        role: 'carrier',
        configName: 'car_Lv0',
        size: 1,
        body: [CARRY, CARRY, MOVE],
        cost: 150,
        targetSite: baseSpawn.id,
    },
    {
        role: 'harvester',
        configName: 'har_Lv1_ALPHA',
        size: 3,
        body: [WORK, WORK, CARRY, MOVE, MOVE],
        cost: 350,
        targetSite: SITE_SOURCES[0],
    },
    {
        role: 'upgrader',
        body: [WORK, CARRY, CARRY, MOVE, MOVE],
        size: 2,
        cost: 250,
        targetSite: baseSpawn.id,
        configName: 'upg_Lv1_BETA',
    },
];
global.RoleTypeMap = new Map();
for (let i in RoleTypeList) {
    RoleTypeMap.set(RoleTypeList[i].configName, RoleTypeList[i]);
}

'use strict';
global.baseSpawn = Game.spawns['Spawn'];
global.SITE_SOURCES = ['5bbcaf909099fc012e63ac7e', '5bbcaf909099fc012e63ac7f'];
global.SITE_CONTAINERS = ['632302df72933fa039754605'];
global.SITE_EXTENSIONS = [
    '6320bb8b041175616effe180',
    '63216717ac9df468cbf30dc8',
    '6320afa02227c09e430b8d2e',
    '63214c6f2f000b50fd7a75b7',
    '6321895cac9df4b501f31715'];
global.SITE_STORAGE = ['1', '2'];
global.REPAIR_RATIO = 0.90;
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
        role: 'upgrader',
        configName: 'upg_Lv0_ALPHA',
        size: 0,
        body: [WORK, CARRY, MOVE],
        cost: 200,
        targetSite: SITE_CONTAINERS[0],
    },

    {
        role: 'builder',
        configName: 'bui_Lv0_ALPHA',
        size: 0,
        body: [WORK, CARRY, MOVE],
        cost: 200,
        targetSite: SITE_CONTAINERS[0],
    },
    {
        role: 'carrier',
        configName: 'car_Lv0',
        size: 1,
        body: [CARRY, CARRY, MOVE],
        cost: 150,
        targetSite: SITE_CONTAINERS[0],
    },
    {
        role: 'miner',
        body: [WORK, WORK, WORK, MOVE, MOVE],
        size: 1,
        cost: 300,
        targetSite: SITE_SOURCES[1],
        configName: 'miner_LV0',
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
        targetSite: SITE_CONTAINERS[0],
        configName: 'upg_Lv1_BETA',
    },
    {
        role: 'builder',
        configName: 'bui_Lv1_ALPHA',
        size: 2,
        body: [WORK, CARRY, CARRY, MOVE, MOVE],
        cost: 300,
        targetSite: SITE_CONTAINERS[0],
    },
    {
        role: 'builder',
        configName: 'bui_Lv1_BETA',
        size: 1,
        body: [WORK, CARRY, CARRY, MOVE, MOVE],
        cost: 300,
        targetSite: baseSpawn.id,
    },
];
global.RoleTypeMap = new Map();
for (let i in RoleTypeList) {
    RoleTypeMap.set(RoleTypeList[i].configName, RoleTypeList[i]);
}

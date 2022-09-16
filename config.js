'use strict';

global.SITE_SOURCES = ['5bbcaf909099fc012e63ac7e', '5bbcaf909099fc012e63ac7f'];
global.SITE_CONTAINERS = ['6324085117f637af19791daa', '6324a97a5e37709b7bd036f5', '3'];
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
        size: 0,
        body: [CARRY, CARRY, MOVE],
        cost: 150,
        targetSite: SITE_CONTAINERS[0],
    },
    {
        role: 'miner',
        body: [WORK, WORK, WORK, MOVE, MOVE],
        size: 0,
        cost: 300,
        targetSite: SITE_SOURCES[0],
        configName: 'miner_LV0',
    },
    {
        role: 'repairer',
        body: [WORK, CARRY, MOVE],
        size: 0,
        cost: 200,
        targetSite: SITE_CONTAINERS[1],
        configName: 'repairer_LV0',
    },
    {
        role: 'upgrader',
        body: [WORK, CARRY, CARRY, MOVE, MOVE],
        size: 0,
        cost: 250,
        targetSite: SITE_CONTAINERS[1],
        configName: 'upg_Lv1_BETA',
    },
    {
        role: 'builder',
        configName: 'bui_Lv1_ALPHA',
        size: 0,
        body: [WORK, CARRY, CARRY, MOVE, MOVE],
        cost: 300,
        targetSite: SITE_CONTAINERS[1],
    },
    {
        role: 'builder',
        configName: 'bui_Lv1_BETA',
        size: 0,
        body: [WORK, CARRY, CARRY, MOVE, MOVE],
        cost: 300,
        targetSite: SITE_CONTAINERS[1],
    },
];
global.RoleTypeMap = new Map();
for (let i in RoleTypeList) {
    RoleTypeMap.set(RoleTypeList[i].configName, RoleTypeList[i]);
}

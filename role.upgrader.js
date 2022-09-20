'use strict';
/**
 * 升级者配置生成器
 * takeSource: 从指定矿/存储建筑中取能量
 * performDuty: 执行指定任务
 *
 * @param sourceId 要提取能量的建筑id
 */
module.exports = sourceId => ({
    takeSource: creep => {
        var targetContainers = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType === STRUCTURE_CONTAINER)
                    && (structure.store[RESOURCE_ENERGY] > creep.store.getCapacity());
            },
        });
        if (targetContainers.length > 0) {
            let container = targetContainers[0];
            creep.say(`💰take`);
            console.log(`take from ${container}`);
            if (creep.withdraw(container, RESOURCE_ENERGY) ===
                ERR_NOT_IN_RANGE) {
                creep.moveTo(container,
                    {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
        // 自己身上的能量装满了，返回 true（切换至 performDuty 阶段）
        return creep.store.getFreeCapacity() <= 0;
    },
    performDuty: creep => {
        const controller = creep.room.controller;
        if (creep.upgradeController(controller) ===
            ERR_NOT_IN_RANGE) {
            creep.say('🚧upgrad');
            creep.moveTo(controller,
                {visualizePathStyle: {stroke: '#ffaa00'}});
        }
        // 自己身上的能量没有了，返回 true（切换至 source 阶段）
        return creep.store[RESOURCE_ENERGY] <= 0;
    },
});
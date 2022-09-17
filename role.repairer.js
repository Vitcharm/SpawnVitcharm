'use strict';
module.exports = sourceId => ({

    takeSource: creep => {
        var targetContainers = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType === STRUCTURE_CONTAINER)
                    && (structure.store[RESOURCE_ENERGY] > 0);
            },
        });
        targetContainers.sort(
            (a, b) => b.store[RESOURCE_ENERGY] - a.store[RESOURCE_ENERGY]);
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

        function repairing() {
            creep.say('🚧repair');
            const targets = creep.room.find(FIND_STRUCTURES, {
                filter: object => (object.hits < object.hitsMax * REPAIR_RATIO) && (object.hitsMax < 350000),
            });
            targets.sort((a, b) => a.hits - b.hits);
            if (targets.length > 0) {
                for (let i in targets) {
                    if (creep.repair(targets[i]) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[i]);
                    }
                }
            }
        }

        repairing(creep);
        return creep.store[RESOURCE_ENERGY] <= 0;
    },
});
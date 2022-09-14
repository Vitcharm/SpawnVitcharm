'use strict';
module.exports = sourceId => ({

    takeSource: creep => {
        const sourcePlaceObj = Game.getObjectById(sourceId);
        // dummy method to distinguish source or store;
        if (creep.harvest(sourcePlaceObj) !== ERR_INVALID_TARGET) {
            creep.say('💰harvest');
            if (creep.harvest(sourcePlaceObj) === ERR_NOT_IN_RANGE) {
                creep.moveTo(sourcePlaceObj,
                    {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        } else {
            creep.say('💰take');
            if (creep.withdraw(sourcePlaceObj, RESOURCE_ENERGY) ===
                ERR_NOT_IN_RANGE) {
                creep.moveTo(sourcePlaceObj,
                    {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
        // 自己身上的能量装满了，返回 true（切换至 performDuty 阶段）
        return creep.store.getFreeCapacity() <= 0;
    },

    performDuty: creep => {
        function building() {
            creep.say('🚧build');
            var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if (targets.length) {
                if (creep.build(targets[0]) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0],
                        {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }

        function repairing() {
            creep.say('🚧repair');
            const targets = creep.room.find(FIND_STRUCTURES, {
                filter: object => object.hits < object.hitsMax * REPAIR_RATIO,
            });
            targets.sort((a, b) => a.hits - b.hits);
            console.log("repairing " + targets[0]);
            if (targets.length > 0) {
                if (creep.repair(targets[0]) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            }
        }

        building(creep);
        repairing(creep);
        return creep.store[RESOURCE_ENERGY] <= 0;
    },
});
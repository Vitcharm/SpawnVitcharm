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

        function repairing() {
            creep.say('🚧repair');
            const targets = creep.room.find(FIND_STRUCTURES, {
                filter: object => (object.hits < object.hitsMax * REPAIR_RATIO) && (object.hitsMax < 350000),
            });
            targets.sort((a, b) => a.hits - b.hits);
            if (targets.length > 0) {
                for (let i in targets) {
                    // console.log('repairing ' + targets[i]);
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
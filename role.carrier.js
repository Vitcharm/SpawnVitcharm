'use strict';
module.exports = sourceId => ({
    takeSource: creep => {
        const sourcePlaceObj = Game.getObjectById(sourceId);
        creep.say('💰take');
        if (creep.withdraw(sourcePlaceObj, RESOURCE_ENERGY) ===
            ERR_NOT_IN_RANGE) {
            creep.moveTo(sourcePlaceObj,
                {visualizePathStyle: {stroke: '#ffaa00'}});
        }
        return creep.store.getFreeCapacity() <= 0;
    },

    performDuty: creep => {
        var targets = creep.room.find(FIND_MY_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType === STRUCTURE_EXTENSION) &&
                    structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
            },
        });
        creep.say('🔄 deliver');
        if (targets.length > 0) {
            for (let i in targets) {
                if (creep.transfer(targets[i], RESOURCE_ENERGY) ===
                    ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[i],
                        {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }
        return creep.store[RESOURCE_ENERGY] <= 0;
    },
});
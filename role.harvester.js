'use strict';
module.exports = sourceId => ({
    takeSource: creep => {
        const sourcePlaceObj = Game.getObjectById(sourceId);
        creep.say('💰harvest');
        if (creep.harvest(sourcePlaceObj) === ERR_NOT_IN_RANGE) {
            creep.moveTo(sourcePlaceObj, {visualizePathStyle: {stroke: '#ffaa00'}});
        }
        return creep.store.getFreeCapacity() <= 0;
    },

    performDuty: creep => {
        var targets = Game.getObjectById(baseSpawn.id);
        creep.say('🔄 deliver');
        if (creep.transfer(targets, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
            creep.moveTo(targets, {visualizePathStyle: {stroke: '#ffffff'}});
        }
        return creep.store[RESOURCE_ENERGY] <= 0;
    },
});
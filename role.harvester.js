'use strict';
module.exports = sourceId => ({
    takeSource: creep => {
        var sources = creep.room.find(FIND_SOURCES);
        creep.say('💰harvest');
        if (creep.harvest(sources[0]) === ERR_NOT_IN_RANGE) {
            creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
        }
        return creep.store.getFreeCapacity() <= 0;
    },

    performDuty: creep => {
        var targets = Game.getObjectById(sourceId);
        creep.say('🔄 deliver');
        if (creep.transfer(targets, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
            creep.moveTo(targets, {visualizePathStyle: {stroke: '#ffffff'}});
        }
        return creep.store[RESOURCE_ENERGY] <= 0;
    },
});
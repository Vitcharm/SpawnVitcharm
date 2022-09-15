'use strict';
module.exports = sourceId => ({
    takeSource: creep => {
        const sourcePlaceObj = Game.getObjectById(sourceId);
        creep.say('💰harvest');
        if (creep.harvest(sourcePlaceObj) === ERR_NOT_IN_RANGE) {
            creep.moveTo(sourcePlaceObj, {visualizePathStyle: {stroke: '#ffaa00'}});
        }
        return false;
    },

    performDuty: creep => {
        return true;
    },
});
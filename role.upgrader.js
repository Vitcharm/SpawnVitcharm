'use strict';
var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if (creep.store.getFreeCapacity() > 0) {
            creep.say('💰 harvest');
            this.harvest(creep);
        } else {
            this.upgrading(creep);
            creep.say('🔝 upgrad');
        }
    },
    harvest: function(creep) {
        var sources = creep.room.find(FIND_SOURCES);
        if (creep.harvest(sources[0]) === ERR_NOT_IN_RANGE) {
            creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
        }
    },
    upgrading: function(creep) {
        if (creep.upgradeController(creep.room.controller) ===
            ERR_NOT_IN_RANGE) {
            creep.moveTo(creep.room.controller);
        }
    },
};

module.exports = roleUpgrader;
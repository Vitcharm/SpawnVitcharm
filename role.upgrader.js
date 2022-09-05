'use strict';
var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if (creep.memory.upgradeFlag && creep.store[RESOURCE_ENERGY] === 0) {
            creep.memory.upgradeFlag = false;
        }
        if (!creep.memory.upgradeFlag && creep.store.getFreeCapacity() === 0) {
            creep.memory.upgradeFlag = true;
        }
        if (creep.memory.upgradeFlag) {
            creep.say('🔝 upgrad');
            this.upgrading(creep);
        } else {
            creep.say('💰 take');
            this.takeEnergy(creep);
        }
    },
    takeEnergy: function(creep) {
        const containers = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType === STRUCTURE_CONTAINER ||
                    (structure.structureType === STRUCTURE_SPAWN &&
                        structure.store.getUsedCapacity() >
                        structure.store.getCapacity() *
                        SPAWN_STORE_RESERVE_RATIO)
                );
            },
        });
        if (creep.withdraw(containers[0], RESOURCE_ENERGY) ===
            ERR_NOT_IN_RANGE) {
            creep.moveTo(containers[0],
                {visualizePathStyle: {stroke: '#ffaa00'}});
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
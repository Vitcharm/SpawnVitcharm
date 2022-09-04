var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if (creep.memory.building && creep.store[RESOURCE_ENERGY] === 0) {
            creep.memory.building = false;
        }
        if (!creep.memory.building && creep.store.getFreeCapacity() === 0) {
            creep.memory.building = true;
        }

        if (creep.memory.building) {
            this.repairing(creep);
            this.building(creep);
            creep.say('🚧 build');
        } else {
            creep.say('🔄 take');
            this.takeEnergy(creep);
        }
    },
    takeEnergy: function(creep) {
        const containers = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return structure.structureType === STRUCTURE_CONTAINER;
            },
        });
        if (creep.withdraw(containers[0], RESOURCE_ENERGY) ===
            ERR_NOT_IN_RANGE) {
            creep.moveTo(containers[0],
                {visualizePathStyle: {stroke: '#ffaa00'}});
        }
    },
    building: function(creep) {
        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
        if (targets.length) {
            if (creep.build(targets[0]) === ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0],
                    {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
    },
    repairing: function(creep) {
        const targets = creep.room.find(FIND_STRUCTURES, {
            filter: object => object.hits < object.hitsMax,
        });
        targets.sort((a, b) => a.hits - b.hits);
        if (targets.length > 0) {
            if (creep.repair(targets[0]) === ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0]);
            }
        }
    },
};

module.exports = roleBuilder;
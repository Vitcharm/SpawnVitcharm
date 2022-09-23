'use strict';
module.exports = sourceId => ({
    takeSource: creep => {
        var targetContainers = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType === STRUCTURE_CONTAINER)
                    && (structure.store[RESOURCE_ENERGY] >
                        creep.store.getCapacity());
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
        return creep.store.getFreeCapacity() <= 0;
    },

    performDuty: creep => {
        var targets = creep.room.find(FIND_MY_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType === STRUCTURE_SPAWN)
                    || (structure.structureType === STRUCTURE_EXTENSION)
                    || (structure.structureType === STRUCTURE_TOWER)
                    && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
            },
        });
        creep.say('🔄 deliver');

        targets.sort(
            (a, b) => b.store.getFreeCapacity(RESOURCE_ENERGY) -
                a.store.getFreeCapacity(RESOURCE_ENERGY));
        console.log(targets[0]);
        if (targets.length > 0) {
            console.log(`delivering ${targets[0]}`);
            var transRet = creep.transfer(targets[0], RESOURCE_ENERGY);
            if (transRet === ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0],
                    {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
        return (creep.store[RESOURCE_ENERGY] <= 0);
    },
});
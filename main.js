'use strict';
require('prototype.all')();
require('config');
require('creepApi');
module.exports.loop = function() {
    /** Prepare global object **/
    global.baseSpawn = Game.spawns['Spawn'];
    /** Tower system v0.1 **/
    var tower = Game.getObjectById('6323f1827a835a7d6141e92e');

    let targets = tower.room.find(FIND_STRUCTURES, {
        filter: object => (object.hits < object.hitsMax * REPAIR_RATIO) && (object.hitsMax < 350000),
    });
    for (let i in targets) {
        tower.repair(targets[i]);
    }
    var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
    if(closestHostile) {
        tower.attack(closestHostile);
    }

    /** Creep number manager system v2.0 **/
    baseSpawn.runSpawnManager();
    /** Creep role work system v2.0 **/
    console.log("!!!running role manager!!!")
    Object.values(Game.creeps).forEach(creep => creep.creepWork());
};


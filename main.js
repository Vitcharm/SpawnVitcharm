'use strict';
require('prototype.all')();
require('config');
require('creepApi');
module.exports.loop = function() {
    global.baseSpawn = Game.spawns['Spawn'];
    /** Creep number manager system v2.0 **/
    baseSpawn.runSpawnManager();
    /** Creep role work system v2.0 **/
    console.log("!!!running role manager!!!")
    Object.values(Game.creeps).forEach(creep => creep.creepWork());
};


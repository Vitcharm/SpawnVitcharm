// 将拓展签入 Spawn 原型
module.exports = function() {
    _.assign(Spawn.prototype, SpawnExtension);
};

// 自定义的 Spawn 的拓展
const SpawnExtension = {

    CheckAndSpawnCreep(spawn, role, thres) {
        var creepsInRole = _.filter(Game.creeps,
            (creep) => creep.memory.role === role);
        if (creepsInRole.length < thres) {
            var newName = role + '' + creepsInRole.length;
            console.log('Spawning new creep: '+ role + ' ' + newName);
            Game.spawns[spawn].spawnCreep([WORK, CARRY, MOVE], newName,
                {memory: {role: role}});
        }
        if (Game.spawns[spawn].spawning) {
            var spawningCreep = Game.creeps[Game.spawns[spawn].spawning.name];
            Game.spawns[spawn].room.visual.text(
                '🛠️' + spawningCreep.memory.role,
                Game.spawns[spawn].pos.x + 1, Game.spawns[spawn].pos.y, {
                    align: 'left',
                    opacity: 0.8,
                });
        }
    },
};
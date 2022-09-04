// 将拓展签入 Spawn 原型
module.exports = function() {
    _.assign(Spawn.prototype, SpawnExtension);
};

// 自定义的 Spawn 的拓展
const SpawnExtension = {

    CheckAndSpawnCreep(spawn, roleType) {
        var creepsInRole = _.filter(Game.creeps,
            (creep) => creep.memory.role === roleType.name);
        var spawningRet = 0;
        if (creepsInRole.length < roleType.size) {
            var newName = roleType.name + '' + creepsInRole.length;
            spawningRet = spawn.spawnCreep(roleType.body, newName,
                {memory: {role: roleType.name}});
            console.log('Spawning new creep: ' + roleType.name + ' ' + newName +
                ' ret: ' + spawningRet);
        }
        if (spawn.spawning) {
            var spawningCreep = Game.creeps[spawn.spawning.name];
            spawn.room.visual.text(
                '🛠️' + spawningCreep.memory.role,
                spawn.pos.x + 1, spawn.pos.y, {
                    align: 'left',
                    opacity: 0.8,
                });
        }
        return spawningRet;
    },
};
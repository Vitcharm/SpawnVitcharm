# SpawnVitcharm

Screeps game code

2022/09/24 特性总结

1.整体房间运营： 已实现半自动化运营。
- 需提前设计好config中角色配置，能实现包括持续能量收集（miner）-> 流转（carrier）-> 存储（storage）-> 使用（升级/建造）自动化流程；
- RCL可稳步升级；
- 基地spawn、extension、storage能量存储可持续补满；
- creeps数量实现死亡-补充的自动更替；
- 单个tower能量可持续补满，并有自动修复建筑（除城墙）、防御功能；
- 建造半自动化，手动规划放置工地，builder再实现建造；

2.角色管理：
- 支持新增creep角色种类配置项；
- 可**异步**更新现有角色配置项的预设size（数量）大小，body组件等，更新后需等下一个该配置的creep出生才生效；
- 所有角色工作状态抽象为takeSource和performDuty两种，由不同角色实现具体内容；

3.数量控制：
- 与配置项中预设的creep角色数量（size字段）关联，实现异步数量控制；
- 支持死亡creep内存回收
- 支持出生creep同步新增/覆盖相应配置项
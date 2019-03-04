# setup a mongo shard cluster
# mongo-cluster


## 1. start a cluster by docker-compose
```
docker-compose up
```

## 2. init config-server
```
docker exec -it test-mongo_config-server-1_1 bash
mongo localhost:27019

# execute 1_init-config-server.js
rs.initiate(
  {
    _id: "conf-set",
    configsvr: true,
    members: [
      { _id : 0, host : "config-server-1:27019" },
      { _id : 1, host : "config-server-2:27019" },
      { _id : 2, host : "config-server-3:27019" }
    ]
  }
)
```

### setup auth on mongos/config
```
docker exec -it test-mongo_config-server-1_1 bash
mongo localhost:27019

# on mongo shell
# create admin on admin_db
admin_db = db.getSiblingDB("admin")
admin_db.createUser(
  {
    user: "admin",
    pwd: "admin",
    roles: [
      "userAdminAnyDatabase",
      "dbAdminAnyDatabase",
      "readWriteAnyDatabase",
      "clusterAdmin"
    ]
  }
)

# auth and check sh.status
admin_db = db.getSiblingDB("admin")
admin_db.auth("admin", "admin")
rs.status()
```

## 2.1 execute init shard-1
```
docker exec -it test-mongo_shard-1-1_1 bash
mongo localhost:27018

# execute 2_init-shard-1.js
rs.initiate(
  {
    _id: "shard-1",
    members: [
      { _id : 0, host : "shard-1-1:27018" },
      { _id : 1, host : "shard-1-2:27018" },
    ]
  }
)
```
### create admin on shard
this user is for shard instance mantain. import/export, dump/restore.
this user is diff with mongos user.

```
docker exec -it test-mongo_shard-1-1_1 bash
mongo localhost:27018

# mongo shell
admin = db.getSiblingDB("admin")
admin.createUser(
  {
    user: "admin",
    pwd: "admin",
    roles: [
      "userAdminAnyDatabase",
      "dbAdminAnyDatabase",
      "readWriteAnyDatabase",
      "clusterAdmin"
    ]
  }
)
```


## 2.2 execute init shard-2
```
docker exec -it test-mongo_shard-2-1_1 bash
mongo localhost:27018

# execute 2_init-shard-2.js
rs.initiate(
  {
    _id: "shard-1",
    members: [
      { _id : 0, host : "shard-1-1:27018" },
      { _id : 1, host : "shard-1-2:27018" },
    ]
  }
)
```

## 3. init mongos
```
docker exec -it test-mongo_mongos_1 bash
mongo localhost:27017

# execute 3_init-mongos.js
# auth and check sh.status
admin_db = db.getSiblingDB("admin")
admin_db.auth("admin", "admin")
sh.status()

sh.addShard( "shard-1/shard-1-1:27018,shard-1-2:27018")
sh.addShard( "shard-2/shard-2-1:27018,shard-2-2:27018")
```

sh.addShard( "shard-1/shard-1-1:27018,shard-1-2:27018")
sh.addShard( "shard-2/shard-2-1:27018,shard-2-2:27018")


// set default chunk size, default is 64,
config_db = db.getSiblingDB("config")
config_db.settings.save( { _id:"chunksize", value: 64 } )


sh.enableSharding("test_db")
//sh.shardCollection("<database>.<collection>", { <key> : <direction> } )




// crate a admin user on mongos/config, but not on the sharding nodes.
// if no user exists on database. it should run on the local

// create admin user
admin_db = db.getSiblingDB("admin")
admin_db.createUser(
  {
    user: "admin",
    pwd: "admin",
    roles: [
      "userAdminAnyDatabase",
      "dbAdminAnyDatabase",
      "readWriteAnyDatabase",
      "clusterAdmin"]
  }
)

// auth immediate
admin_db = db.getSiblingDB("admin")
admin_db.auth("admin", "admin")
sh.status()




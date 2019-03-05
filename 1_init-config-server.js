// if mongo start with security mode
// first run should run on localhost:27019

rs.initiate(
  {
    _id: "conf-set",
    configsvr: true,
    members: [
      { _id : 0, host : "config-server-1:27019" },
      { _id : 1, host : "config-server-2:27019" },
      { _id : 2, host : "config-server-3:27019", priority:0}
    ]
  }
)

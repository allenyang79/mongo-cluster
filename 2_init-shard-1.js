rs.initiate(
  {
    _id: "shard-1",
    members: [
      { _id : 0, host : "shard-1-1:27018" },
      { _id : 1, host : "shard-1-2:27018" },
    ]
  }
)

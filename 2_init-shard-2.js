rs.initiate(
  {
    _id: "shard-2",
    members: [
      { _id : 0, host : "shard-2-1:27018" },
      { _id : 1, host : "shard-2-2:27018" },
    ]
  }
)

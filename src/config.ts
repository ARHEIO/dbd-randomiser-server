// env variables are stored as a github secret and imprted in github actions

export default {
  survivor: {
    tableNames: {
      survivors: process.env.DYNAMO_TABLE_SURVIVORS,
      perks: process.env.DYNAMO_TABLE_SURV_PERKS,
      items: process.env.DYNAMO_TABLE_ITEMS,
    }
  },
  killer: {
    tableNames: {
      killers: process.env.DYNAMO_TABLE_KILLERS,
      perks: process.env.DYNAMO_TABLE_KILL_PERKS,
    }
  },
  endpoints: {
    dynamo: process.env.DYNAMO_ENDPOINT
  }
}
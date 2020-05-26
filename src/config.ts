export default {
  survivor: {
    tableNames: {
      survivors: 'dbd-randomiser-survivors',
      perks: 'dbd-randomiser-perks-survivor',
      items: 'dbd-randomiser-items',
    }
  },
  killer: {
    tableNames: {
      killers: 'dbd-randomiser-killers',
      perks: 'dbd-randomiser-perks-killer',
    }
  },
  endpoints: {
    dynamo: "https://dynamodb.ap-southeast-2.amazonaws.com"
  },
  env: process.env.MYVAR
}
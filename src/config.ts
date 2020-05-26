export default {
  tableNames: {
    survivor: {
      survivors: 'dbd-randomiser-survivors',
      perks: 'dbd-randomiser-perks-survivor',
      items: 'dbd-randomiser-items',
    },
    killer: {
      killers: 'dbd-randomiser-killers',
      perks: 'dbd-randomiser-perks-killer',
    }
  },
  endpoints: {
    dynamo: "https://dynamodb.ap-southeast-2.amazonaws.com"
  }
}
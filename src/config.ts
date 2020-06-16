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
    app: process.env.APP_ENDPOINT,
    dynamo: process.env.DYNAMO_ENDPOINT,
  },
  dynamo: {
    maxRetries: 3,
    region: 'ap-southeast-2'
  }
}

export interface IConfig {
  survivor: {
    tableNames: {
      survivors: string;
      perks: string;
      items: string;
    }
  },
  killer: {
    tableNames: {
      killers: string;
      perks: string;
    }
  },
  endpoints: {
    app: string;
    dynamo: string;
  },
  dynamo: {
    maxRetries: number;
    region: string; 
  }
}
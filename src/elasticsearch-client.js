import { Client } from '@elastic/elasticsearch';

export default new Client({
  node:
    'https://search-golaiba-dev-es-a2dpnpq3jbbmbhn73k23cg7hm4.us-east-1.es.amazonaws.com',
  auth: {
    username: 'golaiba-dev',
    password: 'Golaiba-dev0336',
  },
});

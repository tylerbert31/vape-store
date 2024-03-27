import NodeCache from 'node-cache';

const memcache = new NodeCache({ stdTTL: 600, checkperiod: 120});

export default memcache;
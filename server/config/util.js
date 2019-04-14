
process.env.PORT = process.env.PORT || 3000;

process.env.EXPIRED_TIME = '30m';

process.env.SEED = process.env.SEED || 'aa5e8c36-7f46-4de1-a7bb-58c8d4909762';

// ============================
//  uri database
// ============================
let urlDB = 'mongodb://localhost:27017/mystore';

process.env.URLDB = urlDB;
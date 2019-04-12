
process.env.PORT = process.env.PORT || 3000;

process.env.CADUCIDAD_TOKEN = '5m';

process.env.SEED = process.env.SEED || 'localhost_seed_1234';

// ============================
//  Base de datos
// ============================
let urlDB = 'mongodb://localhost:27017/mystore';

process.env.URLDB = urlDB;
const HDWalletProvider = require('@truffle/hdwallet-provider');
const mnemonic = 'vapor order lion moon leave voyage worry call luxury section loyal multiply';
const infuraKey = '0aab7622a51f41b2becdb9458da5e739';

module.exports = {
  contracts_build_directory: "./src/contracts",  
  networks: {
    sepolia: {
      provider: () => new HDWalletProvider(mnemonic, `https://sepolia.infura.io/v3/${infuraKey}`),
      network_id: 11155111,
      gas: 4500000,
      gasPrice: 10000000000
    },
    dashboard : {
        host: "127.0.0.1",     // Localhost (default: none)
        port: 24012,            // Standard Ethereum port (default: none)
        network_id: "*",       // Any network (default: none)
       },
  },
  compilers: {
    solc: {
      version: "0.8.20"
    }
  },
   // Agrega el plugin a la lista de plugins
   plugins: [
    'truffle-plugin-verify'
  ], 
    // Configura las opciones del plugin
    api_keys: {
        //etherscan: process.env.ETHERSCAN_API_KEY // Accede a la API key desde la variable de entorno 
        etherscan: 'W3UVH9T3M5KRBKGKQTUMN6EDBBP298MQGY'
      }
    
};

var HDWalletProvider = require("truffle-hdwallet-provider");
const MNEMONIC = 'e5824488fcef26c6ccc60af208f0b0d56286f8545fe7d5747be6a18359f524c6';

module.exports = {
    // Uncommenting the defaults below
    // provides for an easier quick-start with Ganache.
    // You can also follow this format for other networks;
    // see <http://truffleframework.com/docs/advanced/configuration>
    // for more details on how to specify configuration options!
    //
    networks: {
        // development: {
        //     host: "127.0.0.1",
        //     port: 7545,
        //     network_id: "*"
        // },
        // test: {
        //     host: "127.0.0.1",
        //     port: 7545,
        //     network_id: "*"
        // },
        ropsten: {
            provider: function () {
                return new HDWalletProvider(MNEMONIC, "https://ropsten.infura.io/v3/cc8d19ee21984baeafffa1713b390016")
            },
            network_id: 3,
            gas: 1000000      //make sure this gas allocation isn't over 4M, which is the max
        },
        kovan: {
            provider: function () {
                return new HDWalletProvider(MNEMONIC, "https://kovan.infura.io/v3/cc8d19ee21984baeafffa1713b390016")
            },
            network_id: 42,
            gas: 10000000      //make sure this gas allocation isn't over 4M, which is the max
        },
    },
    mocha: {
        enableTimeouts: false
    },
    compilers: {
        solc: {
            version: "0.6.12"
        }
    },
    plugins: [
        'truffle-plugin-verify'
    ],
    api_keys: {
        etherscan: '2TMVTRQJJFZ8HV2C9XNJPEM9FU34RWNGKW'
    }
};

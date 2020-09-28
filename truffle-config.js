const HDWalletProvider = require("truffle-hdwallet-provider");

const keys = require("./keys");
const setPendingAdminMethod = 'setPendingAdmin'
const addPoolMethod = 'addPool'
const setPointMethod = 'setPoint'
const transferOwnershipMethod = 'transferOwnership'
const setMigratorMethod = 'setMigratorMethod'

const executeTransaction = 'executeTransaction'
const queueTransaction = 'queueTransaction'
const cancelTransaction = 'cancelTransaction'
const privateKeys =[keys.keys.BOB, keys.keys.ALICE, keys.keys.JAMES, keys.keys.JACK, keys.keys.LISA]

module.exports = {
    methods: {
        setPendingAdminMethod,
        addPoolMethod,
        setPointMethod,
        transferOwnershipMethod,
        setMigratorMethod
    },

    txTypes:{
        executeTransaction,
        queueTransaction,
        cancelTransaction
    },

    networks: {
        development: {
            host: "127.0.0.1",
            network_id: "*",
            port: 7245,
            gas: 4000000,
            gasPrice: 10000000000, // 10 gwei
        },

        ropsten: {
            provider: function () {
                return new HDWalletProvider(keys.keys.BOB, "https://ropsten.infura.io/v3/cc8d19ee21984baeafffa1713b390016")
            },
            network_id: 3,
            gas: 1000000      //make sure this gas allocation isn't over 4M, which is the max
        },
        kovan: {
            provider: function () {
                return new HDWalletProvider(privateKeys, "https://kovan.infura.io/v3/cc8d19ee21984baeafffa1713b390016", 0, privateKeys.length)
            },
            network_id: 42,
            gas: 1000000,      //make sure this gas allocation isn't over 4M, which is the max
            gasPrice : 10000000000, //10 GWei
            contracts : {
                // sashimi : '0x9EB246347d5055440ADC1eC10a040d4d627abA56',
                // migrator : '0xB4f85885C31588bE5e981124eF72fe84037cC5AB',
                timeLock: '0x2f8ab5cD7179B3d42d177a45B18cF7C8FF8EFA77',
                chef: '0xEFAacB61604b0185c446B3039b111AF836dA8Ff2'
            }
        },
        mainnet: {
            provider: function () {
                return new HDWalletProvider(privateKeys, "https://mainnet.infura.io/v3/cc8d19ee21984baeafffa1713b390016", 0, privateKeys.length)
                // return new HDWalletProvider(privateKeys, "https://api.infura.io/v1/jsonrpc/mainnet", 0, privateKeys.length)
                // return new HDWalletProvider(privateKeys, "https://main-rpc.linkpool.io", 0, privateKeys.length)
            },
            network_id: 1,
            gas: 200000,      //make sure this gas allocation isn't over 4M, which is the max
            gasPrice : 160000000000, //160 GWei
            contracts : {
                // sashimi : '0x9EB246347d5055440ADC1eC10a040d4d627abA56',
                // migrator : '0xB4f85885C31588bE5e981124eF72fe84037cC5AB',
                timeLock: '0x84eE348617563944FFD4a23843e086A7dC0224f3',
                chef: '0x1DaeD74ed1dD7C9Dabbe51361ac90A69d851234D'
            }
        }
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
    },

    setMigrator : {
        migrator : "0x295E3331A35DD834EE76c305a8c3eD189A4Ac8Ae"
    },

    transferOwnership : {
        newOwner : '0x84eE348617563944FFD4a23843e086A7dC0224f3',
    },

    setPendingAdmin : {
        pendingAdmin : keys.address.alice,
    },

    addPool: {
        lpAddress : '0x96559937e9c4475160CA040b16cDA93E3EfBD75A',
        allocPoint: '500',
    },

    setAllocPoint : {
        pid : '22',
        allocPoint : '1000',
    },

    // transaction : setPendingAdminMethod,
    transaction : addPoolMethod,
    // transaction : setPointMethod,
    // transaction : transferOwnershipMethod,
    // transaction : setMigratorMethod,

    timeLockType: queueTransaction,
    // timeLockType: executeTransaction,
    // timeLockType: cancelTransaction,

    sender : keys.address.bob,
    // sender : keys.address.lisa,

    // delay : 3,
    delay : 1470,  // in minutes, 1 day + 30 min

    etaNumber: 1601291405,
};


// https://abi.hashex.org/   abi encoder
// NOTE: Use the swap&pair as their existing contracts(https://kovan.etherscan.io/address/0x5c69bee701ef814a2b6a3edd4b1652cb9cc5aa6f, https://kovan.etherscan.io/address/0xB10cf58E08b94480fCb81d341A63295eBb2062C2#code)
// https://kovan.etherscan.io/address/0x69d433d206368c1d61edb687a41e50cb14cf8013  uniswapfactory v0.5.16+commit.9c3226ce  Optimized
// https://kovan.etherscan.io/address/0x078037fd8baae816a10299252c3f15312e22da6e#code uniswappair v0.5.16+commit.9c3226ce Optimized
// https://kovan.etherscan.io/address/0xB4f85885C31588bE5e981124eF72fe84037cC5AB#code Migrator v0.6.12+commit.27d51765
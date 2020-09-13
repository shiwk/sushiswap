const {_, time} = require('@openzeppelin/test-helpers');
const ethers = require('ethers');
const SashimiToken = artifacts.require('SashimiToken');
const Timelock = artifacts.require('Timelock');
const config = require('../truffle-config')
const Web3 = require('web3');
let web3;

const argv = require('minimist')(process.argv.slice(2), {string: ['network']});
const readlineSync = require('readline-sync');


function encodeParameters(types, values) {
    const abi = new ethers.utils.AbiCoder();
    try {
        return abi.encode(types, values);
    } catch (e) {
        console.log(e);
    }
}

async function latestBlockTIme() {
    const block = await web3.eth.getBlock('latest');
    return new web3.utils.BN(block.timestamp);
}

async function setTimeLockPendingAdminQueueTransaction(alice) {
    console.log('setTimeLockPendingAdminQueueTransaction..');
    let lastest = await latestBlockTIme();
    console.log('latest: ', lastest.toString());
    let eta = lastest.add(time.duration.minutes(10));
    console.log('eta: ', eta.toString())

    let accounts = await web3.eth.getAccounts();
    // console.log('bob:', bobAccount)

    let params = encodeParameters(['address'], [accounts[1]]);
    console.log('params', params.toString())
    await this.timelock.queueTransaction(
        this.timelock.address, '0', 'setPendingAdmin(address)',
        params,
        eta,
        {from: alice}
    ).then(function (t) {
        console.log("Transaction - :", t)
    }).catch(function (e) {
        console.log(e);
    });
}

async function setTimeLockPendingAdminExecuteTransaction(alice, etaNumber) {
    console.log('setTimeLockPendingAdminExecuteTransaction..');
    let accounts = await web3.eth.getAccounts();
    let eta = new web3.utils.BN(etaNumber);
    console.log('eta: ', eta.toString())

    let params = encodeParameters(['address'], [accounts[1]]);
    console.log('params', params.toString())
    await this.timelock.executeTransaction(
        this.timelock.address, '0', 'setPendingAdmin(address)',
        params,
        eta,
        {from: alice}
    ).then(function (t) {
        console.log("Transaction - :", t)
    }).catch(function (e) {
        console.log(e);
    });
}


async function setMigratorQueueTransaction(bob, migrator) {
    console.log('setMigratorQueueTransaction..');

    let lastest = await latestBlockTIme();
    console.log('latest: ', lastest.toString());
    let eta = lastest.add(time.duration.minutes(3));
    console.log('eta: ', eta.toString())


    let params = encodeParameters(['address'], [migrator]);
    console.log('params', params.toString())
    await this.timelock.queueTransaction(
        this.chef.address, '0', 'setMigrator(address)',
        params,
        eta,
        {from: bob}
    ).then(function (t) {
        console.log("Transaction - :", t)
    }).catch(function (e) {
        console.log(e);
    });
}

async function setMigratorExecuteTransaction(bob, etaNumber, migrator) {
    console.log('setMigratorExecuteTransaction..');
    let eta = new web3.utils.BN(etaNumber);
    console.log('eta: ', eta.toString())

    let params = encodeParameters(['address'], [migrator]);
    console.log('params', params.toString())
    await this.timelock.executeTransaction(
        this.chef.address, '0', 'setMigrator(address)',
        params,
        eta,
        {from: bob}
    ).then(function (t) {
        console.log("Transaction - :", t)
    }).catch(function (e) {
        console.log(e);
    });
}


async function addPoolQueueTransaction(bob) {
    console.log('addPoolQueueTransaction..');

    let lastest = await latestBlockTIme();
    console.log('latest: ', lastest.toString());
    let eta = lastest.add(time.duration.minutes(config.addPool.delay));
    console.log('eta: ', eta.toString())

    let allocPoint = config.addPool.allocPoint;
    let lpToken = config.addPool.lpAddress;

    let params = encodeParameters(['uint256', 'address', 'bool'], [allocPoint, lpToken, false]);
    console.log('params', params.toString())
    await this.timelock.queueTransaction(
        this.chef.address, '0', 'add(uint256,address,bool)',
        params,
        eta,
        {from: bob}
    ).then(function (t) {
        console.log("Transaction - :", t)
    }).catch(function (e) {
        console.log(e);
    });
}

async function addPoolExecuteTransaction(bob) {
    console.log('addPoolExecuteTransaction..');
    let eta = new web3.utils.BN(config.etaNumber);
    console.log('eta: ', eta.toString())

    let allocPoint = config.addPool.allocPoint;
    let lpToken = config.addPool.lpAddress;

    let params = encodeParameters(['uint256', 'address', 'bool'], [allocPoint, lpToken, false]);
    console.log('params', params.toString())

    await this.timelock.executeTransaction(
        this.chef.address, '0', 'add(uint256,address,bool)',
        params,
        eta,
        {from: bob}
    ).then(function (t) {
        console.log("Transaction - :", t)
    }).catch(function (e) {
        console.log(e);
    });
}

async function setPointQueueTransaction(bob) {
    console.log('setPointQueueTransaction..');

    let lastest = await latestBlockTIme();
    console.log('latest: ', lastest.toString());
    let eta = lastest.add(time.duration.minutes(config.setAllocPoint.delay));
    console.log('eta: ', eta.toString())

    let pid = config.setAllocPoint.pid;
    let allocPoint = config.setAllocPoint.allocPoint
    let params = encodeParameters(['uint256', 'uint256', 'bool'], [pid, allocPoint, false]);
    console.log('params', params.toString())
    await this.timelock.queueTransaction(
        this.chef.address, '0', 'set(uint256,uint256,bool)',
        params,
        eta,
        {from: bob}
    ).then(function (t) {
        console.log("Transaction - :", t)
    }).catch(function (e) {
        console.log(e);
    });
}


async function setPointExecuteTransaction(bob) {
    console.log('setPointExecuteTransaction..');

    let pid = config.setAllocPoint.pid;
    let allocPoint = config.setAllocPoint.allocPoint
    let eta = new web3.utils.BN(config.etaNumber);
    console.log('eta: ', eta.toString())

    let params = encodeParameters(['uint256', 'uint256', 'bool'], [pid, allocPoint, false]);
    console.log('params', params.toString())
    await this.timelock.executeTransaction(
        this.chef.address, '0', 'set(uint256,uint256,bool)',
        params,
        eta,
        {from: bob}
    ).then(function (t) {
        console.log("Transaction - :", t)
    }).catch(function (e) {
        console.log(e);
    });
}

async function useKovanProvider() {
    console.log('using kovan provider..')
    web3 = new Web3(config.networks.kovan.provider());
    this.chef = await SashimiToken.at(config.networks.kovan.contracts.chef);
    this.timelock = await Timelock.at(config.networks.kovan.contracts.timeLock);
    // this.sashimi = await SashimiToken.at(config.networks.kovan.contracts.sashimi);
}

async function useMainnetProvider() {
    console.log('using mainnet provider..')
    web3 = new Web3(config.networks.mainnet.provider());
    this.chef = await SashimiToken.at(config.networks.mainnet.contracts.chef);
    this.timelock = await Timelock.at(config.networks.mainnet.contracts.timeLock);
    // this.sashimi = await SashimiToken.at(config.networks.mainnet.contracts.sashimi);
}

module.exports = async function () {

    // let now = await latestBlockTIme();
    // console.log('latest: ', now.toString());

    console.log(`network: ${argv['network']}\n`
        + `transaction: ${config.transaction}\n`
        + `time lock type: ${config.timeLockType}\n`
    + `etaNumber: ${config.etaNumber}\n`);
    // + `now: ${now.toString()}\n`);

    if (readlineSync.keyInYN('Are you sure?')) {
        // 'Y' key was pressed.
        console.log('Yes.');
        // Do something...
    } else {
        // Another key was pressed.
        console.log('No.');
        return;
    }

    if (argv['network'] === 'kovan') {
        await useKovanProvider()
    } else if (argv['network'] === 'mainnet') {
        await useMainnetProvider();
    }

    let alice = '0x2D4E11221b960E4Ed6D0D2358e26b9c89DfF404a'
    let bob = '0x0FaEF44d1373F6fdE75926E4564baB5B2d645944'
    let jack = '0x8a2a5c5e4902bC5f3C2214aa37567Dc901F874d4'
    console.log('alice: ', alice);
    console.log('bob: ', bob);

    // await setTimeLockPendingAdminQueueTransaction(alice);
    // await setTimeLockPendingAdminExecuteTransaction(alice, 1599919220);
    // await setMigratorQueueTransaction(bob , '0xB4f85885C31588bE5e981124eF72fe84037cC5AB');
    // await setMigratorExecuteTransaction(bob, 1599930352, '0xB4f85885C31588bE5e981124eF72fe84037cC5AB');

    if (config.transaction === 'setPoint' && config.timeLockType === 'queue')
        await setPointQueueTransaction(bob);
    else if (config.transaction === 'setPoint' && config.timeLockType === 'execute')
        await setPointExecuteTransaction(bob);
    else if (config.transaction === 'addPool' && config.timeLockType === 'queue')
        await addPoolQueueTransaction(bob);
    else if (config.transaction === 'addPool' && config.timeLockType === 'execute')
        await addPoolExecuteTransaction(bob);

    console.log('End.');
}


// https://abi.hashex.org/   abi encoder
// NOTE: Use the swap&pair as their existing contracts(https://kovan.etherscan.io/address/0x5c69bee701ef814a2b6a3edd4b1652cb9cc5aa6f, https://kovan.etherscan.io/address/0xB10cf58E08b94480fCb81d341A63295eBb2062C2#code)
// https://kovan.etherscan.io/address/0x69d433d206368c1d61edb687a41e50cb14cf8013  uniswapfactory v0.5.16+commit.9c3226ce  Optimized
// https://kovan.etherscan.io/address/0x078037fd8baae816a10299252c3f15312e22da6e#code uniswappair v0.5.16+commit.9c3226ce Optimized
// https://kovan.etherscan.io/address/0xB4f85885C31588bE5e981124eF72fe84037cC5AB#code Migrator v0.6.12+commit.27d51765


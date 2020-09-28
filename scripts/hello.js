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

async function setTimeLockPendingAdminQueueTransaction(sender) {
    console.log('setTimeLockPendingAdmin - Queue - Transaction..');
    let lastest = await latestBlockTIme();
    console.log('latest: ', lastest.toString());
    let eta = lastest.add(time.duration.minutes(config.delay));
    console.log('eta: ', eta.toString())


    let newPendingOwner = config.setPendingAdmin.pendingAdmin;
    let params = encodeParameters(['address'], [newPendingOwner]);
    console.log('params', params.toString())
    await this.timelock.queueTransaction(
        this.timelock.address, '0', 'setPendingAdmin(address)',
        params,
        eta,
        {from: sender}
    ).then(function (t) {
        console.log("Transaction - :", t)
    }).catch(function (e) {
        console.log(e);
    });
}

async function setTimeLockPendingAdminExecuteTransaction(sender) {
    console.log('setTimeLockPendingAdmin - Execute - Transaction..');
    let eta = new web3.utils.BN(config.etaNumber);
    console.log('eta: ', eta.toString())

    let newPendingOwner = config.setPendingAdmin.pendingAdmin;
    let params = encodeParameters(['address'], [newPendingOwner]);
    console.log('params', params.toString())
    await this.timelock.executeTransaction(
        this.timelock.address, '0', 'setPendingAdmin(address)',
        params,
        eta,
        {from: sender}
    ).then(function (t) {
        console.log("Transaction - :", t)
    }).catch(function (e) {
        console.log(e);
    });
}


async function setMigratorQueueTransaction(sender) {
    console.log('setMigratorQueueTransaction..');

    let lastest = await latestBlockTIme();
    console.log('latest: ', lastest.toString());
    let eta = lastest.add(time.duration.minutes(config.delay));
    console.log('eta: ', eta.toString())

    let migrator = config.setMigrator.migrator;
    let params = encodeParameters(['address'], [migrator]);
    console.log('params', params.toString())
    await this.timelock.queueTransaction(
        this.chef.address, '0', 'setMigrator(address)',
        params,
        eta,
        {from: sender}
    ).then(function (t) {
        console.log("Transaction - :", t)
    }).catch(function (e) {
        console.log(e);
    });
}

async function setMigratorExecuteTransaction(sender) {
    console.log('setMigratorExecuteTransaction..');
    let eta = new web3.utils.BN(config.etaNumber);
    console.log('eta: ', eta.toString())

    let migrator = config.setMigrator.migrator;
    let params = encodeParameters(['address'], [migrator]);
    console.log('params', params.toString())
    await this.timelock.executeTransaction(
        this.chef.address, '0', 'setMigrator(address)',
        params,
        eta,
        {from: sender}
    ).then(function (t) {
        console.log("Transaction - :", t)
    }).catch(function (e) {
        console.log(e);
    });
}


async function transferOwnershipQueueTransaction(sender) {
    console.log('transferOwnership-Queue-Transaction..');

    let lastest = await latestBlockTIme();
    console.log('latest: ', lastest.toString());
    let eta = lastest.add(time.duration.minutes(config.delay));
    console.log('eta: ', eta.toString())

    let newOwner = config.transferOwnership.newOwner;
    let params = encodeParameters(['address'], [newOwner]);
    console.log('params', params.toString())
    await this.timelock.queueTransaction(
        this.chef.address, '0', 'transferOwnership(address)',
        params,
        eta,
        {from: sender}
    ).then(function (t) {
        console.log("Transaction - :", t)
    }).catch(function (e) {
        console.log(e);
    });
}

async function transferOwnershipExecuteTransaction(sender) {
    console.log('transferOwnership-Execute-Transaction..');
    let eta = new web3.utils.BN(config.etaNumber);
    console.log('eta: ', eta.toString())

    let newOwner = config.transferOwnership.newOwner;
    let params = encodeParameters(['address'], [newOwner]);

    console.log('params', params.toString())
    await this.timelock.executeTransaction(
        this.chef.address, '0', 'transferOwnership(address)',
        params,
        eta,
        {from: sender}
    ).then(function (t) {
        console.log("Transaction - :", t)
    }).catch(function (e) {
        console.log(e);
    });
}

async function addPoolQueueTransaction(sender) {
    console.log('addPoolQueueTransaction..');

    let lastest = await latestBlockTIme();
    console.log('latest: ', lastest.toString());
    let eta = lastest.add(time.duration.minutes(config.delay));
    console.log('eta: ', eta.toString())

    let allocPoint = config.addPool.allocPoint;
    let lpToken = config.addPool.lpAddress;

    let params = encodeParameters(['uint256', 'address', 'bool'], [allocPoint, lpToken, false]);
    console.log('params', params.toString())
    await this.timelock.queueTransaction(
        this.chef.address, '0', 'add(uint256,address,bool)',
        params,
        eta,
        {from: sender}
    ).then(function (t) {
        console.log("Transaction - :", t)
    }).catch(function (e) {
        console.log(e);
    });
}

async function addPoolExecuteTransaction(sender) {
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
        {from: sender}
    ).then(function (t) {
        console.log("Transaction - :", t)
    }).catch(function (e) {
        console.log(e);
    });
}

async function setPointQueueTransaction(sender) {
    console.log('setPointQueueTransaction..');

    let lastest = await latestBlockTIme();
    console.log('latest: ', lastest.toString());
    let eta = lastest.add(time.duration.minutes(config.delay));
    console.log('eta: ', eta.toString())

    let pid = config.setAllocPoint.pid;
    let allocPoint = config.setAllocPoint.allocPoint
    let params = encodeParameters(['uint256', 'uint256', 'bool'], [pid, allocPoint, false]);
    console.log('params', params.toString())
    await this.timelock.queueTransaction(
        this.chef.address, '0', 'set(uint256,uint256,bool)',
        params,
        eta,
        {from: sender}
    ).then(function (t) {
        console.log("Transaction - :", t)
    }).catch(function (e) {
        console.log(e);
    });
}


async function setPointExecuteTransaction(sender) {
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
        {from: sender}
    ).then(function (t) {
        console.log("Transaction - :", t)
    }).catch(function (e) {
        console.log(e);
    });
}

async function setPointCancelTransaction(sender) {
    console.log('setPointCancelTransaction..');

    let pid = config.setAllocPoint.pid;
    let allocPoint = config.setAllocPoint.allocPoint
    let eta = new web3.utils.BN(config.etaNumber);
    console.log('eta: ', eta.toString())

    let params = encodeParameters(['uint256', 'uint256', 'bool'], [pid, allocPoint, false]);
    console.log('params', params.toString())
    await this.timelock.cancelTransaction(
        this.chef.address, '0', 'set(uint256,uint256,bool)',
        params,
        eta,
        {from: sender}
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
    console.log(`network: ${argv['network']}\n`
        + `transaction: ${config.transaction}\n`
        + `time lock type: ${config.timeLockType}\n`
        + `etaNumber: ${config.etaNumber}\n`
        + `sender: ${config.sender}`);

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

    if (config.transaction === config.methods.setPointMethod) {
        if (config.timeLockType === config.txTypes.queueTransaction)
            await setPointQueueTransaction(config.sender);
        else if (config.timeLockType === config.txTypes.executeTransaction)
            await setPointExecuteTransaction(config.sender);
        else if (config.timeLockType === config.txTypes.cancelTransaction)
            await setPointCancelTransaction(config.sender);
    }
    else if (config.transaction === config.methods.addPoolMethod) {
        if (config.timeLockType === config.txTypes.queueTransaction)
            await addPoolQueueTransaction(config.sender);
        else if ( config.timeLockType === config.txTypes.executeTransaction)
            await addPoolExecuteTransaction(config.sender);
    }
    else if (config.transaction === config.methods.transferOwnershipMethod) {
        if (config.timeLockType === config.txTypes.queueTransaction)
            await transferOwnershipQueueTransaction(config.sender);
        else if (config.timeLockType === config.txTypes.executeTransaction)
            await transferOwnershipExecuteTransaction(config.sender);
    } else if (config.transaction === config.methods.setPendingAdminMethod) {
        if (config.timeLockType === config.txTypes.queueTransaction)
            await setTimeLockPendingAdminQueueTransaction(config.sender);
        else if (config.timeLockType === config.txTypes.executeTransaction)
            await setTimeLockPendingAdminExecuteTransaction(config.sender);
    }
    else if (config.transaction === config.methods.setMigratorMethod) {
        if (config.timeLockType === config.txTypes.queueTransaction)
            await setMigratorQueueTransaction(config.sender);
        else if (config.timeLockType === config.txTypes.executeTransaction)
            await setMigratorExecuteTransaction(config.sender);
    }

    console.log('End.');
}





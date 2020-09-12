const { _, time } = require('@openzeppelin/test-helpers');
const ethers = require('ethers');
const SushiToken = artifacts.require('SushiToken');
const Timelock = artifacts.require('Timelock');
const config = require('../truffle-config')
const Web3 = require('web3');
const web3 = new Web3(config.networks.kovan.provider());


function encodeParameters(types, values) {
    const abi = new ethers.utils.AbiCoder();
    try{
        return abi.encode(types, values);
    }catch(e) {
        console.log(e);
    }
}

async function latestBlockTIme() {
    const block = await web3.eth.getBlock('latest');
    return new web3.utils.BN(block.timestamp);
}

async function setTimeLockPendingAdminQueueTransaction(alice, bob) {

    let lastest = await latestBlockTIme();
    console.log('latest: ', lastest.toString());
    let eta = lastest.add(time.duration.minutes(10));
    console.log('eta: ', eta.toString())

    let accounts = await web3.eth.getAccounts();
    // console.log('bob:', bobAccount)

    let params = encodeParameters(['address'], [accounts[0]]);
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

    let accounts = await web3.eth.getAccounts();
    let eta = new web3.utils.BN(etaNumber);
    console.log('eta: ', eta.toString())

    let params = encodeParameters(['address'], [accounts[0]]);
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
    this.chef = await SushiToken.at("0x1DaeD74ed1dD7C9Dabbe51361ac90A69d851234D");
    this.timelock = await Timelock.at("0x42bF80A92734de221889049e91187a07464607B1");
    // console.log(this.sushi.address);
    console.log('hello2');

    let lastest = await latestBlockTIme();
    console.log('latest: ', lastest.toString());
    let eta = lastest.add(time.duration.minutes(3));
    console.log('eta: ', eta.toString())

    // let accounts = await web3.eth.getAccounts();
    // console.log('bob:', bobAccount)

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


module.exports = async function () {
    this.chef = await SushiToken.at("0x1DaeD74ed1dD7C9Dabbe51361ac90A69d851234D");
    this.timelock = await Timelock.at("0x42bF80A92734de221889049e91187a07464607B1");
    this.sushi = await SushiToken.at("0x9EB246347d5055440ADC1eC10a040d4d627abA56");

    let alice = '0x2D4E11221b960E4Ed6D0D2358e26b9c89DfF404a'
    let bob = '0x0FaEF44d1373F6fdE75926E4564baB5B2d645944'
    console.log('alice: ', alice);
    console.log('bob: ', bob);

    // await setTimeLockPendingAdminQueueTransaction(alice);
    // await setTimeLockPendingAdminExecuteTransaction(alice, 1599919220);
    // await setMigratorQueueTransaction(bob , '0xB4f85885C31588bE5e981124eF72fe84037cC5AB');
    await setMigratorExecuteTransaction(bob, 1599930352, '0xB4f85885C31588bE5e981124eF72fe84037cC5AB');

    console.log('hello end');
}


// https://abi.hashex.org/   abi encoder
// NOTE: Use the swap&pair as their existing contracts(https://kovan.etherscan.io/address/0x5c69bee701ef814a2b6a3edd4b1652cb9cc5aa6f, https://kovan.etherscan.io/address/0xB10cf58E08b94480fCb81d341A63295eBb2062C2#code)
// https://kovan.etherscan.io/address/0x69d433d206368c1d61edb687a41e50cb14cf8013  uniswapfactory v0.5.16+commit.9c3226ce  Optimized
// https://kovan.etherscan.io/address/0x078037fd8baae816a10299252c3f15312e22da6e#code uniswappair v0.5.16+commit.9c3226ce Optimized
// https://kovan.etherscan.io/address/0xB4f85885C31588bE5e981124eF72fe84037cC5AB#code Migrator v0.6.12+commit.27d51765
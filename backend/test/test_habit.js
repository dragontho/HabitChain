const _deploy_contracts = require("../migrations/2_deploy_contracts");
const truffleAssert = require('truffle-assertions');
var assert = require('assert');

var Habit = artifacts.require("../contracts/Habit.sol");

contract('Habit', function(accounts) {

    before(async () => {
        habitInstance = await Habit.deployed();
    });
    console.log("Testing Habit Contract");

    it('Create Habit', async () => {
        // Corresponds to 0.1 ETH
        let makeHabit = await habitInstance.createHabit(1000, {from: accounts[1]});


        assert.notStrictEqual(
            makeHabit,
            undefined,
            "Failed to make habit"
        );

    });

    it('Verify habit fields', async () => {
        let _s_time = await habitInstance.getStartTime(0)
        let _e_time = await habitInstance.getEndTime(0)
        let _owner = await habitInstance.getOwner(0)

        assert.strictEqual(
            _s_time.toNumber(),
            1000,
            "Start time not created properly"
        )

        assert.strictEqual(
            _e_time.toNumber(),
            433000,
            "End time not created properly or using wrong measurements"
        )

        assert.strictEqual(
            _owner,
            accounts[1],
            "Owner not set properly"
        )

    })

});
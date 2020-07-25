var Voter = artifacts.require('Voter');

contract('Voter', accounts => {

    const user0 = accounts[0];
    const user1 = accounts[1];

    describe('Does it add candidate', function () {
        beforeEach(async function () { 
            this.contract = await Voter.new({from: accounts[0]});
        })

        it('should add candidate', async function () { 
            await this.contract.addCandidate(accounts[1]);
            assert.equal(await this.contract.candidates.call(0), accounts[1], "FAIL! user1 not added");
        })

        it('should vote for candidate', async function () { 
            await this.contract.vote(accounts[1], {from: accounts[2]});
            assert.equal(await this.contract.getVotes.call(accounts[1]), 1, "FAIL!  user1 not voted for");
        })
    });

    describe('have ownership properties', function () {
        beforeEach(async function () { 
            this.contract = await Voter.new({from: accounts[0]});
        })

        it('should add candidate', async function () { 
            try {
                await this.contract.addCandidate(accounts[3], {from: accounts[2]});
                throw ("Error Not Thrown");
            } catch (e) {
                assertResponse = e === "Error Not Thrown" ? false: true;
                assert.notEqual (e, "Error Not Thrown", "FAIL! Non owner could add candidate"); 
            }           
        })
    });
})
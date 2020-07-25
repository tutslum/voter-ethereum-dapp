var Voter = artifacts.require('Voter');

contract('Voter', accounts => {


    describe('Does it add candidate', function () {
        beforeEach(async function () { 
            this.contract = await Voter.new( {from: accounts[0]} );
        })

        it('should add candidate', async function () { 
            await this.contract.addCandidate(accounts[1]);
            assert.equal(await this.contract.candidates.call(0), accounts[1], "FAILED! user1 is not added" );
        });
        it('should vote for a  candidate', async function () { 
            await this.contract.vote(accounts[1], {from: accounts[2]});
            assert.equal(await this.contract.getVotes.call(accounts[1]), 1, "FAILED! user1 is not voted for" );
        });

    });

    describe('have ownership properties', function () {
        beforeEach(async function () { 
            this.contract = await Voter.new( {from: accounts[0]} );
        })

        it('should add candidate', async function () { 
            try {
                await this.contract.addCandidate(accounts[2], {from: accounts[3]});
                throw("Error not thrown");
            } catch (e) {
                assert.notEqual(e, "Error not thrown", "FAIL! Not owner could add a candidate");
            }
            

        })
    });
})
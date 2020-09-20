const contract = require('truffle-contract');
const votacion = require('../contracts/Voting.json');
var Voting = contract(votacion);

module.exports = {
    start: function (callback) {
        //var self = this;
        // Bootstrap the MetaCoin abstraction for Use.
        Voting.setProvider(this.web3.currentProvider);
        // Get the initial account balance so it can be displayed.
        self.web3.eth.getAccounts(function (err, accs) {
            if (err != null) {
                console.log("There was an error fetching your accounts.");
                return;
            }

            if (accs.length == 0) {
                console.log("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
                return;
            }
            self.accounts = accs;
            self.account = self.accounts[2];

            callback(this.accounts);
        });
    },
    numeroCandidatos: function (callback) {
        Voting.setProvider(this.web3.currentProvider);
        var meta;
        Voting.deployed().then(function (instance) {
            meta = instance;
            return meta.candidatesCount.call({ from: '0x3Da923F73f1aB822f33DDd7482ccaB71fbE9B273' });
        }).then(function (value) {
            callback(value.valueOf());
        }).catch(function (e) {
            console.log(e);
            callback("Error 404 c");
        });
    },
    candidatos:function (number,callback) {
        
        Voting.setProvider(this.web3.currentProvider);
        var meta;
        Voting.deployed().then(function (instance) {
            meta = instance;
            return meta.candidates.call(number,{ from: '0x3Da923F73f1aB822f33DDd7482ccaB71fbE9B273' });
        }).then(function (value) {
            callback(value.valueOf());
        }).catch(function (e) {
            console.log(e);
            callback("Error 404");
        });
    },
    votar: function(id, account, callback){
    Voting.setProvider(this.web3.currentProvider);

    var meta;
    Voting.deployed().then(function(instance) {
      meta = instance;
      return meta.vote(id, {from: account});
    }).then(function(response) {
        callback(response);
    }).catch(function(e) {
      console.log(e);
      callback("ERROR 404");
    });
    },
    agregarCandidato: function(name,account, callback){
        Voting.setProvider(this.web3.currentProvider);

        var meta;
        Voting.deployed().then(function(instance) {
          meta = instance;
          return meta.addCandidate(name, {from: account});
        }).then(function(response) {
            callback(response);
        }).catch(function(e) {
          console.log(e);
          callback("ERROR 404");
        }); 
    }
}
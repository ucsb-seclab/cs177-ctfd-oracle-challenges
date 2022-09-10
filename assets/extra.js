getChallenge = function() {
    var challenge_id = parseInt(CTFd.lib.$('#challenge-id').val())
    var url = "/plugins/oracle_challenges/" + challenge_id;
  
    var params = {
        'force_new': false
    };
  
    CTFd.fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        body: JSON.stringify(params)
    }).then(function (response, reject) {
        response.text();
    }).then(function (response, reject) {
        CTFd.lib.$("#oracle-details").html(response);
    });
  };
  
  newChallenge = function() {
    var challenge_id = parseInt(CTFd.lib.$('#challenge-id').val());
    var url = "/plugins/oracle_challenges/" + challenge_id;
  
    var params = {
        'force_new': true
    };
  
    CTFd.fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        body: JSON.stringify(params)
    }).then(function (response) {
        return response.text();
    }).then(function (response) {
        CTFd.lib.$("#oracle-details").html(response);
    });
  };
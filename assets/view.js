CTFd._internal.challenge.data = undefined;

// TODO: Remove in CTFd v4.0
CTFd._internal.challenge.renderer = null;

CTFd._internal.challenge.preRender = function() {};

// TODO: Remove in CTFd v4.0
CTFd._internal.challenge.render = null;


// This retrieve the current state of the challenge oracle.
CTFd._internal.challenge.postRender = function() {
  
  document.getElementById("new-instance-button").onclick = newChallenge

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
        return response.text()
  }).then(function (response, reject) {
      CTFd.lib.$("#oracle-details").html(response);
  });
};


CTFd._internal.challenge.submit = function(preview) {
  var challenge_id = parseInt(CTFd.lib.$("#challenge-id").val());
  var submission = CTFd.lib.$("#challenge-input").val();

  var body = {
    challenge_id: challenge_id,
    submission: submission
  };
  var params = {};
  if (preview) {
    params["preview"] = true;
  }

  return CTFd.api.post_challenge_attempt(params, body).then(function(response) {
    if (response.status === 429) {
      // User was ratelimited but process response
      return response;
    }
    if (response.status === 403) {
      // User is not logged in or CTF is paused.
      return response;
    }
    return response;
  });
};


newChallenge = function() {
  console.log("CUAON")
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
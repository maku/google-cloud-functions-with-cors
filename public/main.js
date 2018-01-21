var projectId, server, serverLocal;

function createUrl(server, functionName) {
  return server + '/' + functionName;
}

function callCloudFunction(url) {
  if (!projectId) {
    alert('You have to provide a Project ID');
    return;
  }
  httpGetAsync(url, showResult);
}

function httpGetAsync(theUrl, callback) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function () {
    if (xmlHttp.readyState===4) {
      if (xmlHttp.status===200) {
        callback(xmlHttp.responseText);
      } else {
        showResult('Error on call ' + theUrl + ' status ' + xmlHttp.status);
      }
    }
  };
  xmlHttp.open("GET", theUrl, true); // true for asynchronous
  xmlHttp.send(null);
}

function showResult(result) {
  document.getElementById('result').innerText = result;
  console.log('result', result);
}

function init() {
  if (window.localStorage) {
    var id = window.localStorage.getItem('gfProjectId');
    if (id && id!=='undefined') {
      document.getElementById('projectId').value = id;
      setProjectId(id);
    }
  }

}

function setProjectId(value) {
  console.log('setProjectId', value);
  projectId = value;
  server = 'https://us-central1-' + projectId + '.cloudfunctions.net';
  serverLocal = 'http://localhost:5000/' + projectId + '/us-central1';

  if (window.localStorage) {
    window.localStorage.setItem('gfProjectId', value);
  }
}
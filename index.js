function getRepositories(){
  const req = new XMLHttpRequest();
  req.addEventListener("load", displayRepositories);
  let username = document.getElementById("username").value
  req.open("GET", 'https://api.github.com/users/'+ username +'/repos')
  req.send()
}
function displayRepositories(event, data) {
  var repos = JSON.parse(this.responseText)
  console.log(repos)
  const repoList = `<ul>${repos.map(r => '<li>' + r.name + ' - <a href="#" data-repo="' + r.name + '" onclick="getCommits(this)">Display Commits</a></li>').join('')}</ul>`
  document.getElementById("repositories").innerHTML = repoList
}
function getCommits(el) {
  const name = el.dataset.repository
  const user = el.dataset.username
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayCommits)
  req.open("GET", rootURL + '/repos/' + user + '/' + name + '/commits')
  req.send()
}

function displayCommits() {
  const commits = JSON.parse(this.responseText)
  console.log(commits)
  const commitsList = `<ul>${commits.map(commit => '<li><strong>' + commit.commit.author.name + ' ' + commit.author.login + '</strong> -' + commit.commit.message + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = commitsList
}

function getBranches(el) {
  const name = el.dataset.repository
  const user = el.dataset.username
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayBranches)
  req.open("GET", rootURL + '/repos/' + user + '/' + name + '/branches')
  req.send()
}

function displayBranches() {
  const branches = JSON.parse(this.responseText)
  const branchesList = `<ul>${branches.map(branch => '<li>' + branch.name + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = branchesList
}

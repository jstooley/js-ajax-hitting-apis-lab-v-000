function getRepositories(){
  const req = new XMLHttpRequest();
  req.addEventListener("load", showRepositories);
  let username = document.getElementById("username").value
  req.open("GET", 'https://api.github.com/users/'+ username +'/repos')
  req.send()
}
function showRepositories(event, data) {
  var repos = JSON.parse(this.responseText)
  console.log(repos)
  const repoList = `<ul>${repos.map(r => '<li>' + r.name + ' - <a href="#" data-repo="' + r.name + '" onclick="getCommits(this)">Display Commits</a></li>').join('')}</ul>`
  document.getElementById("repositories").innerHTML = repoList
}
function displayCommits() {
  const commits = JSON.parse(this.responseText)
  const commitsList = `<ul>${commits.map(commit => '<li><h3>' + commit.commit.author.name + ' (' + commit.author.login + ')</h3>' + commit.commit.message + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = commitsList
}
function getCommits(el) {
  const name = el.dataset.repo
  const username = el.dataset.username
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayCommits)
  req.open("GET", 'https://api.github.com/repos/'+ username +'/' + name + '/commits')
  req.send()
}

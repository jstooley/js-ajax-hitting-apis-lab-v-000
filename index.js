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
  const commitsList = `<ul>${commits.map(commit => '<li><strong>' + commit.author.login + '</strong> - ' + commit.commit.message + '</li>').join('')}</ul>`
  document.getElementById("commits").innerHTML = commitsList
}
function getCommits(el) {
  const name = el.dataset.repo
  const req = new XMLHttpRequest()
  req.addEventListener("load", dispalyCommits)
  req.open("GET", 'https://api.github.com/repos/octocat/' + name + '/commits')
  req.send()
}

let users = [];

const fetchUsers = fetch('https://jsonplaceholder.typicode.com/users/').then((response) => {
    return response.json().then(json => {
        users = json;
    })
})

const userDiv = document.querySelector("#user-div");
const searchBar = document.querySelector("#searchbar");
const results = document.querySelector('#results');


const getUser = (id) => users.find((user) => user.id === id);

const renderUser = (userId) => {
  const user = getUser(userId);
  userDiv.innerHTML = `  
    <div class="user-info-root">
      <h3>${user.name}</h3>
      <div class="user-info-container">
        <div class="user-info-1">
          <p>ID</li>
          <p>UserName</p>
          <p>Email</li>
        </div>
        <div class="user-info-2">
          <p>${user.id}</p>
          <p>${user.username}</p>
          <p>${user.email}</p>
        </div>
      </div>
    </div>`;

  return user;
};

const getInput = () => {
  //console.log(searchBar.value);
  return searchBar.value.toLowerCase();
};

const getMatches = () => {
  const currentText = getInput();
  if (currentText === "") {
    return currentText;
  }
  const matches = users.filter((user) => user.name.toLowerCase().includes(currentText));
  //console.log(matches);
  return matches;
};

const renderMatches = () => {
    results.innerHTML = '';
    const matchingUsers = getMatches();
    if (!matchingUsers) return; 

    matchingUsers.forEach(mUser => {
        results.innerHTML +=  `
          <p class="result" onclick="renderUser(${mUser.id})">${mUser.name}</p>
        `;
    });
}

searchBar.addEventListener("input", renderMatches);
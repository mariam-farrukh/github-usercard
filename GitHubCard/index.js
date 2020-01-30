/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           
*/
axios.get(`https://api.github.com/users/mariam-farrukh`)
.then(data=>{
  const user = data.data;
  const container = document.querySelector('.cards')
  container.appendChild(gitHubCards(user));
  console.log('it works!', data.data);
})
.catch(error =>{
  console.log('Uh oh', error);
})

/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

//stretch problem
/
axios.get(`https:/api.github.com/users/mariam-farrukh/followers`)
.then(data=>{
  const followersList = data.data;
  followersList.forEach(follower => {
    axios.get(`https://api.github.com/users/${follower.login}`)
    .then(data => {
      const user = data.data;
      const container = document.querySelector('.cards');
      container.appendChild(gitHubCards(user));
    })
    .catch(error => {
      console.log("Oh no!", error)
    })
  })
  console.log('yay!', data.data);
})
.catch(error =>{
  console.log('Uh oh', error);
})

//end stretch problem

const followersArray = ['tetondan', 'dustinmyers', 'justsml', 'luishrd', 'bigknell']

followersArray.forEach(follower => {
  axios.get(`https://api.github.com/users/${follower}`)
  .then(data => {
    const user = data.data;
    const container = document.querySelector('.cards');
    container.appendChild(gitHubCards(user));
    console.log("Works", data.data);
  })
  .catch(error => {
    console.log("Oh no!", error)
  })
})

/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/

/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/

function gitHubCards(user){
  //creating elements
  const card = document.createElement('div');
  const personImage = document.createElement('img');
  const personInfo = document.createElement('div');
  const personName = document.createElement('h3');
  const personUserName = document.createElement('p');
  const personLocation = document.createElement('p');
  const personProfile = document.createElement('p');
  const personProfileLink = document.createElement('a');
  const personFollowers = document.createElement('p');
  const personFollowing = document.createElement('p');
  const personBio = document.createElement('p');

  //Set classes
  card.classList.add('card');
  personInfo.classList.add('card-info');
  personName.classList.add('name');
  personUserName.classList.add('username');

  //Content
  personImage.src = user.avatar_url;
  personName.textContent = user.name;
  personUserName.textContent = user.login;
  personLocation.textContent = `Location: ${user.location}`;
  personProfile.textContent = "Profile: ";
  personProfileLink.textContent = user.html_url
  personProfileLink.href = user.html_url;
  personFollowers.textContent = `Followers: ${user.followers}`;
  personFollowing.textContent = `Following: ${user.following}`;
  personBio.textContent = `Bio: ${user.bio}`;

  //structure of elements
  card.appendChild(personImage);
  card.appendChild(personInfo);
  personProfile.appendChild(personProfileLink);
  personInfo.appendChild(personName);
  personInfo.appendChild(personUserName);
  personInfo.appendChild(personLocation);
  personInfo.appendChild(personProfile);
  personInfo.appendChild(personFollowers);
  personInfo.appendChild(personFollowing);
  personInfo.appendChild(personBio);

  return card;
}
import $ from 'jquery';
import store from './store';
import posted from './adding';

  let BASE_URL = 'https://thinkful-list-api.herokuapp.com';
  let get = `${BASE_URL}/Lili/bookmarks`;
  let post = `${BASE_URL}/Lili/bookmarks`;
  let patch = `${BASE_URL}/Lili/bookmarks/`;
  let deleteIt = `${BASE_URL}/Lili/bookmarks/`;


function saveBookmark(){
  let name = $('#siteName').val();
  let siteLink = $('#siteURL').val();
  let description = $('#description').val();
  let rating = $('input[type="radio"]:checked').val();
  return fetch(post, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      "title": name,
      "url": siteLink,
      "desc": description,
      "rating": rating
    })
  })
.then(response => response.json())
.then(postedJson => console.log(postedJson));
}



function showBookmarks(){
  return fetch(get)
  .then(response => response.json())
  .then(getJson =>  store.store.bookmarks = getJson)
  }
  

function deleteBookmarks(id){
  // get the id from the parent class, which is the div to get ID
  fetch(`${deleteIt}/${id}`, {method: 'DELETE'})
  .then(response => response.json())
  .then(deleteJson => {return deleteJson});
}

function editBookmarks() {
  fetch(patch)
  .then(response => response.json())
  .then(patchJson => console.log(patchJson));
}
// edit all at once turning it back into a form

export default{
  saveBookmark,
  showBookmarks,
  deleteBookmarks, 
  editBookmarks, 
}

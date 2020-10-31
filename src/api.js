import $, { error } from 'jquery';
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
.then(postedJson => store.store.bookmarks.push(postedJson))
.catch(error => alert('Something went wrong, try again.'));
}



function showBookmarks(){
  return fetch(get)
  .then(response => response.json())
  .then(getJson =>  store.store.bookmarks = getJson)
  }
  

function deleteBookmarks(id){
  return fetch(`${deleteIt}${id}`, {
    method: 'DELETE'
  })
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

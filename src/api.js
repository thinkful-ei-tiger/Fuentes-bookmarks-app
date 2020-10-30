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
  fetch(post, {
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
.then(postedJson => postedJson);
 store.bookmarks.push(postedJson);
$('#bookmarkList').html(posted.postedBookmark);
};



function showBookmarkList(){
  fetch(get)
  .then(response => response.json())
  .then(getJson => console.log(getJson))
    
}

function deleteBookmarks(){
  fetch(deleteIt)
  .then(response => response.json())
  .then(deleteJson => console.log(deleteJson));
}

function editBookmarks() {
  fetch(patch)
  .then(response => response.json())
  .then(patchJson => console.log(patchJson));
}


export default{
  saveBookmark,
  showBookmarkList,
  deleteBookmarks, 
  editBookmarks
}

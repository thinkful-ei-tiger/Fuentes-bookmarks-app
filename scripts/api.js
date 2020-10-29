import $ from 'jquery';

  let BASE_URL = 'https://thinkful-list-api.herokuapp.com';
  let get = `${BASE_URL}/Lili/bookmarks`;
  let post = `${BASE_URL}/Lili/bookmarks`;
  let patch = `${BASE_URL}/Lili/bookmarks/`; // give each bookmark a cuid
  let deleteIt = `${BASE_URL}/Lili/bookmarks`;

function getBookmark(){
  fetch(get)
.then(response => response.json())
.then(responseJson => 
  $('#bookmarkList').html(responseJson));
}

function watchForm() {
  $('#addBookmark').click(event => {
    event.preventDefault();
    getBookmark();

  });
}

$(watchForm);
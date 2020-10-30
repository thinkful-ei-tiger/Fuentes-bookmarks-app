import $ from 'jquery';
import store from './store';
import add from './api';



/*
=====================================================================
Bookmark Ratings
=====================================================================
*/
 function ratings(){
    $(".rating input:radio").attr("checked", false);
    $('.rating input').on('click', function () {
        $(".rating span").removeClass('checked');
        $(this).parent().addClass('checked');
    });

    $('input:radio').change(
      function(){
        let userRating = this.value;
    }); 
};



/*
=====================================================================
TEMPLATES
=====================================================================
*/

function generateForm(){
  return `<h1>New Bookmark</h1>
  <div id="formUp">
    <div id="listContainer" class="listContainer">
      <div>
        <form class="addingNew">
          <fieldset>
            <legend>New Bookmark</legend>
            <label for="siteName">Site Name:</label>
            <input id="siteName" type="text" name="site" placeholder="Name"><br>

            <label for="siteURL">Site:</label>
            <input id="siteURL" type="text" name="siteURL" required placeholder="https://"><br>

            <label for="description">Description:</label><br>
            <textarea name="description" id="description" cols="30" rows="10" placeholder="Site Description"></textarea><br><br>
            <div id="rating" class="rating">
              <span><input type="radio" name="rating" id="str5" value="5" required><label for="str5">5</label></span>
              <span><input type="radio" name="rating" id="str4" value="4"><label for="str4">4</label></span>
              <span><input type="radio" name="rating" id="str3" value="3"><label for="str3">3</label></span>
              <span><input type="radio" name="rating" id="str2" value="2"><label for="str2">2</label></span>
              <span><input type="radio" name="rating" id="str1" value="1"><label for="str1">1</label></span>
            </div>
          </fieldset>
          
        <div class="linkRemove"> 
            <button id="cancel">Cancel</button>
            <button type="submit" value="submit" id="addBookmark">Add Bookmark</button>
        </div>
       </form>

  </div>`;
   
}

function bookmarkList(){

  add.showBookmarks()
  .then(function () {
    render();
  })
  }


function bookmarkDelete(){
  add.deleteBookmarks();
}

/*
=====================================================================
EVENT LISTENERS
=====================================================================
*/

function render(){

  if(store.store.adding) {
    $('#listContainer').toggleClass('hidden');
    $('#formContainer').html(generateForm());
    $('#formContainer').show();
  }
  else{
  $('#formContainer').hide();
  let list = store.store.bookmarks;
  $('#bookmarkList').empty();
  for(let i = 0; i < list.length; i++){  
    $('#bookmarkList').append(`<div>
    <label id="collapse">${list[i].title}</label>
    <button id="edit">Edit</button><button id="delete">Delete</button><br>
    <button id="rated">${list[i].rating}</button>
    <div id="bookmarkDesc">
    <button><a href=${list[i].url} target="_blank">Visit</a></button>
    <p>${list[i].desc}</p>
    </div>
    </div>`)};
    $('#listContainer').toggleClass('hidden');
  }
}

function newBookmarkEvent(){
  $('#adding').on('click', function (){
    store.store.adding = true;
    render();
  });
}

function bookmarkFormSubmit(){
  $('#formContainer').on('submit','.addingNew', function(event){
    event.preventDefault();
    add.saveBookmark(event)
    .then(function (){
      store.store.adding = false;
      render();
    })


  });
}


  // let mobiscroll.settings = {
  //   theme: 'ios',
  //   themeVariant: 'light'
  // }

$(function () {

  $('#close-all').on('click', function () {
      $('[data-collapsible].mbsc-collapsible-open').mobiscroll('hide');
  });

  $('#toggle-last').on('click', function () {
      $('[data-collapsible]').eq(3).mobiscroll('toggle');
  });

});


/*
=====================================================================
EVENT LISTENERS BINDING
=====================================================================
*/

function bindEventListeners(){ 
  newBookmarkEvent();
  bookmarkFormSubmit();
  bookmarkDelete();
}


/*
=====================================================================
EXPORT DEFAULT
=====================================================================
*/

export default { 
  ratings, // function to get user rating of site added
  generateForm, // gets form displayed to the DOM for a new bookmark
  bindEventListeners, // binds all event listeners for use
  bookmarkList
}
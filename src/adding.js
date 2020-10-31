import $ from 'jquery';
import store from './store';
import api from './api';



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

  api.showBookmarks()
  .then(function () {
    render();
  })
  }




/*
=====================================================================
EVENT LISTENERS
=====================================================================
*/

function render(){

  if(store.store.adding) {
    $('#formContainer').html(generateForm());
    $('#formContainer').show();
  }
  else{

  $('#formContainer').hide();
  $('#listContainer').show();

     let list = store.store.bookmarks;
   
    $('#bookmarkList').empty();
  for(let i = 0; i < list.length; i++){  
    $('#bookmarkList').append(`
    <div id="${list[i].id}">
      <span class="collapse">${list[i].title}</span>
      <button class="edit">Edit</button>
      <button class="delButton">Delete</button>
      <button class="rated">${list[i].rating}</button>
       <div class="bookmarkDesc">
        <button><a href=${list[i].url} target="_blank">Visit</a></button>
        <p>${list[i].desc}</p>
       </div>
    </div>`)};
    
  }
}



function newBookmarkEvent(){
  $('#adding').on('click', function (){
    store.store.adding = true;
    $('#listContainer').hide();
    render();
  });
}

function cancelBookmark(){
  $('#cancel').on('click', function (){
    // store.store.adding = true;
    // $('#listContainer').hide();
    render();
  });
}

function bookmarkFormSubmit(){
  $('#formContainer').on('submit','.addingNew', function(event){
    event.preventDefault();
    api.saveBookmark()
    .then(function (){
       $(".listContainer").show();
      store.store.adding = false;
      render()
    })
  });
}

function deleteBookmark() {
  $('body').on('click', '.delButton', function() {
    let id = $(this).parent().attr('id');
    console.log(id)
    api.deleteBookmarks(id)
    .then(function () {
      console.log('Still here')
      api.showBookmarks()
        .then(function () {
          render()
        })
    })
  })
}

$(function () {

  $('#name').on('click', function () {
      $('#information').mobiscroll('hide');
  });

  $('#name').on('click', function () {
      $('[data-collapsible]').eq(0).mobiscroll('toggle');
  });

});




/*
=====================================================================
BOOKMARK RATINGS AND FILTER
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


// function filterBy(){
//   let selected = $('#filter');
//   let results = selected.options[selected.selectedIndex].value;
//   console.log(results);
// }



/*
=====================================================================
EVENT LISTENERS BINDING
=====================================================================
*/

function bindEventListeners(){ 
  // addBookmark();
  newBookmarkEvent();
  bookmarkFormSubmit();
  deleteBookmark();
  cancelBookmark();
  ratings();
  // filterBy();
}


/*
=====================================================================
EXPORT DEFAULT
=====================================================================
*/

export default { 
  generateForm, // gets form displayed to the DOM for a new bookmark
  bindEventListeners, // binds all event listeners for use
  bookmarkList
}
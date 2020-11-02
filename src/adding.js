import $ from 'jquery';
import store from './store';
import api from './api';



/*
=====================================================================
TEMPLATES
=====================================================================
*/

function startUpPage(){
  $('main').html(`    
  <h1>Save 'Em</h1>

  <div id="beginning" class="beginning"> 
    
    <h2 id="adding" class="initialAdd">ADD</h2>
    <div class="moveOverMore">
      <select id="filter" class="bookmark-select" id="filter">
        <option value="" >Rating</option>
        <option value="5">5</option>
        <option value="4">4+</option>
        <option value="3">3+</option>
        <option value="2">2+</option>
        <option value="1" >1+</option>
      </select>
    </div>  
  </div>  
    <div id="formContainer" class="formContainer hidden">
        
      </div>


      <div id="listContainer" class="listContainer">
          <div id="bookmarkList" class="listDisplay">
            
            <div class="listItems">
                <div class="filler">
                  <p><b>Nothing saved yet ......</b></p>
                </div>
              <div>

          </div>
      </div>`);
}



function generateForm(){
  return `<h2>New Bookmark</h2>
  <div id="formUp">
    <div id="listContainer" class="listContainer listDisplay">
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
            <img src="/src/images/cancel.png" id="cancel"/>
            <button type="submit" value="submit" id="addBookmark">Add</button>
        </div>
       </form>

  </div>`;
   
}

function addToList(){
  let list = store.store.bookmarks;
  for(let i = 0; i < list.length; i++){  
    $('#bookmarkList').append(`
    <div id="${list[i].id}" class="listItems">
      <span class="nameTitle collapse" contenteditable="false"><b>${list[i].title}</b></span>
      <span class="stars" contenteditable="false"><img src="/src/images/rating.png"/><b>${list[i].rating}</b></span>
      <div class="moveRight">
        <img src='/src/images/pen.png' class="edit"/>
        <img src='/src/images/delete.png' class="delButton"/>
        <button class="hidden save">SAVE</button>
      </div>
      <div class="editing">
        <p class="hidden description" contenteditable="false">${list[i].desc}<br>
        <a href=${list[i].url} target="_blank"><img src='/src/images/visit.png'/></a></p>
      </div>
    </div>`)};
}







/*
=====================================================================
EVENT LISTENERS
=====================================================================
*/


function newBookmarkEvent(){
  $('body').on('click', '#adding', function (){
    store.store.adding = true;
    $('.listContainer').toggleClass('hidden');
    $('#bookmarkList').toggleClass('hidden');
    $('#beginning').toggleClass('hidden')
    render();
  });
}


function bookmarkFormSubmit(){
  $('body').on('submit','.addingNew', function(event){
    event.preventDefault();
    $('#formContainer').toggleClass('hidden');
    api.saveBookmark()
    .then(function (){
       $('.listContainer').toggleClass('hidden');
       $('#beginning').toggleClass('hidden');
       console.log('added');
      store.store.adding = false;
      render()
    })
  });
}

function cancelForm() {
  $('body').on('click', '#cancel', function() {
    console.log('cancel');
    $('.listContainer').toggleClass('hidden');
    $('#formContainer').toggleClass('hidden');
    $('.beginning').show();
    store.store.adding = false;
    render();
  })
}


function deleteBookmark() {
  $('body').on('click', '.delButton', function(event) {
    let id = $(event.target).closest('.listItems').attr('id');
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


function showDescription(){
  $('body').on('click', '.nameTitle', function (event) {
    let item = $(event.target).closest('.listItems').find('p');
    item.toggleClass('hidden');
  })
}


function editBookmark() {
  $('body').on('click', '.edit', function() {
    console.log('clicked');
    $(this).siblings('.save').show();
    $(this).parent().siblings('.nameTitle').attr('contenteditable', 'true');
    $(this).parent().siblings('.stars').attr('contenteditable', 'true');
    $(this).parent().siblings('.editing').find('.description').attr('contenteditable', 'true');
  })
}


function saveEditBookmark() {
  $('body').on('click', '.save', function() {
    console.log('works');
    $(this).hide();

    let name = $(this).parent().siblings('.nameTitle');
    let rating = $(this).parent().siblings('.stars');
    let description = $(this).parent().siblings('.editing').find('.description');
    let id = $(this).parents('.listItems').attr('id');

    name.attr('contenteditable', 'false');
    rating.attr('contenteditable', 'false');
    description.attr('contenteditable', 'false');

   api.editBookmarks(id, name.text(), rating.text(), description.text());
  })
}



function sortBy(){
  $('body').on('change', '.bookmark-select', function() {
    let rating = $(this).val();
    let sorted = store.store.bookmarks.filter( function (item) {
      return item.rating >= rating;
    })
    console.log(sorted);
    displaySorted(sorted);
  })
}

/*
=====================================================================
BOOKMARK DISPLAY
=====================================================================
*/


function displaySorted(store){
  let list = store;
  let html = '';
  for(let i = 0; i < list.length; i++){  
    html += `
    <div id="${list[i].id}" class="listItems">
      <span class="nameTitle collapse" contenteditable="false"><b>${list[i].title}</b></span>
      <span class="stars" contenteditable="false"><img src="/src/images/rating.png"/><b>${list[i].rating}</b></span>
      <div class="moveRight">
        <img src='/src/images/pen.png' class="edit"/>
        <img src='/src/images/delete.png' class="delButton"/>
        <button class="hidden save">SAVE</button>
      </div>
      <div class="editing">
        <p class="hidden description" contenteditable="false">${list[i].desc}<br>
        <a href=${list[i].url} target="_blank"><img src='/src/images/visit.png'/></a></p>
      </div>
    </div>`};

    $('#bookmarkList').html(html);
}


function bookmarkList(){
  api.showBookmarks()
  .then(function () {
    render();
  })
  }


/*
=====================================================================
BOOKMARK RATINGS
=====================================================================
*/
function ratings(){
  $(".rating input:radio").attr("checked", false);
  $('.rating input').on('click', function () {
      $(".rating span").removeClass('checked');
      $(this).parent().addClass('checked');
  });
};


/*
=====================================================================
RENDER
=====================================================================
*/


function render(){
  console.log(store.store.adding);
  if(store.store.adding) {
    $('#formContainer').html(generateForm());
    $('#formContainer').toggleClass('hidden');
  }
  else{
  // $('#listContainer').show();
  $('#bookmarkList').empty();
  addToList();
  $('#filter').prop('selectedIndex',0);
  }
}


/*
=====================================================================
EVENT LISTENERS BINDING
=====================================================================
*/

function bindEventListeners(){ 
  newBookmarkEvent();
  bookmarkFormSubmit();
  deleteBookmark();
  ratings();
  showDescription();
  editBookmark();
  saveEditBookmark();
  sortBy();
  cancelForm();
  
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
  bookmarkList,
  startUpPage
}
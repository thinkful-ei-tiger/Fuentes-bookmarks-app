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
        <form>
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
            <button type="submit" id="addBookmark">Add Bookmark</button>
        </div>
       </form>

  </div>`;
   
}

function postedBookmark(){
  return `<div>
  <button id="collapse">${store.bookmarks.title}</button>
  <button id="rated">${store.bookmarks.rating}</button>
  <button><a href=${store.bookmarks.url} target="_blank"></a></button>
  <p>${store.bookmarks.desc}</p>
  </div>`;
}


 /*
=====================================================================
EVENT LISTENERS
=====================================================================
*/

function newBookmarkEvent(){
  $('#adding').on('click', function (){
    $('#listContainer').hide();
    $('#formContainer').html(generateForm());
  });

}

function bookmarkFormSubmit(){
  $('#formContainer').on('submit','form', function(event){
    event.preventDefault();
    add.saveBookmark(event);
    $('#listContainer').show();
  });
}

/*
=====================================================================
EVENT LISTENERS BINDING
=====================================================================
*/

function bindEventListeners(){ 
  newBookmarkEvent();
  bookmarkFormSubmit();
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
  postedBookmark
}
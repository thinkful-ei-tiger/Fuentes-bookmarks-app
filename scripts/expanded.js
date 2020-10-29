
import $ from 'jquery';

const store = {
    bookmarks: [
      {
        id: '7ddr',
        title: 'Title 11',
        rating: 5,
        url: 'http://www.title11.com',
        description: 'lorem ipsum dolor',
        expanded: true
      }
    ],
    adding: false,
    error: null,
    filter: 0
  };



  
  $( function() {
    $( "#accordion" ).accordion({
      collapsible: true
    });
  } );
 



 export default{
   showDescription
 }

 $(showDescription);
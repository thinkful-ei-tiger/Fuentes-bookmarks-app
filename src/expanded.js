
import $ from 'jquery';

  mobiscroll.settings = {
    theme: 'ios',
    themeVariant: 'light'
}

$(function () {

    $('#close-all').on('click', function () {
        $('[data-collapsible].mbsc-collapsible-open').mobiscroll('hide');
    });

    $('#toggle-last').on('click', function () {
        $('[data-collapsible]').eq(3).mobiscroll('toggle');
    });

});





 export default{
   showDescription,
 }

 $(showDescription);
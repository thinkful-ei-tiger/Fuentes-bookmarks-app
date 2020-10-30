import $ from 'jquery';
import './main.css';
import add from './api';
import adding from './adding';


function main(){
   adding.bindEventListeners();
   adding.bookmarkList();
  }
  
  $(main);
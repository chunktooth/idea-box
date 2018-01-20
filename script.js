$('.user-title').on('input', enableSaveBtn);
$('.user-content').on('input', enableSaveBtn);
$('.save-btn').on('click', getUserData);
$('.parent-box').on('click', '.delete-btn', deleteCard);
$('.parent-box').on('click', '.upvote-btn', getQuaility);
$('.parent-box').on('click', '.downvote-btn', getQuaility);
$('.parent-box').on('blur', '.edit-title', editTitle);
$('.parent-box').on('blur', '.edit-content', editContent);
$('#search').on('keyup', searchContent);
$(document).ready(pullKeysFromStorage);

function pullKeysFromStorage() {
  for(var i = 0; i < localStorage.length; i++){
  var key = localStorage.key(i);
  getIdeaFromStorage(key);
  }
};

function enableSaveBtn(e){
  var $title = $('.user-title');
  var $content = $('.user-content');
  if ($title.val() && $content.val()){
    $('.save-btn').attr('disabled', false); 
  } else {
  $('.save-btn').attr('disabled', true);
  $('.missing-input-text').text(`
  This idea is going to be awesome, 
  make sure to fill out your idea and its title!`);
  setTimeout(function(){$('.missing-input-text').text('');}, 3000);
  }
};

function getUserData(e) {
  e.preventDefault();
  var $title = $('.user-title').val();
  var $content = $('.user-content').val();
  var $id = Date.now();
  var $quality = 'swill';
  $('.user-content').val('');
  $('.user-title').val('');
  storeIdeaCards($title, $content, $id, $quality);
}

function Idea(title, content, id, quality) {
  this.title = title;
  this.content = content;
  this.id = id;
  this.quality = quality || 'swill';
  this.qualityCounter = 0;
}

function storeIdeaCards(title, content, id, quality) {
  var ideaObject = new Idea(title, content, id, quality);
  var stringifyObject = JSON.stringify(ideaObject);
  var key = id;
  localStorage.setItem(key, stringifyObject);  
  getIdeaFromStorage(key);
}

function getIdeaFromStorage(key) {
  var retrievedObject = localStorage.getItem(key);
  var parsedObject = JSON.parse(retrievedObject);
  var title = parsedObject.title;
  var content = parsedObject.content;
  var id = parsedObject.id;
  var quality = parsedObject.quality;
  createCard(title, content, id, quality);
}

function createCard(title, content, id, quality){
  $('.parent-box').prepend(`
    <article  class="cards" id=${id}>
      <header class="article-header">
        <h2 class="edit-title" contenteditable="true">${title}</h2>
        <button class="delete-btn"></button>
      </header>      
      <p class="edit-content" contenteditable="true">${content}</p>
      <footer>
        <button class="upvote-btn"></button>
        <button class="downvote-btn"></button>
        <h4>quality: <span>${quality}</span></h4>
      </footer>
    </article>`);
  $('.save-btn').attr('disabled', true);
}

function deleteCard(key) {
  var card = $(this).closest('article');
  var cardId = card.attr('id');
  localStorage.removeItem(cardId);
  $(this).closest('article').remove()
}

function getQuaility(e) {
  var card = $(this).closest('article');
  var key = card.attr('id');
  var retrievedObject = localStorage.getItem(key);
  var parsedObject = JSON.parse(retrievedObject);
  var tag = $(this).closest('footer').find('h4');
  changeQuailityCounter(e, tag, parsedObject)
}

function changeQuailityCounter(e, tag, object) {
  if (e.target.className === 'upvote-btn' && object.qualityCounter < 2) {
    object.qualityCounter++;
    setObjectToStorage(object)
    changeQuailityText(object, tag)
  } else if (e.target.className === 'downvote-btn' && object.qualityCounter > 0) {
    object.qualityCounter--;
    setObjectToStorage(object);
    changeQuailityText(object, tag)
  }
}

function setObjectToStorage(object) {
  var stringifyObject = JSON.stringify(object);
  localStorage.setItem(object.id, stringifyObject)
}

function changeQuailityText(object, tag) {
  var qualityArray = ['swill', 'plausible', 'genius'];
  qualityArray.forEach(function(value, index){
    if (object.qualityCounter === index) {
      object.quality = value;
      tag.html(`quality: <span>${value}</span>`);
      setObjectToStorage(object);
    }
  })
}

function editTitle() {
  var newTitle = $(this).text();
  var card = $(this).closest('article');
  var key = card.prop('id');
  var retrievedObject = localStorage.getItem(key);
  var parsedObject = JSON.parse(retrievedObject);
  parsedObject.title = newTitle;
  setObjectToStorage(parsedObject)
}

function editContent() {
  var newContent = $(this).text();
  var card = $(this).closest('article');
  var key = card.prop('id');
  var retrievedObject = localStorage.getItem(key);
  var parsedObject = JSON.parse(retrievedObject);
  parsedObject.content = newContent;
  setObjectToStorage(parsedObject)
}

function searchContent() {
  $('.cards').addClass('hidden');
  var searchValue = $(this).val();
  for (var i = 0; i < localStorage.length; i++){
    var key = localStorage.key(i)
    var retrievedObject = localStorage.getItem(key);
    var parsedObject = JSON.parse(retrievedObject);
  if (parsedObject.title.includes(searchValue) || parsedObject.content.includes(searchValue)) {
      var cardId = '#' + key;
      $(cardId).removeClass('hidden');
    }
  }
}
// add mobile responsiveness

$('.user-title').on('input', enableSaveBtn);
$('.user-content').on('input', enableSaveBtn);
$('.save-btn').on('click', getUserData);
$('.parent-box').on('click', '.delete-btn', deleteCard);
$(document).ready(function() {
  for(var i = 0; i < localStorage.length; i++){
  var key = localStorage.key(i);
  getIdeaFromStorage(key);
  }
});

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
  var $quality = 'swill' || quality;
  $('.user-content').val('');
  $('.user-title').val('');
  storeIdeaCards($title, $content, $id, $quality);
}

function IdeaData(title, content, id, quality) {
  this.title = title;
  this.content = content;
  this.id = id;
  this.quality = quality;
}

function storeIdeaCards(title, content, id, quality) {
  var ideaObject = new IdeaData(title, content, id, quality);
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
    <article id=${id}>
      <header class="article-header">
        <h2>${title}</h2>
        <button class="delete-btn"></button>
      </header>      
      <p>${content}</p>
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
  console.log(cardId)
  localStorage.removeItem(cardId);
  $(this).closest('article').remove()
}



  
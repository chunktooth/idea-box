// prepend idea to page on submit
$('.user-title').on('input', enableSaveBtn);
$('.user-content').on('input', enableSaveBtn);
$('.save-btn').on('click', getUserData);
$('.parent-box').on('click', '.delete-btn', deleteCard);


function IdeaData() {
  this.title = tile;
  this.content = content;
  this.id = id;
  this.quality = quality;
}

function getUserData(e) {
  e.preventDefault();
  var $title = $('.user-title').val();
  var $content = $('.user-content').val();
  var $id = Date.now();
  var $quality = 'swill';
  $('.user-content').val('');
  $('.user-title').val('');
  createCard($title, $content, $id, $quality);
  storeIdeaCards($title, $content, $id, $quality);
}

function storeIdeaCards(title, content, id, quality) {
  var ideaObject = { 
    title: title,
    content: content,
    id: id,
    quality: quality };
  var stringifyObject = JSON.stringify(ideaObject);
  var key = id;
  localStorage.setItem(key, stringifyObject);  
  getIdeaFromStorage(key);
}

function getIdeaFromStorage(key) {
  var retrievedObject = localStorage.getItem(key);
  var parsedObject = JSON.parse(retrievedObject);
  console.log(parsedObject);
}


// IdeaData.prototype.getUserData = function(e) {
//   e.preventDefault();
//   var $title = $('.user-title').val();
//   var $content = $('.user-content').val();
//   var $id = Date.now();
//   var $quality = 'swill';
//   $('.user-content').val('');
//   $('.user-title').val('');
//   console.log(IdeaData);
// }

function enableSaveBtn(e){
  var $title = $('.user-title');
  var $content = $('.user-content');
  if ($title.val() && $content.val()){
    $('.save-btn').attr('disabled', false); 
  } else {
  $('.save-btn').attr('disabled', true);
  $('.missing-input-text').text(`
  This idea is going to be awesome, 
  make sure to fill out your idea and its title!`)
  }
};

// function verifyUserInput(){
//   $('.save-btn').attr('disabled', true);
//   $('.missing-input-text').text(`
//       This idea is going to be awesome, 
//       make sure to fill out your idea and its title!`); 
//   setTimeout(verifyUserInput, 1000)
// }


function createCard(title, content, id, quality){
  $('.parent-box').prepend(`
    <article id=${id}>
        <h2>${title}</h2>
        <button class="delete-btn"></button>      
      <p>${content}</p>
      <footer>
        <button class="upvote-btn"></button>
        <button class="downvote-btn"></button>
        <h4>quality: <span>${quality}</span></h4>
      </footer>
    </article>`);
  $('.save-btn').attr('disabled', true);
}

function deleteCard() {
 $(this).parent().remove();
}


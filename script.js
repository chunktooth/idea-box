// prepend idea to page on submit
$('.user-title').on('input', enableSaveBtn);
$('.user-content').on('input', enableSaveBtn);
$('.save-btn').on('click', getUserData);

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
  
  // function verifyUserInput(){
  // $('.save-btn').attr('disabled', true);
  // $('.missing-input-text').text(`
  //     This idea is going to be awesome, 
  //     make sure to fill out your idea and its title!`); 
  // setTimeout(verifyUserInput, 1000)
  // }
};

// function verifyUserInput(){
//   $('.save-btn').attr('disabled', true);
//   $('.missing-input-text').text(`
//       This idea is going to be awesome, 
//       make sure to fill out your idea and its title!`); 
//   setTimeout(verifyUserInput, 1000)
// }


function getUserData(e) {
  e.preventDefault();
  var $title = $('.user-title').val();
  var $content = $('.user-content').val();
  var $id = Date.now();
  var $quality = 'swill';
  $('.user-content').val('');
  $('.user-title').val('');
  createCard($title,$content, $id, $quality);
}

function createCard(title, content, id, quality){
  $('.idea-box').prepend(`
    <article id=${id}>
      <header>
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


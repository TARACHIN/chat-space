$(function(){
  function buildHTML(message) {
    add_image = (message.image) ? `<p class='main-messages__message__image'><img src="${message.image}"></p>` : '';
  
    var html = 
    `<div class="message">
      <div class="upper-message">
        <div class="upper-message__user-name">
        ${ message.name }
        </div>
        <div class="upper-message__date">
        ${ message.created_at }
        </div>
      </div>
      <div class="lower-message">
      <p class="lower-message__content">
      ${ message.content }
      </p>
      ${add_image}
      </div>
    </div>`
    return html
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function (data){
      var html = buildHTML(data);
      $('.messages').append(html);
      $('.new_message')[0].reset();
      $('.form__submit').prop('disabled', false);
      $('.messages').animate({ scrollTop: $(".messages")[0].scrollHeight });
      return true
    })
    .fail(function () {
      alert('メッセージ送信に失敗しました。');
    })
  })
})

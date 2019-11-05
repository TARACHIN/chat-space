$(function(){
  function buildHTML(message) {
    var addImage = (message.image) ? `<p class='main-messages__message__image'><img src="${message.image}"></p>` : '';
  
    var html = 
    `<div class="message" data-messageid = "${message.id}">
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
      ${addImage}
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

  var reloadMessages = function() {
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
    last_message_id = $('.message').last().data("messageid");
      $.ajax({
        url: "api/messages#index",
        type: "GET",
        dataType: 'json',
        data: {id: last_message_id}
      })
      .done(function(messages) {
        var insertHTML = '';
        messages.forEach(function(message){
          insertHTML += buildHTML(message);
        });
        $('.messages').append(insertHTML);
          $('.messages').animate({ scrollTop: $(".messages")[0].scrollHeight});
      })

      .fail(function() {
        console.log('自動更新に失敗しました。');
      });
    }
  };
  setInterval(reloadMessages, 3000);
});

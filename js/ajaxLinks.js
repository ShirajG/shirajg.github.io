function getViaAjax(event){
    $.get(event.target.href, function(response){
        newPost = $(response).filter('#post')
        $('#post').replaceWith(newPost)
    })
}

function getViaAjax(target){
    $.get(target, function(response){
        newPost = $(response).filter('#post')
        $('#post').replaceWith(newPost)
    })
}

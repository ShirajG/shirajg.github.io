function toggleActive($selectors_array){
  $selectors_array[0].addClass('jquery')
  for(var i=1; i<$selectors_array.length; i++){
    $selectors_array[i].removeClass('jquery')
  }
}
$(document).ready(function() {

  $("#file-button").click(function() {
    $("#file-bar").width(0);
  });

  $("input#file-button").change(function() {
    var delay = 800;
    var name = $(this).val().split('\\').pop();
    if (name == 'plunkerPreviewTarget') return;
    $("#file-name").text(name);
    var type = $("#document-type option:selected").text();
    var d = new Date().toDateString();

    $("#file-list").prepend("<div id=\"" + name + "-file-well\" class=\"well card\"><div class=\"row card-container\"><div class=\"col-xs-2 status\"><span class=\"glyphicon glyphicon-ok\" aria-hidden=\"true\"></span></div><div class=\"col-xs-4 name\">" + type + "</div><div class=\"col-xs-4 name\">" + name + "</div><div class=\"col-xs-2\">" + d + "</div></div></div>");

    for(i=0; i<=100; i = i +10) {
        $("#file-bar").delay(delay).width(i + "%");
    }
    
    var num = $("#button-collapse-badge").text();
    num++;
    $("#button-collapse-badge").text(num);

    var formData = new FormData();
    console.log($(this)[0].files[0]);
    formData.append('file', $(this)[0].files[0]);
    formData.append('filetype', type);

    $.ajax( {
      url: '/upload',
      type: 'POST',
      data: formData,
      contentType: 'multipart/form-data',
      processData: false,
      contentType: false
    } );
    
  });
  

  $("#list-collapse").click(function() {
    var style = $("#list-collapse span").attr('class');
    if (style.includes("down"))
      $("#list-collapse span").removeClass("glyphicon-collapse-down").addClass("glyphicon-collapse-up");
    else
      $("#list-collapse span").removeClass("glyphicon-collapse-up").addClass("glyphicon-collapse-down");
  });

});
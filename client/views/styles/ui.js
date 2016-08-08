
$("#submitRecord").click(function() {
  $("#indexStatus").html("Submitted");  
  $("input:first").focus();
  setTimeout(function(){
    $("#indexStatus").html("");
  },2000);
});

var fadeTime = 500;

$(document).ready(function() {
	setTimeout(function(){
		$(".first").fadeIn(fadeTime);
	},500);
	setTimeout(function(){
		$(".second").fadeIn(fadeTime);
	},1000);
	setTimeout(function(){
		$(".third").fadeIn(fadeTime);
	},1500);
	setTimeout(function(){
		$(".fourth").fadeIn(fadeTime);
	},2000);
});

$("#about").click(function() {
	$(".overlay").show();
	$(".about").fadeIn(fadeTime);
});
$("#contact").click(function(){
	$(".overlay").show();
	$(".contact").fadeIn(fadeTime);
});
$(".overlay").click(function(){
	$(".contact").hide();
	$(".about").hide();
	$(".overlay").hide();
});
$(".contact").click(function(){
	$(".contact").hide();
	$(".overlay").hide();
});
$(".about").click(function(){
	$(".about").hide();
	$(".overlay").hide();
});
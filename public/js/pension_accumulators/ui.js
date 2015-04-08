$.fn.animatecss = function (classes, callback) {
    return this.addClass(classes).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', callback);
};
$.fn.animateRotate = function(angle, top, duration, easing, complete) {
  return this.each(function() {
    var $elem = $(this);
    var startTop = $elem.position().top;
    $({top: startTop}).animate({top: top}, {
      duration: duration,
      easing: easing,
      step: function(now) {
          //console.log(now);
          var currentDeg = (1- now/top)*angle;
        $elem.css({
           transform: 'rotate(' + currentDeg + 'deg)',
           top: now
         });
      },
      complete: complete || $.noop
    });
  });
};

function loadAllWarning(){
	loadWarning('about_you.xml');
	loadWarning('savings.xml');
}

function loadAllInformation(){
	loadInformation('about_you.xml');
	loadInformation('savings.xml');
	loadInformation('result.xml');
}

function loaddAllAnnuity(){
	loadAnnuityMale();
	loadAnnuityFemale();
}





function fallingCoin(index) {
		var coin = "#coin"+index;
        $(coin).show();
        var heightContainer = $('#container-coin').height() - 25;
        var heightImage = $(coin).height() / 2 - 5;
        var moveToBottom = heightContainer - (heightImage * index);
        var angle = 70 * (index % 2 === 0 ? 1 : -1);
        $(coin).animateRotate(angle, moveToBottom, 1000-heightImage*index, 'linear', function () {  
                if (index < 25) {
                    index = index + 1;
                    fallingCoin(index);
                }
        });
}
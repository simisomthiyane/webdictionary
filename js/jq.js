/*************************************************************************
 * the app uses this jquery script for all front end user interface graphical effects.
 * like hovers,animates,sub windows..
 * i figured using jq since it easier to apply such fxs with less code.
 * 
 **************************************************************************/

jQuery(function ($) {

	//at click on link open sub widows
	$("#dictionaryApiLink").click(function () {
			let sub = window.open("https://dictionaryapi.dev/", "Free Web Dictionary API", "toolbar=no,status=no,menubar=no,location=center,resizable=no,width=500,height=500");
			sub.focus();
		} //end of function
	); //end

	//at click on link open sub widows  
	$(".sourceCode").click(function () {
			let sub = window.open("https://www.github.com/SimisoMT/webdictionary", "Web Dictionary", "toolbar=no,status=no,menubar=no,location=center,resizable=no,width=500,height=500");
			sub.focus();
		} //end of function
	); //end

	//at hover on input element animate
	$(".input").hover(function () {
			$(".input").animate({
				width: "15em"
			}, 200);
		} //end of function
	); //end

	//at hover on input element animate
	$("a,#buttonMoveUpPage").hover(function () {
			$(".moveUpPage").animate({
				width: "30%"
			}, 200);
		} //end of function
	); //end

	//at hover on input element animate

	$("div,wrapper").hover(function () {
			if ($(".moveUpPage").css('width') !== '20%') {
				$(".moveUpPage").animate({
					width: "20%"
				}, 50);
			}
		} //end of function
	); //end

}); //end of document on ready

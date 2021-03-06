/*
----------------Information--------------------------------

1.Pension Accumulators Action JS

2.All function in this file manage the action of user in page.

3.Version 1.0.0

4.Company - Claybourne McGregor Consulting Ltd 

5.Author - Lan.Ta 

6.Date - 30-03-2015

*/
function registerAction(){
	registerHoverAction();
	registerActionAboutYou();
	registerActionSavingTab();
	registerActionResultTab();
	registerActionSummaryTab();
	
}
/* this function handle the action hover the information image */
function registerHoverAction(){
	$(document).on("mouseover",".icon-tooltip",function() {
		var attrName = $(this).attr('information-message');
		var content = InformationArray[attrName];
		$("#infor-tooltip").html(content);
		var height = $("#content-tooltip").height();
		var top = $(this).offset().top - $(window).scrollTop();
		var background = $("#content-tooltip").css('background-image');
		var n = background.indexOf("480");
		if(n == -1){
			var left = $(this).offset().left;
			var topTool =  top - 172;
			$("#content-tooltip").css({
				position: 'fixed',
				top: topTool,
				left: left + $(this).width()
			});
		}else{
			var left = $(this).offset().left;
			var topTool =  top - 76;
			$("#content-tooltip").css({
					position: 'fixed',
					top: topTool,
					left: left + $(this).width()
			});
		}
		$("#content-tooltip").show();
	});
	$("#content-tooltip").hover( 
			function() {  $("#content-tooltip").show(); },
			function() { $("#content-tooltip").hide(); }
	);
	$(document).on("mouseout",".icon-tooltip",function() {
		$("#content-tooltip").hide();
	});
	
	
}
/* this function just allow user can type numberic only */
function isNumberKey(evt)
{
	var charCode = (evt.which) ? evt.which : event.keyCode;
   if (charCode != 46 && charCode > 31
    && (charCode < 48 || charCode > 57))
        return false;

    return true;
}


/* there are actions for tab about you*/
function registerActionAboutYou(){
	
	$('.text-about-you').on('input', function() {
		var check = checkDataAboutYou();
		if(check.length == 0){
			eneableTabSavings();
		}else{
			disableTabSavings();
		}
	});
	$("input:radio[name=optradio]").change(function(){
		var check = checkDataAboutYou();
		if(check.length == 0){
			eneableTabSavings();
		}else{
			disableTabSavings();
		}
	});
	

	$('#nextAboutYou').click(function(){
		//handle when user click next button in tab about you.
		var check = checkDataAboutYou();
		if(check.length == 0){
			eneableTabSavings();
			$("#savings").trigger('click');
		}else{
			var caseWarning = check[0];
			if(caseWarning == "retireAge-smaller-than-currentAge"){
				content = warningArray["retireAge-smaller-than-currentAge"];
				disableTabSavings();
				showWarning(content);
			}else{
				content = warningArray["validate-field"] +" "+ check[0];
				for(var i =1; i < check.length;i++){
					content = content+"," + check[i];
				}
				disableTabSavings();
				showWarning(content+"!");
			}
			
		}
	});
	
	$('#savings').click(function(){
		var check = checkDataAboutYou();
		if(check.length > 0){
			var caseWarning = check[0];
			if(caseWarning == "retireAge-smaller-than-currentAge"){
				content = warningArray["retireAge-smaller-than-currentAge"];
				disableTabSavings();
				showWarning(content);
			}else{
				content = warningArray["validate-field"] +" "+ check[0];
				for(var i =1; i < check.length;i++){
					content = content+"," + check[i];
				}
				disableTabSavings();
				showWarning(content + "!");
			}
			
			return false;
		}
	});

}

function eneableTabSavings(){
	$('#savings').attr('href','#tab2');
	$('#savings').attr('data-toggle','tab');
}

function disableTabSavings(){
	$('#savings').removeAttr('href');
	$('#savings').removeAttr('data-toggle');
}

function getGender(){
	if($("input:radio[name=optradio]").is(":checked")){
		var gender = $("input:radio[name=optradio]:checked").val();
		return gender;
	}
	return 0;

}
function checkDataAboutYou(){
	var content = new Array();
	var currentAge = $('#txt-current-age').val();
	if(currentAge == "" || typeof currentAge === 'undefined' || currentAge === null){
		content.push("current age");
	}
	var gender = getGender();
	if(gender == 0){
		content.push("gender");
	}
	var currentSalary = $('#txt-current-salary').val();
	if(currentSalary=="" || currentSalary == 0){
		content.push("current salary");
	}
	var targetPension = $('#txt-target-pensions').val();
	if( targetPension == "" & targetPension == 0){
		content.push("target income");
	}
	var ageRetire = $('.retirementAge').slider().slider('value');
	if(parseInt(ageRetire) < parseInt(currentAge)){
		content.push("retireAge-smaller-than-currentAge");
	}
	return content;
}
/*------------------------------------------------------------------------------------*/

/* there are actions for savings tab */
function eneableTabResult(){
	$('#results').attr('href','#tab3');
	$('#results').attr('data-toggle','tab');
}

function disableTabResult(){
	$('#results').removeAttr('href');
	$('#results').removeAttr('data-toggle');
}

function checkDataSaving(){
	var deffer_pen = $('#txt-deffered-pensions').val();
	if(deffer_pen.length > 0){
		return true;
	}
	var current_pen = $('#txt-current-pensions').val();
	if(current_pen.length > 0){
		return true;
	}
	
	var seft_pay =  $('#txt-you-paying').val();
	if(seft_pay.length > 0){
		return true;
	}
	
	var company_pay = $('#txt-your-employer').val();
	if(company_pay.length > 0){
		return true;
	}
	
	return false;
}

function registerActionSavingTab(){
	
	$('#results').click(function(){
		var check = checkDataSaving();
		if(check != true){
			var content = warningArray["enter-at-least-once-field"];
			showWarning(content);
			return false;
		}
	});
	$("input:radio[name=company-pension]").change(function(){
		var val = $(this).attr("id");
		if(val == "yes"){
			$('.final-salary').show();
		}else{
			$('#txt-income-payable').val(0);
			$('.final-salary').hide();
		}
	});
	
	$('.text-savings').on('input', function() {
		var check = checkDataSaving();
		if(check == true){
			//eneableTabResult();
		}else{
			disableTabResult();
		}
	});
	
	$('#nextSavings').click(function(){
		if(isBox1Visible()){
			var check = checkDataSaving();
			if(check == true){
				eneableTabResult();
				hiddenBox1();
			}else{
				disableTabResult();
				var content = warningArray["enter-at-least-once-field"];
				showWarning(content);
			}
		}else if(isBox2Visible()){
			if(isIncomeVisible()){
				var vl = $('#txt-income-payable').val();
				if(vl == 0){
					var content = warningArray["income-able"];
					showWarning(content);
				}else{
					$('#results').trigger('click');
				}
			}else{
				$('#results').trigger('click');
			}
			
		}
	});
	
	$('#backSavings').click(function(){
		if(isBox1Visible()){
			$('#about-you').trigger('click');
		}else if(isBox2Visible()){
			hiddenBox2();
		}
	});
	
	calculatePersonalPay();
	calculateCompanyPay();
}


function hiddenBox1(){
	$('.box-monney-purchase').hide();
	$('.box-defined-benefits').show();
}

function hiddenBox2(){
	$('.box-monney-purchase').show();
	$('.box-defined-benefits').hide();
}
function isBox1Visible(){
	if($('.box-monney-purchase').is(":visible")){
		return true;
	}else{
		return false;
	}
}

function isBox2Visible(){
	if($('.box-defined-benefits').is(":visible")){
		return true;
	}else{
		return false;
	}
}

function isIncomeVisible(){
	if($('#txt-income-payable').is(':visible')){
		return true;
	}else{
		return false;
	}
}

function calculatePersonalPay(){
	$('#txt-you-paying').on('input',function(){
		var percent = $('#txt-you-paying-percent').val();
		//if(percent == '' || typeof percent === 'undefined' || percent === null){
			percent = getPercent_Contribute();
			percent = percent*100;
			$('#txt-you-paying-percent').val(fixed(percent));
		//}
	});
	$('#txt-you-paying-percent').on('input',function(){
		var cash = $('#txt-you-paying').val();
		//if(cash == '' || typeof cash === 'undefined' || cash === null){
			cash = round(getCash_Contribute());
			$('#txt-you-paying').val(cash);
		//}
	});
}

function calculateCompanyPay(){
	$('#txt-your-employer').on('input',function(){
		var percent = $('#txt-your-employer-percent').val();
		//if(percent == '' || typeof percent === 'undefined' || percent === null){
			percent = getPercent_Contribute_company();
			percent = percent*100;
			$('#txt-your-employer-percent').val(fixed(percent));
		//}
	});
	$('#txt-your-employer-percent').on('input',function(){
		var cash = $('#txt-your-employer').val();
		//if(cash == '' || typeof cash === 'undefined' || cash === null){
			cash = round(getCash_Contribute_company());
			$('#txt-your-employer').val(cash);
		//}
	});
}
/*-----------------------------------------------------------------*/


/* this is action for tab results */
function registerActionResultTab(){
	
	$('a[id="results"]').on('shown.bs.tab', function (e) {
		eneabledSummary()
		var forceCashIncome = parseFloatCMG(getForecastIncome());
		var targetPension = parseFloatCMG($('#txt-target-pensions').val());
		console.log("current_forcecash_income : " + current_forcecash_income + " forceCashIncome "+ forceCashIncome);
		console.log("current_target : " + current_target + " targetPension "+ targetPension);
		if(parseFloatCMG(current_forcecash_income) !== forceCashIncome || parseFloatCMG(current_target) !== targetPension){
			drawChart();
			setTextToTextField();
			setupSlide();
			onChange();
		}else{
			console.log('====');
		}	
	});

	$('#nextResult').on('click',function(){
		$('#summary').trigger('click');
	});
	
	$('#backResult').on('click',function(){
		$('#savings').trigger('click');
	});
}

function eneabledSummary(){
	$('#summary').attr('href','#tab4');
	$('#summary').attr('data-toggle','tab');
}
function setupMessage(){
	var yRD = yourRetirementDate();
	$('#year-retire').html(yRD);
	var rA = $('#age-to-retirement').slider().slider('value');
	$('#age-retire').html(rA);
	var forceCash = Number(getForecastIncome()).toLocaleString('en').split('.')[0];
	$('#pound-per-year').html(forceCash);
}


function setupSlide(){
	var rA = $('#age-to-retirement').slider().slider('value');
	$("#age-to-retirement-result").slider().slider('value',rA);
	var cFP = $('#percent-tax-free').slider().slider('value');
	$('#percent-tax-free-result').slider().slider('value',cFP);
}
function setTextToTextField(){
	var cashContribute = round(getCash_Contribute());
	var ContributePercent = getPercent_Contribute()*100;
	$('#txt-you-paying-result').val(cashContribute);
	$('#txt-you-paying-percent-result').val(fixed(ContributePercent));
	
	var cashContriCompany = round(getCash_Contribute_company());
	var percentContriConpany = getPercent_Contribute_company()*100;
	$('#txt-your-employer-result').val(cashContriCompany);
	$('#txt-your-employer-percent-result').val(fixed(percentContriConpany));
	
	var targetPension = $('#txt-target-pensions').val();
	$('#txt-target-pensions-result').val(targetPension);
}

function disableTxtField(){
	$('#txt-your-employer-percent-result').attr("disabled","disabled");
	$('#txt-your-employer-result').attr("disabled","disabled");
	$('#txt-you-paying-percent-result').attr("disabled","disabled");
	$('#txt-you-paying-result').attr("disabled","disabled");
	$('#txt-target-pensions-result').attr("disabled","disabled");
	$('#oneOffLumpSum').attr("disabled","disabled");
	$('#print-data').attr("disabled","disabled");
	$('#nextResult').attr("disabled","disabled");
	$('#backResult').attr("disabled","disabled");
	$('#btn-advanced').attr("disabled","disabled");
}
function eneabledTxtField(){
	$('#txt-your-employer-percent-result').removeAttr("disabled");
	$('#txt-your-employer-result').removeAttr("disabled");
	$('#txt-you-paying-percent-result').removeAttr("disabled");
	$('#txt-you-paying-result').removeAttr("disabled");
	$('#txt-target-pensions-result').removeAttr("disabled");
	$('#oneOffLumpSum').removeAttr("disabled");
	$('#print-data').removeAttr("disabled");
	$('#nextResult').removeAttr("disabled");
	$('#backResult').removeAttr("disabled");
	$('#btn-advanced').removeAttr("disabled");
}
function onChange(){
	$('#txt-your-employer-percent-result').on('change',function(){
		$('#txt-your-employer-percent').val(fixed($(this).val()));
		var cash = $('#txt-your-employer-result').val();
		//if(cash == '' || typeof cash === 'undefined' || cash === null){
			cash = round(getCash_Contribute_company());
			$('#txt-your-employer').val(cash);
			$('#txt-your-employer-result').val(cash);
		//}
		drawChart();	
	});
	$('#txt-your-employer-result').on('change',function(){
		$('#txt-your-employer').val(fixed($(this).val()));
		var percent = $('#txt-your-employer-percent-result').val();
		//if(percent == '' || typeof percent === 'undefined' || percent === null){
			percent = getPercent_Contribute_company();
			percent = percent*100;
			$('#txt-your-employer-percent-result').val(fixed(percent));
			$('#txt-your-employer-percent').val(fixed(percent));
		//}
		drawChart();
	
	});
	$('#txt-you-paying-percent-result').on('change',function(){
		$('#txt-you-paying-percent').val(fixed($(this).val()));
		var cash = $('#txt-you-paying-result').val();
		//if(cash == '' || typeof cash === 'undefined' || cash === null){
			cash = round(getCash_Contribute());
			$('#txt-you-paying').val(cash);
			$('#txt-you-paying-result').val(cash);
		//}
		drawChart();
	});
	$('#txt-you-paying-result').on('change',function(){
		$('#txt-you-paying').val(fixed($(this).val()));
		var percent = $('#txt-you-paying-percent-result').val();
		//if(percent == '' || typeof percent === 'undefined' || percent === null){
			percent = getPercent_Contribute();
			percent = percent*100;
			$('#txt-you-paying-percent').val(fixed(percent));
			$('#txt-you-paying-percent-result').val(fixed(percent));
		//}		
		drawChart();
	});
	$('#txt-target-pensions-result').on('change',function(){
		$('#txt-target-pensions').val($(this).val());
		drawChart();
	});
	$('#oneOffLumpSum').on('change',function(){
		drawChart();
	});
	
	$("input:radio[name='an-grow-percent']").on('change',function(){
		drawChart();
		$('#estimated-annual-modal').modal('hide');
	});
}

function drawChart(){
	var forceCashIncome = getForecastIncome();
	var targetPension = $('#txt-target-pensions').val();
	//if(current_forcecash_income !== forceCashIncome || current_target !== targetPension){
		showRightContent();
		showChartRight();
		disableTxtField();
		$('.top-arrow').hide();
		$('.bot-arrow').hide();
		setupMessage();
		var coinBlue = getCoinBlue(forceCashIncome,targetPension);
		console.log(coinBlue);
		var coinRed = getCoinRed(coinBlue);
		$('.pound-annual-income').html(Number(targetPension).toLocaleString('en').split('.')[0]);
		//prepare for setup coin
		setupCoin(coinBlue,coinRed);
		fallingCoin(1);
		current_forcecash_income = forceCashIncome;
		current_target = targetPension;
	//}
	
}
/*------------------------------------------------------------------*/
function registerActionSummaryTab(){
	$('a[id="summary"]').on('shown.bs.tab', function (e) {
		setupMessageSummary();
		setActionLink();
	});
	$('#backSummary').on('click',function(e){
		$('#results').trigger('click');
	});
	
}
function setActionLink(){
	$('.summary-link').on('click',function(e){
		$('#results').trigger('click');
	});
}
function setupMessageSummary(){
	var forceCashIncome = getForecastIncome();
	var targetPension =  $('#txt-target-pensions').val();
	var percent_income = getForecast_percent_target();
	percent_income = parseFloat(percent_income)*100;
	var tax_free_percent  = $('#percent-tax-free').slider().slider('value');
	var retire_age = $("#age-to-retirement-result").slider().slider('value');
	var tax_free_value = getTax_Free_Value();
	if(parseFloat(forceCashIncome) < parseFloat(targetPension)){
		var shorFall = getShortFall();
		$('.summary-pound-shortfall').html(Number(shorFall).toLocaleString('en').split('.')[0]);
		showNormal();
	}else{
		var excess = forceCashIncome - targetPension;
		$('.summary-pound-excess').html(Number(excess).toLocaleString('en').split('.')[0]);
		showExcess();
	}
	$('.summary-pound-pension').each(function(){
		$(this).html(Number(targetPension).toLocaleString('en').split('.')[0]);
	});
	$('.summary-pound-income').each(function(){
		$(this).html(Number(forceCashIncome).toLocaleString('en').split('.')[0]);
	})
	$('.summary-percent').html(round(percent_income));
	$('.summary-percent-amount').html(tax_free_percent);
	$('.summary-retire-age').each(function(){
		$(this).html(retire_age);
	});
	
	$('.summary-pound-amount').html(Number(tax_free_value).toLocaleString('en').split('.')[0]);
		
}

function showNormal(){
	$('.summary-excess-title').each(function(){
		$(this).hide();
	});
	$('.summary-normal-title').each(function(){
		$(this).show();
	});
}

function showExcess(){
	$('.summary-excess-title').each(function(){
		$(this).show();
	});
	$('.summary-normal-title').each(function(){
		$(this).hide();
	});
}




/*function print*/
function updateDataPrint(){
	var forceCashIncome = getForecastIncome();
	var targetPension =  $('#txt-target-pensions').val();
	var tax_free_percent  = $('#percent-tax-free').slider().slider('value');
	var retire_age = $("#age-to-retirement-result").slider().slider('value');
	var tax_free_value = getTax_Free_Value();
	var shorFall = getShortFall();
	$('.print-pound-pension').html(Number(targetPension).toLocaleString('en').split('.')[0]);
	$('.print-retire-age').each(function(){
		$(this).html(retire_age);
	});
	
	$('.print-percent-amount').html(tax_free_percent);
	$('.print-pound-amount').html(Number(tax_free_value).toLocaleString('en').split('.')[0]);
	$('.print-pound-income').html(Number(forceCashIncome).toLocaleString('en').split('.')[0]);
	$('.print-pound-shortfall').html(Number(shorFall).toLocaleString('en').split('.')[0]);
}
function PrintElement(element)
{
	updateDataPrint();
	Popup($(element).html());
}

function Popup(data) 
{
	var mywindow = window.open('', 'Close Brothers');
	mywindow.document.write('<html><head><title>Pension Accumulators</title>');
	/*optional stylesheet*/ //mywindow.document.write('<link rel="stylesheet" href="main.css" type="text/css" />');
	mywindow.document.write('</head><body >');
	mywindow.document.write(data);
	mywindow.document.write('</body></html>');
	mywindow.document.close(); // necessary for IE >= 10
	mywindow.focus(); // necessary for IE >= 10
	mywindow.print();
	mywindow.close();
	return true;
}
var weeklyReport = {
   "declaredIncomeInput":{
      "ClientName":"giovanni",
      "WeeklyDateHours":[
         {
            "WorkDate":"Mon 10th Aug",
            "WorkHours":"3"
         },
         {
            "WorkDate":"Tue 11th Aug",
            "WorkHours":"7"
         },
         {
            "WorkDate":"Wed 12th Aug",
            "WorkHours":"1"
         },
         {
            "WorkDate":"Thu 13th Aug",
            "WorkHours":"0"
         },
         {
            "WorkDate":"Fri 14th Aug",
            "WorkHours":"4"
         },
         {
            "WorkDate":"Sat 15th Aug",
            "WorkHours":"0"
         },
         {
            "WorkDate":"Sun 16th Aug",
            "WorkHours":"0"
         }
      ],
      "WeeklyIncome":"80.0",
	  "BackDated": false 
     }
    }

//var currentWeekDates = [];

$(document).ready(function() {
    
    // Pre-fill WeeklyReport form 
    // Set current week dates in the weeklyReport object
    var currentWeekDates = retrieveCurrentWeekDates();
    var dateString;
    for (var i = 0; i < 7; i++) {
//        dateString = currentWeekDates[i].toDateString();
        weeklyReport.declaredIncomeInput.WeeklyDateHours[i].WorkDate = currentWeekDates[i];
        $('#date' + i).text(currentWeekDates[i].toDateString());
    }
        console.log("weeklyReport: " + JSON.stringify(weeklyReport));
    
    
    
   
    $("#submitBtn").click(function(e) {
		
		//avoid reload default page
		e.preventDefault();
        //alert("Submit button clicked");  
        //console.log("weeklyReport: " + JSON.stringify(weeklyReport));
        //console.log(weeklyReport.declaredIncomeInput.WeeklyDateHours[0].WorkHours);
        
        weeklyReport.declaredIncomeInput.WeeklyDateHours[0].WorkHours = $("#monHours").val();
        weeklyReport.declaredIncomeInput.WeeklyDateHours[1].WorkHours = $("#tueHours").val();
        weeklyReport.declaredIncomeInput.WeeklyDateHours[2].WorkHours = $("#wedHours").val();
        weeklyReport.declaredIncomeInput.WeeklyDateHours[3].WorkHours = $("#thuHours").val();
        weeklyReport.declaredIncomeInput.WeeklyDateHours[4].WorkHours = $("#friHours").val();
        weeklyReport.declaredIncomeInput.WeeklyDateHours[5].WorkHours = $("#satHours").val();
        weeklyReport.declaredIncomeInput.WeeklyDateHours[6].WorkHours = $("#sunHours").val();
        weeklyReport.declaredIncomeInput.WeeklyIncome = $("#weeklyIncome").val();
       
        startIncomeManagementProcess(weeklyReport);

		window.location.href='http://ibmbpm/web/thanks.html';
		// next line prevent the code to return to the index.html page, making the location.href not working
		return false;   
    }); 
	
	
	    $("#prevWeekBtn").click(function(e) {
			
			//avoid reload default page
			e.preventDefault();
//        	alert("prevWeekBtn button clicked");  
  
			calculatePrevWeek();	
			
			//define this transaction as backdated
			weeklyReport.declaredIncomeInput.BackDated = true;
		      
			weeklyReport.declaredIncomeInput.WeeklyDateHours[0].WorkHours = $("#monHours").val();
        	weeklyReport.declaredIncomeInput.WeeklyDateHours[1].WorkHours = $("#tueHours").val();
        	weeklyReport.declaredIncomeInput.WeeklyDateHours[2].WorkHours = $("#wedHours").val();
        	weeklyReport.declaredIncomeInput.WeeklyDateHours[3].WorkHours = $("#thuHours").val();
			weeklyReport.declaredIncomeInput.WeeklyDateHours[4].WorkHours = $("#friHours").val();
        	weeklyReport.declaredIncomeInput.WeeklyDateHours[5].WorkHours = $("#satHours").val();
        	weeklyReport.declaredIncomeInput.WeeklyDateHours[6].WorkHours = $("#sunHours").val();
        	weeklyReport.declaredIncomeInput.WeeklyIncome = $("#weeklyIncome").val();
		}); 
	
	
});


function retrieveCurrentWeekDates(){
    
    var currentDate = new Date();
    var weekDay = currentDate.getDay();
    if (weekDay === 0) {
        weekDay = 7;
    }
    // set the date to the monday of the current week based on the current date (eg: Fri(5) - (5-1) = Mod(1) )
    currentDate.setDate(currentDate.getDate() - (weekDay - 1));

    var currentWeekDates = [currentDate];
    var currentTimestamp = +currentDate; //This represent the date in timestamp, same as currentDate.getTime()
    var msInDay = 1000 * 24 * 60 * 60;
    for (var i = 1; i < 7; i++) {
		// move to next day
        currentWeekDates.push(new Date(currentTimestamp + i * msInDay));
    }
//    console.log(currentWeekDates);
    return currentWeekDates;
      
}


function startIncomeManagementProcess(weeklyReport){
    
    console.log("### In startIncomeManagementProcess");
    
    var processInputData = 'action=start&bpdId=25.6cfdeb92-8d6d-492a-a197-8f4ff1a1b30f&branchId=2063.538af2a7-d250-454d-97b4-06caf224e50a&params=' + JSON.stringify(weeklyReport);
	console.log("processInputData: " + processInputData);

  
    /**
    $.ajax({
        type: 'POST',
        url: 'http://ibmbpm:9080/rest/bpm/wle/v1/process',
        data: processInputData,
        dataType : 'jsonp',   //you may use jsonp for cross origin request
        crossDomain: true,
        async: false,
        beforeSend: function(xhr) {
            xhr.setRequestHeader('Authorization', 'Basic YWRtaW46YWRtaW4='),
            xhr.setRequestHeader('Accept', 'application/json'),
            xhr.setRequestHeader('Access-Control-Allow-Origin: *', '*'),
            xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
  }
});
    */
    
 //   /**
    var xmlhttp = new XMLHttpRequest();
 //   xmlhttp.open("POST","http://ibmbpm:9080/rest/bpm/wle/v1/process",true);
    xmlhttp.open("POST","http://ibmbpm/rest/bpm/wle/v1/process",true);
    xmlhttp.setRequestHeader("Authorization", "Basic YWRtaW46YWRtaW4="),
    xmlhttp.setRequestHeader("Accept", "application/json"),
    xmlhttp.setRequestHeader("Access-Control-Allow-Origin", "*"),
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
    xmlhttp.send(processInputData);
 //   */
    
}


function calculatePrevWeek(){

	for (var i = 0; i < 7; i++) {
		
		console.log("### In calculatePrevWeek"); 	
      	console.log("weeklyReport: " + JSON.stringify(weeklyReport));
        		 weeklyReport.declaredIncomeInput.WeeklyDateHours[i].WorkDate.setDate(weeklyReport.declaredIncomeInput.WeeklyDateHours[i].WorkDate.getDate()-7);
        $('#date' + i).text(weeklyReport.declaredIncomeInput.WeeklyDateHours[i].WorkDate.toDateString());
    }
        
	
}


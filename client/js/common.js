var Settings = {
	dateFormat: "yyyy-mm-dd"
};

var DefaultCallbacks = {
	ajax: function(msg){
			return function(data){
				console.log(msg);
				console.log(data);	
			};				
	}
};

var Services = {};
Services.Schedule = {
	
	saveSchedule: function(data, successMessage, errorMessage){
		return $.ajax(
			"/saveSchedule",
			{
				method: "post",
				data: JSON.stringify(data),
				contentType: "application/json; charset=utf-8"
			}
		)
		.done(DefaultCallbacks.ajax(successMessage))
  		.error(DefaultCallbacks.ajax(errorMessage));
	},

	getSchedules: function(successMessage, errorMessage){
		return $.ajax(
			"/getSchedules",
			{
				method: "get",
				dataType: "json"	
			}	
		)
		.done(DefaultCallbacks.ajax(successMessage))
  		.error(DefaultCallbacks.ajax(errorMessage));
	},

	getSchedule: function(id, successMessage, errorMessage){
		return $.ajax(
			"/getScheduleFullInfo",
			{
				method: "get",
				data: {id: id},
				dataType: "json"	
			}		
		)
		.done(DefaultCallbacks.ajax(successMessage))
  		.error(DefaultCallbacks.ajax(errorMessage));
	}

}
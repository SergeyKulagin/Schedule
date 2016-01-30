var Settings = {
	dateFormat: "yyyy-mm-dd"
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
		).done(function(data){
  			console.log(successMessage);
  		})
  		.error(function(data){
  			console.log(errorMessage);
  		});
	}

}
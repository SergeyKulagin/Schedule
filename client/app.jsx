var App = React.createClass({
	getInitialState: function(){
		return {schedules:[], currentSchedule: {period:[]}};
	},
	componentDidMount: function(){
		console.log("Request schedules list");
		this.getSchedules();
	},

	getSchedules: function() {
		var context = this;
		Services.Schedule.getSchedules("Get schedules success: %O")
		.done(function(data){
			var type = "NO_SCHEDULES";
			if(data && data.length > 0){
				type = "MAIN";	
			}
			context.setState({schedules:data, type: type, currentSchedule: {period:[]}});			
		});	
	},

	onCreateSchedule: function(){
		this.setState({type: "CREATE"});	
	},

	onEditSchedule: function(id){	     
	     var context = this;
	     Services.Schedule.getSchedule(id, "Get schedule for update success: %O", "Error getting the schedule")
	     .done(function(schedule){
	     	context.setState({currentSchedule: schedule, type: "CREATE"})	
	     });
	},

	render: function () {
		switch(this.state.type){
			case "CREATE":			
			return <CreateSchedulePage schedule={this.state.currentSchedule} onEditSchedule={this.onEditSchedule} onCreateSchedule={this.onCreateSchedule} schedules={this.state.schedules} refreshSchedules={this.getSchedules}/>;
			case "MAIN":
			return  <MainPage schedules={this.state.schedules} onEditSchedule={this.onEditSchedule} onCreateSchedule={this.onCreateSchedule} refreshSchedules={this.getSchedules}/>;
			case "NO_SCHEDULES":
			return <NoSchedulesPage onCreateSchedule={this.onCreateSchedule}/> ;
		}		
		return <NoSchedulesPage onCreateSchedule={this.onCreateSchedule}/> ;
	}
});

var MainPage = React.createClass({
	render: function(){
		return  <div className="container-fluid">
		           <div className="row">
		           		<div className="col-md-3">
		           			<div id="schedulesList">
		           		    	<SchedulesList  schedules={this.props.schedules} onEditSchedule={this.props.onEditSchedule}/>
		           		    	<input type="button" className="btn btn-default" value="Create" onClick={this.props.onCreateSchedule}></input>
		           		    </div>
		           		</div>				
						<div className="col-md-9">
							<MainCalendar/>
						</div>
		           </div>					
		</div>;
	}	
}); 

var CreateSchedulePage = React.createClass({
	render: function(){
		return  <div className="container-fluid">
		           <div className="row">
		           		<div className="col-md-3">
		           			<div id="schedulesList">
		           		    	<SchedulesList  schedules={this.props.schedules} onEditSchedule={this.props.onEditSchedule}/>
		           		    	<input type="button" className="btn btn-default" value="Create" onClick={this.props.onCreateSchedule}></input>
		           		    </div>	
		           		</div>				
						<div className="col-md-9">
							<AddUpdateSchedule schedule={this.props.schedule} refreshSchedules={this.props.refreshSchedules}/>
						</div>
		           </div>					
				</div>;
	}	
}); 

var NoSchedulesPage = React.createClass({
	render: function(){
		return  <div id="schdulesListNoContent" className="jumbotron" >
								No schedules so far!
								<input type="button" className="btn btn-default" value="Create" onClick={this.props.onCreateSchedule}></input>
				</div>;	
	}	
});

ReactDOM.render(
  <App/>,
  document.getElementById('mainPage')
);



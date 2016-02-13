var App = React.createClass({
	getInitialState: function(){
		return {schedules:[], scheduleCreate: false, currentSchedule: {period:[]}};
	},
	componentDidMount: function(){
		this.getSchedules();
	},

	getSchedules: function() {
		var context = this;
		Services.Schedule.getSchedules()
		.done(function(data){
			context.setState({schedules:data, scheduleCreate: false});			
		});	
	},

	onCreateSchedule: function(){
		this.setState({scheduleCreate: true});	
	},

	onEditSchedule: function(id){
	     console.log("On edit schedule " + id);
	     var context = this;
	     Services.Schedule.getSchedule(id, "Get schedule", "Error getting schedule")
	     .done(function(schedule){
	     	context.setState({currentSchedule: schedule, scheduleCreate: true})	
	     });
	},

	render: function () {

		var schedulesList = <div id="schedulesList">
		           		    	<SchedulesList  schedules={this.state.schedules} onEditSchedule={this.onEditSchedule}/>
		           		    	<input type="button" className="btn btn-default" value="Create" onClick={this.onCreateSchedule}></input>
		           		    </div>	;
		var noSchedules = <div id="schdulesListNoContent" className="jumbotron" >
								No schedules so far!
								<input type="button" className="btn btn-default" value="Create" onClick={this.onCreateSchedule}></input>
						  </div>;	
		var schedulesUI = this.state.schedules && this.state.schedules.length > 0 ? schedulesList : noSchedules; 
		console.log(this.state)					
		var createScheduleUI = this.state.scheduleCreate ? <AddUpdateSchedule schedule={this.state.currentSchedule} refreshSchedules={this.getSchedules}/> : '';		

		return <div className="container-fluid">
		           <div className="row">
		           		<div className="col-md-3">
		           			{schedulesUI}
		           		</div>				
						<div className="col-md-9">
							<MainCalendar></MainCalendar>
						</div>
		           </div>					
				</div>;
	}
});

ReactDOM.render(
  <App/>,
  document.getElementById('mainPage')
);



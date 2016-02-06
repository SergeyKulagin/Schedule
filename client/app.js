var App = React.createClass({
	getInitialState: function(){
		return {schedules:[], scheduleCreate: false};
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

	render: function () {

		var schedulesList = <div id="schedulesList">
		           		    	<SchedulesList  schedules={this.state.schedules}/>
		           		    </div>	;
		var noSchedules = <div id="schdulesListNoContent" className="jumbotron" >
								No schedules so far!
								<input type="button" className="btn btn-default" value="Create" onClick={this.onCreateSchedule}></input>
						  </div>;	
		var schedulesUI = this.state.schedules && this.state.schedules.length > 0 ? schedulesList : noSchedules; 					
		var createScheduleUI = this.state.scheduleCreate ? <AddUpdateSchedule refreshSchedules={this.getSchedules}/> : '';		

		return <div className="container-fluid">
		           <div className="row">
		           		<div className="col-md-3">
		           			{schedulesUI}
		           		</div>				
						<div className="col-md-9">
							{createScheduleUI}
						</div>
		           </div>					
				</div>;
	}
});

ReactDOM.render(
  <App/>,
  document.getElementById('mainPage')
);



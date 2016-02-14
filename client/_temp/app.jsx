var App = React.createClass({
	getInitialState: function(){
		return {};
	},
	componentDidMount: function(){
		this.getSchedules();
	},

	getSchedules: function() {
		var context = this;
		Services.Schedule.getSchedules()
		.done(function(data){
			hashHistory.push("main", null, {schedules:data});		
		});	
	},
	render: function(){
		return <div></div>;
	}
});


var NoSchedulesPage = React.createClass({
	onCreateSchedule: function(){
		hashHistory.push("addSchedule", null, {schedule:{}});		
	},
	render: function(){
		return <div className="container-fluid">
					<div id="schdulesListNoContent" className="jumbotron" >
								No schedules so far!
						<input type="button" className="btn btn-default" value="Create schedule" onClick={this.onCreateSchedule}></input>
					</div>
				</div>;	
	}
});

var AddScheduleStandalonePage =  React.createClass({	
	getInitialState: function(){
		return {schedule: {period:[]}}
	},
	render: function(){
		return <div className="container-fluid">
					<div className="row">
						<div className="col-md-12">
							<AddUpdateSchedule schedule={this.state.schedule}/>
						</div>						
					</div>
				</div>;	
	}
});

var CreateSchedulePage =  React.createClass({	
	getInitialState: function(){
		return {schedule: {period:[]}}
	},
	render: function(){
		return <div className="container-fluid">
		           <div className="row">
		           		<div className="col-md-3">
		           		<div id="schedulesList">
		           		    	<SchedulesList  schedules={this.state.schedules} onEditSchedule={this.onEditSchedule}/>
		           		    	<input type="button" className="btn btn-default" value="Create" onClick={this.onCreateSchedule}></input>
		           		    </div>
		           		</div>				
						<div className="col-md-2">
							<AddUpdateSchedule schedule={this.state.schedule}/>
						</div>
		           </div>					
		</div>;
	}
});


var MainPage =  React.createClass({	
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
		hashHistory.push("create");
	},

	onEditSchedule: function(id){
	     console.log("On edit schedule " + id);
	     var context = this;
	     Services.Schedule.getSchedule(id, "Get schedule", "Error getting schedule")
	     .done(function(schedule){
	     	context.setState({currentSchedule: schedule, scheduleCreate: true})	
	     });
	},
	render: function(){
		return <div className="container-fluid">
		           <div className="row">
		           		<div className="col-md-3">
		           		<div id="schedulesList">
		           		    	<SchedulesList  schedules={this.state.schedules} onEditSchedule={this.onEditSchedule}/>
		           		    	<input type="button" className="btn btn-default" value="Create" onClick={this.onCreateSchedule}></input>
		           		    </div>
		           		</div>				
						<div className="col-md-9">
							<MainCalendar/>
						</div>
		           </div>					
				</div>;
	}
});


var routes = (
	<Route name="app" path="/" handler={App}>
		<Route name="noSchedules" path="/noSchedules" component={NoSchedulesPage}/>
		<Route name="addSchedule" path="addSchedule" component={AddScheduleStandalonePage}/>
		<Route name="main" path="main" component={MainPage}/>
		<Route name="create" path="create" component={CreateSchedulePage}/>
	</Route>		
);

ReactDOM.render(<Router history={hashHistory}>{routes}</Router>, document.getElementById('mainPage'));
var App = React.createClass({
	getInitialState: function() {
		return {
			schedules: [],
			currentSchedule: {
				period: []
			},
			calculatedSchedule: {}
		};
	},
	componentDidMount: function() {
		console.log("Request schedules list");
		this.getSchedules();
	},

	getSchedules: function() {
		var context = this;
		Services.Schedule.getSchedules("Get schedules success: %O")
			.done(function(data) {
				var type = "NO_SCHEDULES";
				if (data && data.length > 0) {
					type = "MAIN";
				}
				context.setState({
					schedules: data,
					type: type,
					currentSchedule: {
						period: []
					},
					calculatedSchedule: {}
				});
			});
	},

	onCreateSchedule: function() {
		this.setState({
			type: "CREATE",
			currentSchedule: {
				period: []
			}
		});
	},

	onEditSchedule: function(id) {
		var context = this;
		Services.Schedule.getSchedule(id, "Get schedule for update success: %O", "Error getting the schedule")
			.done(function(schedule) {
				context.setState({
					currentSchedule: schedule,
					type: "CREATE"
				})
			});
	},

	onViewSchedule: function(id) {
		var context = this;
		Services.Schedule.getCalculatedSchedule(id, "Get calculated schedule: %O", "Error getting the calc. schedule")
			.done(function(calculatedSchedule) {
				context.setState({
					calculatedSchedule: {
						periodItems: calculatedSchedule
					},
					type: "MAIN"
				})
			});
	},

	render: function() {
		switch (this.state.type) {
			case "CREATE":
				return <CreateSchedulePage schedule={this.state.currentSchedule} onEditSchedule={this.onEditSchedule} onCreateSchedule={this.onCreateSchedule} onViewSchedule={this.onViewSchedule} schedules={this.state.schedules} refreshSchedules={this.getSchedules}/>;
			case "MAIN":
				return <MainPage schedules={this.state.schedules} calculatedSchedule={this.state.calculatedSchedule} onViewSchedule={this.onViewSchedule} onEditSchedule={this.onEditSchedule} onCreateSchedule={this.onCreateSchedule} refreshSchedules={this.getSchedules}/>;
			case "NO_SCHEDULES":
				return <NoSchedulesPage onCreateSchedule={this.onCreateSchedule}/>;
		}
		return <NoSchedulesPage onCreateSchedule={this.onCreateSchedule}/>;
	}
});

var MainPage = React.createClass({
	render: function() {
		return <div className="container-fluid">
		           <div className="row">
		           		<div className="col-md-3">
		           			<div id="schedulesList">
		           		    	<SchedulesList  schedules={this.props.schedules} onViewSchedule={this.props.onViewSchedule} onEditSchedule={this.props.onEditSchedule}/>
		           		    	<input type="button" className="btn btn-default" value="Create" onClick={this.props.onCreateSchedule}></input>
		           		    </div>
		           		    </div>				
						<div className="col-md-9">
							<MainCalendar schedule={this.props.calculatedSchedule}/>
						</div>
		           </div>					
		</div>;
	}
});

var CreateSchedulePage = React.createClass({
	onCreate: function() {
		this.props.onCreateSchedule();
	},
	render: function() {
		return <div className="container-fluid">
		           <div className="row">
		           		<div className="col-md-3">
		           			<div id="schedulesList">
		           		    	<SchedulesList  schedules={this.props.schedules} onViewSchedule={this.props.onViewSchedule} onEditSchedule={this.props.onEditSchedule}/>
		           		    	<input type="button" className="btn btn-default" value="Create" onClick={this.onCreate}></input>
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
	render: function() {
		return <div id="schdulesListNoContent" className="jumbotron" >
								No schedules so far!
								<input type="button" className="btn btn-default" value="Create" onClick={this.props.onCreateSchedule}></input>
				</div>;
	}
});

ReactDOM.render(
	<App/>,
	document.getElementById('mainPage')
);
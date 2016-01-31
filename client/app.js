var App = React.createClass({
	getInitialState: function(){
		return {schedules:[]};
	},
	componentDidMount: function(){
		var context = this;
		Services.Schedule.getSchedules()
		.done(function(data){
			context.setState({schedules:data})
		});
	},

	render: function () {
		return <div className="conteiner">
					<div className="schedules-list-container">
						<SchedulesList schedules={this.state.schedules}/>
					</div>				
				<AddUpdateSchedule/>
				</div>;
	}
});

ReactDOM.render(
  <App/>,
  document.getElementById('mainPage')
);



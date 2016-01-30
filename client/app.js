var App = React.createClass({
	getInitialState: function(){
		return {schedules:[]};
	},
	componentDidMount: function(){
		Services.Schedule.getSchedules()
		.done(function(data){
			this.setState({schedules:data})
		});
	},

	render: function () {
		return <SchedulesList schedules={this.state.schedules}/>;
	}
});

ReactDOM.render(
  <App/>,
  document.getElementById('mainPage')
);



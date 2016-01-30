
window.SchedulesList = React.createClass({
	render: function () {
		return (
				<div className="container">
					{this.props.schedules.map(function(schedule){
						return <ScheduleItem name = {schedule.name} key={schedule.id}/>;	
					})}
				</div>
			);
	}
});

var ScheduleItem = React.createClass({
	render: function () {
		return <div className="row">
			<div className="col-md-10">{this.props.name}</div>
			<div className="col-md-2"><div className="btn btn-default btn-xs">Edit</div></div>
		</div>;
	}
});
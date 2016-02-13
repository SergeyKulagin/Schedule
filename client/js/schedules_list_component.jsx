window.SchedulesList = React.createClass({
	render: function () {
		var context = this;
		return (
				<div className="container-fluid ">
					{this.props.schedules.map(function(schedule){
						return <ScheduleItem name = {schedule.name} scheduleId={schedule._id} key={schedule._id} onEditSchedule={context.props.onEditSchedule}/>;	
					})}
				</div>
			);
	}
});

var ScheduleItem = React.createClass({
	 
	render: function () {
		return <div className="row">
			<div className="col-md-10">{this.props.name}</div>
			<div className="col-md-2"><div className="btn btn-default btn-xs" onClick={this.props.onEditSchedule.bind(this, this.props.scheduleId)}>Edit</div></div>
		</div>;
	}
});
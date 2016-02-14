window.SchedulesList = React.createClass({
	render: function () {
		var context = this;
		return (
				<div className="container-fluid ">
					{this.props.schedules.map(function(schedule){
						return <ScheduleItem name = {schedule.name} scheduleId={schedule._id} key={schedule._id} onViewSchedule={context.props.onViewSchedule} onEditSchedule={context.props.onEditSchedule}/>;	
					})}
				</div>
			);
	}
});

var ScheduleItem = React.createClass({

	onEdit: function(){
		this.props.onEditSchedule(this.props.scheduleId);
	},

	onView: function(){
		this.props.onViewSchedule(this.props.scheduleId);
	},
	 
	render: function () {
		return <div className="row">
			<div className="col-md-8">{this.props.name}</div>
			<div className="col-md-2">
				<div className="btn btn-default btn-xs" onClick={this.onEdit}>Edit</div>
			</div>
			<div className="col-md-2">
				<div className="btn btn-default btn-xs" onClick={this.onView}>View</div>
			</div>
		</div>;
	}
});
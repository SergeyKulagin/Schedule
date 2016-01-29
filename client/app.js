var AddUpdateSchedule = React.createClass({
	render: function(){
		return <div className="container add-or-update-schedule-container">
			<div className="row">
			    <label className="col-md-6">Schedule name</label>
				<input className="col-md-6" type="text" name="scheduleName"/>
			</div>
			<div className="row">
			    <label className="col-md-6">Start date</label>
				<input className="col-md-6" type="date" name="startDate"/>
			</div>
			<div>
				<input type="button" name="save" value="Save"/>
			</div>
		</div>;
	}
});


var App = React.createClass({
	render: function () {
		return <AddUpdateSchedule/>;
	}
});

ReactDOM.render(
  <App/>,
  document.getElementById('mainPage')
);
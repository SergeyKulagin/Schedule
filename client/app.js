var App = React.createClass({
	render: function () {
		return <AddUpdateSchedule/>;
	}
});


var AddUpdateSchedule = React.createClass({
	getInitialState: function(){
		return {activities:[]};
	},
	render: function(){
		return <div className="add-or-update-schedule-container">
			<div className="row">
			    <label className="col-md-6">Schedule name</label>
				<input className="col-md-6" type="text" name="scheduleName" onChange={this.onNameChange}/>
			</div>
			<div className="row">
			    <label className="col-md-6">Start date</label>
				<input className="col-md-6" type="date" name="startDate"/>
			</div>
			<ActivityItems activities={this.state.activities} onActivitiesChange={this.onActivitiesChange}/>	
			<div className="row">
				  <div className="schedule-item-add-btn" onClick={this.onPeriodAdd}/>
			</div>
			<div className="row">
				<input type="button" name="save" value="Save" onClick={this.onSave}/>
			</div>
		</div>;
	},
	onPeriodAdd: function(event) {
		var defaultActivity = {
			name: "Default",
			color: "",
			days: []
		};
		var activities = this.state.activities;
		activities.push(defaultActivity);
    	this.setState({activities:activities});
  	},
  	onNameChange: function(event){
  		this.setState({name: event.target.value});	
  	},
  	onActivitiesChange:function(activities){
  		console.log(activities);
  	},
  	onSave: function(){
  		console && console.log(this.state);
  	}
});

var ActivityItems = React.createClass({
	onChange: function(activity){
		var activities = this.props.activities;
		activities[activity.key] = activity;		
		this.props.onActivitiesChange(activities);		
	},
	render: function(){
		var activities = this.props.activities;
		if(!activities){
			return <div/>;
		}
		var activitiesWidgets = [];
		for (var i = 0; i < activities.length; i++) {
			var activity = activities[i];
			activitiesWidgets.push(<ActivityItem model={activity} key={i} onChange={this.onChange}/>);
		};
		return <div>{activitiesWidgets}</div>;
	}
});


var ActivityItem =  React.createClass({
	getInitialState: function(){
		return {
			id: this.props.id,
			name: this.props.model.name
		};
	},
	componentDidMount: function(){
		$('select[name="colorpicker"]').simplecolorpicker();
	},
	render: function(){
		return <div className="activity-item">
		          <div className="row">
		          	<input className="col-md-6 bold" value={this.state.name} onChange={this.onNameChange}></input>
		          </div>
		            <div className="row">
		               <div className="col-md-6"><label >Color</label></div>
		                <div className="col-md-6">
		                  <select className="colorPicker" name="colorpicker">
								<option value="#7bd148">Green</option>
								<option value="#5484ed">Bold blue</option>
								<option value="#a4bdfc">Blue</option>
								<option value="#46d6db">Turquoise</option>
								<option value="#7ae7bf">Light green</option>
								<option value="#51b749">Bold green</option>
								<option value="#fbd75b">Yellow</option>
								<option value="#ffb878">Orange</option>
								<option value="#ff887c">Red</option>
								<option value="#dc2127">Bold red</option>
								<option value="#dbadff">Purple</option>
								<option value="#e1e1e1">Gray</option>	            				   
				  		   </select>
				  		   </div>	
		          </div>		          		          
		          <div className="col-md-6">
		          	<ScheduleItemPeriods className="col-md-5" items={this.props.items}/>
		          </div>		      	  
		    	</div>;	
	},
	onNameChange: function(event){
		 this.setState({name: event.target.value});
		 this.props.onChange(this.state);
	}
});

var ScheduleItemPeriods = React.createClass({
	render: function(){
		var items = this.props.items;
		if(!items){
			return <div/>;
		}
		var itemsWidgets = [];
		for (var i = items.length - 1; i >= 0; i--) {
			var item = items[i];
			itemsWidgets.push(<ScheduleItemPeriod id={this.props.day}/>);
		};
		return <div>{itemsWidgets}</div>;
	}
});

var ScheduleItemPeriod = React.createClass({
	render: function(){		
		return <div>
					<label>Days</label>	
					<input></input>
				</div>;
	}
});

ReactDOM.render(
  <App/>,
  document.getElementById('mainPage')
);



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
				<input className="col-md-6" type="date" name="startDate" onChange={this.onStartDateChange}/>
			</div>
			<ActivityItems activities={this.state.activities} />	
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
			name: "",
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
  	onStartDateChange: function(event){
  		this.setState({start_date: event.target.value});	
  	},
  	onActivitiesChange:function(activities){
  		console.log(activities);
  	},
  	onSave: function(){
  		console && console.log(this.state);
  		$.ajax("/service/saveSchedule")
  		.done(function(data){
  			window.alert("Schedule was saved");
  		})
  		.error(function(data){
  			window.alert("Error saving the schedule");
  		});
  	}
});

var ActivityItems = React.createClass({
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
		return this.props.model;
	},
	componentDidMount: function(){
		var context = this;
		$('select[name="colorpicker"]')
		.simplecolorpicker({picker: true})
		.on('change', function(){
			context.props.model.color = $('select[name="colorpicker"]').val();
		});
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
		          <div className="row">
		            <label className="col-md-6">Periods: </label>
		          	<ScheduleItemPeriods className="col-md-6" items={this.state.days}/>
		          	<div onClick={this.onDayAdd}>Add day</div>
		          </div>		      	  
		    	</div>;	
	},
	onNameChange: function(event){
		 this.setState({name: event.target.value});
		 this.props.model.name = event.target.value;		 
	},
	onDayAdd: function(event){
		console.log("On day add");
		var days = this.state.days;
		days.push("");
		this.setState({days: days});
	}
});

var ScheduleItemPeriods = React.createClass({
	onDateChange: function(itemHolder){
		this.props.items[itemHolder.id] = itemHolder.day;
	},
	render: function(){
		var items = this.props.items;
		if(!items){
			return <div/>;
		}
		console.log("Render schedule item perios")
		var itemsWidgets = [];
		for (var i = 0; i < items.length; i++) {
			var item = items[i];
			var dateHolder = {day: item, id: i};
			itemsWidgets.push(<ScheduleItemPeriod key={i} day={dateHolder} onDateChange={this.onDateChange}/>);
		};
		return <div>
					<div>{itemsWidgets}</div>					
				</div>;
	}
});

var ScheduleItemPeriod = React.createClass({
	onDateChange: function(event){
	     this.props.day.day = event.target.value; 		
	     this.props.onDateChange(this.props.day);  
	},
	render: function(){		
		return <input type="date" onChange={this.onDateChange}></input>;
	}
});

ReactDOM.render(
  <App/>,
  document.getElementById('mainPage')
);



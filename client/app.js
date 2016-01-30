var Settings = {
	dateFormat: "yyyy-mm-dd"
};

var App = React.createClass({
	render: function () {
		return <AddUpdateSchedule/>;
	}
});


var AddUpdateSchedule = React.createClass({
	
	componentDidMount: function(){
		var context = this;
		$(ReactDOM.findDOMNode(this)).find(".date").datepicker({
        	format: Settings.dateFormat,
        	multidate: false,
    		autoclose: true
    	}).on("changeDate", function(event){
				console.log("on date change");
	     		var date = event.currentTarget.value; 	  
	     		context.setState({start_date: date});	   			     			     	
		});	;
	},
	getInitialState: function(){
		return {activities:[]};
	},
	render: function(){
		return <div className="add-or-update-schedule-container container-fluid">
			<div className="row">
			   <div className="col-md-6">
			   		<label>Schedule name:</label>
			   </div>
			   <div className="col-md-6">
			   		<input type="text" placeholder="e.g. A bandit schedule" className="form-control" name="scheduleName" onChange={this.onNameChange}/>
			   </div>			    			
			</div>
			<div className="row">
			   <div className="col-md-6">
			    <label>Start date:</label>
			   </div>
			   <div className="col-md-6">
				<input name="startDate" placeholder={Settings.dateFormat}  className="form-control date" onChange={this.onStartDateChange}/>
				</div>
			</div>
			<ActivityItems activities={this.state.activities} />	
			<div className="row">
				<div className="col-md-12"> 	
				  <div className="schedule-item-add-btn" onClick={this.onPeriodAdd}/>
				</div>  
			</div>
			<div className="row">
			    <div className="col-md-12">
			    	<input type="button" className="btn btn-default pull-right" name="save" value="Save" onClick={this.onSave}/>
			    </div>				
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
  	onActivitiesChange:function(activities){
  		console.log(activities);
  	},
  	onSave: function(){
  		console && console.log(this.state);
  		$.ajax("/service/saveSchedule")
  		.done(function(data){
  			console.log("Schedule was saved");
  		})
  		.error(function(data){
  			console.log("Error saving the schedule");
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
		.simplecolorpicker({})
		.on('change', function(){
			context.props.model.color = $('select[name="colorpicker"]').val();
		});
	},
	render: function(){
		return <div className="activity-item">
		          <div className="row">
		            <div className="col-md-6">
		          		<label>Activity name:</label>
		            </div>
		            <div className="col-md-6">
		          		<input value={this.state.name} placeholder="e.g. Rob the bank" className="form-control" onChange={this.onNameChange}></input>
		            </div>
		          </div>
		            <div className="row">
		               <div className="col-md-6"><label >Color:</label></div>
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
		            <div className="col-md-6">
		            	<label >Days: </label>
		            </div>
		            <div className="col-md-6">
		            	<DaysItems className="col-md-12" days={this.state.days}/>		          	    
		            </div>		          	
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

/*var ScheduleItemPeriods = React.createClass({
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
});*/

var DaysItems = React.createClass({
	getInitialState: function(){
		return {days: this.props.days && this.props.days.join()};
	},
	componentDidMount: function(){
		var context = this;
		$(ReactDOM.findDOMNode(this)).datepicker({
    		format: Settings.dateFormat,
    		multidate: true    		
		}).on("changeDate", function(event){
				console.log("on date change");
	     		var daysString = event.currentTarget.value; 	     		
	     		var days = daysString.split();
	     		context.props.days.slice(0, context.props.days.length);
	     		for(var i = 0; i < days.length; i++){
	     			context.props.days.push(days[i]);
	     		}	     		
		});	
	},	
	render: function(){		
		return <input className="date form-control" value={this.state.days}></input>;
	}
});

ReactDOM.render(
  <App/>,
  document.getElementById('mainPage')
);



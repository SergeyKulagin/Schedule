window.AddUpdateSchedule = React.createClass({
	componentDidMount: function(){		
		var context = this;
		$(ReactDOM.findDOMNode(this)).find(".start-date").datepicker({
        	format: Settings.dateFormat,
        	multidate: false,
    		autoclose: true
    	}).on("changeDate", function(event){				
	     		var date = event.currentTarget.value; 	  
	     		var schedule = context.state.schedule;
	     		schedule.start_date = date;
	     		context.setState({schedule: schedule});	   			     			     	
		});	
		$(ReactDOM.findDOMNode(this)).find(".end-date").datepicker({
        	format: Settings.dateFormat,
        	multidate: false,
    		autoclose: true
    	}).on("changeDate", function(event){				
	     		var date = event.currentTarget.value; 	  
	     		var schedule = context.state.schedule;
	     		schedule.end_date = date;
	     		context.setState({schedule: schedule});	   			     			     	
		});	

	},
	componentWillReceiveProps: function(nextProps){		
		this.setState({schedule: nextProps.schedule})		
	},
	getInitialState: function(){		
		return {schedule: this.props.schedule};		
	},
	render: function(){			
		return <div className="add-or-update-schedule-container container-fluid pull-left">
			<div className="row">
				<h2 className="col-md-12">Add schedule:</h2>
			</div>
			<div className="row">
			   <div className="col-md-6">
			   		<label>Schedule name:</label>
			   </div>
			   <div className="col-md-6">
			   		<input type="text" placeholder="e.g. A bandit's schedule" className="form-control" name="scheduleName" value={this.state.schedule.name} onChange={this.onNameChange}/>
			   </div>			    			
			</div>
			<div className="row">
			   <div className="col-md-6">
			    <label>Start date:</label>
			   </div>
			   <div className="col-md-6">
				<input name="startDate" placeholder={Settings.dateFormat} value={this.state.schedule.start_date}  className="form-control start-date"/>
				</div>
			</div>
			<div className="row">
			   <div className="col-md-6">
			    <label>End date:</label>
			   </div>
			   <div className="col-md-6">
				<input name="endDate" placeholder={Settings.dateFormat} value={this.state.schedule.end_date}  className="form-control end-date"/>
				</div>
			</div>
			<ActivityItems activities={this.state.schedule.period} />	
			<div className="row">
				<div className="col-md-12"> 	
				  <div className="btn btn-default btn-xs pull-right schedule-item-add-btn" onClick={this.onPeriodAdd}>Add activity</div>
				</div>  
			</div>
			<div className="row">
			    <div className="col-md-12">
			    	<input type="button" className="btn btn-primary pull-right" name="save" value="Save" onClick={this.onSave}/>
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
		var activities = this.state.schedule.period;
		activities.push(defaultActivity);
		var schedule = this.state.schedule;
		schedule.period = activities;
    	this.setState({schedule: schedule});
  	},
  	onNameChange: function(event){
  		var schedule = this.state.schedule;
  		schedule.name = event.target.value;
  		this.setState({schedule: schedule});	  		
  	},
  	onActivitiesChange:function(activities){
  		console.log("On activities change: %O", activities);
  	},
  	onSave: function(){
  		console.log("Save schedule: %O", this.state.schedule);  		
  		var context = this;
  		Services.Schedule.saveSchedule(this.state.schedule, "Schedule was saved successfully", "Error saving the schedule")
  		.done(function(){
  			context.props.refreshSchedules && context.props.refreshSchedules();	
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
	componentWillReceiveProps: function(nextProps){
		this.setState(nextProps.model)		
	},
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
	}
});

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
	     		var daysString = event.currentTarget.value; 	     		
	     		var days = daysString.split(",");
	     		var previousDaysLenght = context.props.days.length;
	     		for(var i = 0; i < previousDaysLenght; i++){
	     			context.props.days.pop();
	     		}
	     		for(var i = 0; i < days.length; i++){
	     			context.props.days.push(days[i]);
	     		}	     		
		});	
	},	
	render: function(){		
		return <input className="date form-control" value={this.state.days}></input>;
	}
});
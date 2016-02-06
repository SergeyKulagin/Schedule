window.AddUpdateSchedule = React.createClass({
	componentDidMount: function(){
		var context = this;
		$(ReactDOM.findDOMNode(this)).find(".start-date").datepicker({
        	format: Settings.dateFormat,
        	multidate: false,
    		autoclose: true
    	}).on("changeDate", function(event){				
	     		var date = event.currentTarget.value; 	  
	     		context.setState({start_date: date});	   			     			     	
		});	
		$(ReactDOM.findDOMNode(this)).find(".end-date").datepicker({
        	format: Settings.dateFormat,
        	multidate: false,
    		autoclose: true
    	}).on("changeDate", function(event){				
	     		var date = event.currentTarget.value; 	  
	     		context.setState({end_date: date});	   			     			     	
		});	

	},
	getInitialState: function(){
		return {period:[]};
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
			   		<input type="text" placeholder="e.g. A bandit's schedule" className="form-control" name="scheduleName" onChange={this.onNameChange}/>
			   </div>			    			
			</div>
			<div className="row">
			   <div className="col-md-6">
			    <label>Start date:</label>
			   </div>
			   <div className="col-md-6">
				<input name="startDate" placeholder={Settings.dateFormat}  className="form-control start-date"/>
				</div>
			</div>
			<div className="row">
			   <div className="col-md-6">
			    <label>End date:</label>
			   </div>
			   <div className="col-md-6">
				<input name="endDate" placeholder={Settings.dateFormat}  className="form-control end-date"/>
				</div>
			</div>
			<ActivityItems activities={this.state.period} />	
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
		var activities = this.state.period;
		activities.push(defaultActivity);
    	this.setState({period:activities});
  	},
  	onNameChange: function(event){
  		this.setState({name: event.target.value});	
  	},
  	onActivitiesChange:function(activities){
  		console.log(activities);
  	},
  	onSave: function(){
  		console.log(this.state);
  		var context = this;
  		Services.Schedule.saveSchedule(this.state, "Schedule was saved", "Error saving the schedule")
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
				console.log("on date change");
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
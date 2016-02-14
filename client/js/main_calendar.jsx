window.MainCalendar = React.createClass({
	componentWillReceiveProps: function(nextProps) {
		this.setState({
			periodItems: nextProps.schedule.periodItems
		});
	},
	getInitialState: function(){		
		return {periodItems: []};		
	},
	componentDidUpdate: function() {
		$(ReactDOM.findDOMNode(this)).fullCalendar('refetchEvents');
	},
	componentDidMount: function() {
		var context = this;
		$(ReactDOM.findDOMNode(this)).fullCalendar({
			events: function(start, end, timezone, callback) {
				console.log("Calendar get events: %O", context.state);
				var items = context.state.periodItems || [];
				var events = items.map(function(item) {
					return {
						title: item.name,
						start: item.day,
						color: item.color
					};
				});
				console.log("Calendar events are %O", events);
				callback(events);
			}
		});
	},
	render: function() {
		return <div></div>;
	}
});
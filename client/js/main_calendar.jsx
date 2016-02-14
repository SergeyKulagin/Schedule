window.MainCalendar = React.createClass({
	componentWillReceiveProps: function(nextProps) {
		this.setState({
			periodItems: nextProps.schedule.periodItems
		});
	},
	getInitialState: function() {
		return {
			periodItems: this.props.schedule.periodItems
		};
	},
	componentDidUpdate: function() {
		$(ReactDOM.findDOMNode(this)).fullCalendar('refetchEvents');
	},
	componentDidMount: function() {
		var context = this;
		$(ReactDOM.findDOMNode(this)).fullCalendar({
			events: function(start, end, timezone, callback) {
				var items = context.state.periodItems || [];
				var events = items.map(function(item) {
					return {
						title: item.name,
						start: item.day,
						color: item.color
					};
				});
				callback(events);
			}
		});
	},
	render: function() {
		return <div></div>;
	}
});

window.MainCalendar = React.createClass({
	componentDidMount: function(){
		$(ReactDOM.findDOMNode(this)).fullCalendar({

		});	
	},
	render: function () {
		var context = this;
		return <div>Hello</div>;
	}
});
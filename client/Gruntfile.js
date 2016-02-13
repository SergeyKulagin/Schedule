module.exports = function(grunt){
	var serveStatic = require('serve-static');
	var serveIndex = require('serve-index');
	grunt.initConfig({
		connect: {
			server: {								
				options:{
					port: 9000,
					hostname: 'localhost',					
					keepalive: true,
					middleware: function(connect, options){
						var proxy = require('grunt-connect-proxy/lib/utils').proxyRequest;
						return [
						proxy,
						serveStatic("."),
						serveIndex(".")				
						];
					}					
				},
				proxies: [
				{
					context:['/saveSchedule', '/getSchedules', '/getScheduleFullInfo', '/getCalculatedSchedule'],
					host: 'localhost',				
					port:8080
				}
				]
			}				
		}
	});

	grunt.loadNpmTasks('grunt-connect-proxy');
	grunt.loadNpmTasks('grunt-contrib-connect');

	grunt.registerTask('server', 
		[		
		'configureProxies:server',
		'connect:server'
		]
		);
}
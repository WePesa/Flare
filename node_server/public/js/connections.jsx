ws = new WebSocket('ws://127.0.0.1:38477');

var SparkConnect = React.createClass({
	render: function(){
		return(
			<div>
			<h3>Spark</h3>
			<div id = 'infobox'>
				<span>
					<h5>Master: </h5>
					<div className= 'infotext' id='sparkMaster'>NA</div>
				</span>
				<span>
					<h5>Workers: </h5>
					<div className= 'infotext' id='sparkWorkers'>
						<table id = 'sparkWorkersTable'>
							<tbody id = 'sparkTable'>
								<tr>
									<th>ID</th>
									<th>Address</th>
									<th>State</th>
									<th>Cores</th>
									<th>Memory</th>
								</tr>
							</tbody>
						</table>
					</div>
				</span>
			</div>
			</div>
	  	)
	}
});
var CassandraConnect = React.createClass({
	render: function(){
		return(
			<div>
			<h3>Cassandra</h3>
			<div id = 'infobox'>
				<span>
					<h5>Top Peers: </h5>
					<div className= 'infotext' id='cassandraTable'>
						<table id = 'cassandraPeersTable'>
							<tbody>
								<tr>
									<th>Address</th>
									<th>Status</th>
									<th>State</th>
									<th>Owns</th>
									<th>Token</th>
								</tr>
							</tbody>
						</table>
					</div>
				</span>
			</div>
			</div>
	  	)
	}
});
var IPFSConnect = React.createClass({
	render: function(){
		return(
			<div>
			<h3>IPFS</h3>
			<div id = 'infobox'>
				<span>
					<h5>Top Peers: </h5>
					<div className= 'infotext' id='IPFSTable'>
						<table id = 'IPFSPeersTable'>
							<tbody>
								<tr>
									<th>Peer ID</th>
									<th>Address</th>
								</tr>
							</tbody>
						</table>
					</div>
				</span>
			</div>
			</div>
	  	)
	}
});


var Connections = React.createClass({
	displayName: "Connections",
	componentDidMount: function(){			
		ws.onmessage = function(evt){
			console.log(evt.data);
			var data = JSON.parse(evt.data);
			//initial connection
			if(data.success == true && data.flag == null){
				ws.send('{"flag": "identify", "name":"frontend"}');
				ws.send('{"flag": "connections", "name": "frontend", "text": "spark"}');
				ws.send('{"flag": "connections", "name": "frontend", "text": "cass"}');
				ws.send('{"flag": "connections", "name": "frontend", "text": "ipfs"}');
			}
			if(data.success == true && data.flag == 'spark'){
				//Test Implementation
				var workerID = 'worker-284719';
				var workerAddress = '192.168.1.2.3'; 
				var workerState = 'ALIVE';
				var workerCores = '4 (2 Used)';
				var workerMemory = '6.3 GB (1024.0 MB used)';
				
				//Real implementation	
				//var sparkID = data.text.sparkID;
				//var sparkAddress = data.text.sparkAddress; 
				//var sparkState = data.text.sparkState;
				//var sparkCores = data.text.sparkCores;
				//var sparkMemory = data.text.sparkMemory;
				
				//so much kludge...
				var table = document.getElementById('sparkTable');
				var row = table.insertRow(1);
				var cell1 = row.insertCell(0);
				var cell2 = row.insertCell(1);
				var cell3 = row.insertCell(2);
				var cell4 = row.insertCell(3);
				var cell5 = row.insertCell(4);
				cell1.innerHTML = workerID;
				cell2.innerHTML = workerAddress;
				cell3.innerHTML = workerState;
				cell4.innerHTML = workerCores;
				cell5.innerHTML = workerMemory;
				
			}
			if(data.success == true && data.flag == 'ipfs'){
				//Test Implementation
				var ipfsID = 'QmNeK3hRF5Pu9dPcMDKXvYofQioskuGfQZEQz43UDkLepK';
				var ipfsAddress= '178.62.206.163'; 
				
				//Real implementation	
				//var sparkID = data.text.sparkID;
				//var sparkAddress = data.text.sparkAddress; 
				//var sparkState = data.text.sparkState;
				//var sparkCores = data.text.sparkCores;
				//var sparkMemory = data.text.sparkMemory;
				
				var table = document.getElementById('IPFSPeersTable');
				var row = table.insertRow(1);
				var cell1 = row.insertCell(0);
				var cell2 = row.insertCell(1);
				cell1.innerHTML = ipfsID;
				cell2.innerHTML = ipfsAddress;
			}
			if(data.success == true && data.flag == 'cass'){
				//Test Implementation
				var cassAddress= '172.31.28.240';
				var cassStatus = 'Up'; 
				var cassState = 'Normal';
				var cassOwns = '100%';
				var cassToken = '9153377038966602289';
				
				//Real implementation	
				//var sparkID = data.text.sparkID;
				//var sparkAddress = data.text.sparkAddress; 
				//var sparkState = data.text.sparkState;
				//var sparkCores = data.text.sparkCores;
				//var sparkMemory = data.text.sparkMemory;
				
				var table = document.getElementById('cassandraPeersTable');
				var row = table.insertRow(1);
				var cell1 = row.insertCell(0);
				var cell2 = row.insertCell(1);
				var cell3 = row.insertCell(2);
				var cell4 = row.insertCell(3);
				var cell5 = row.insertCell(4);
				cell1.innerHTML = cassAddress;
				cell2.innerHTML = cassStatus;
				cell3.innerHTML = cassState;
				cell4.innerHTML = cassOwns;
				cell5.innerHTML = cassToken;
			}
		}		
	},
	render: function(){
		return(
			<div className='outline'>
				<Navbar/>
				<Sidebar path={window.location.pathname}/>
				<div className='row'>
					<div className='container connections'>
						<h3>Connections</h3>
						<SparkConnect/>
						<CassandraConnect/>
						<IPFSConnect/>
					</div>
				</div>
			</div>
		)
	}
});

React.render(<Connections />, document.body)

saveSchedule(STring jsonSchedule);
{
  _id: "",
  name: "",
  start_date: "", //js ISO
  end_date: "", //js ISO
  period: [
	{
		name: "На складе",
		days : [],//js ISO
		color: "#000000" 
	}
  ] 
}

getSchedules()
[
	{
		_id: "",
		name: ""
	}
]

getSchedule()
{
	period: [
	{
		color: "#000000",
		day: "", //js iso
		name: "На складе"
	}
	... до конца года
	]
}


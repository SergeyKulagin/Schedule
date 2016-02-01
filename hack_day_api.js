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

//returns the same json which was saved/updated in the saveSchedule
getSchedule(String id)
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

//TODO
getCalculatedSchedule(String id){}


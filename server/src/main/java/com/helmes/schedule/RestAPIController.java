package com.helmes.schedule;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

import com.helmes.schedule.bean.ScheduleCalendarItem;
import com.helmes.schedule.bean.ScheduleCalendarList;
import com.helmes.schedule.bean.ScheduleListItem;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@org.springframework.web.bind.annotation.RestController
public class RestAPIController {

    @RequestMapping("/getSchedules")
    public List<ScheduleListItem> getSchedules() {
        List<ScheduleListItem> scheduleListItems = new ArrayList<>();
        scheduleListItems.add(new ScheduleListItem(1, "asdad"));
        return scheduleListItems;
    }

    @RequestMapping("/getSchedule")
    public ScheduleCalendarList getSchedules(@RequestParam(value="id") String id) {
        List<ScheduleCalendarItem> scheduleCalendarItemItems = new ArrayList<>();
        LocalDateTime now = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        scheduleCalendarItemItems.add(new ScheduleCalendarItem("#ff0077", now.format(formatter), "На складе"));

        ScheduleCalendarList scheduleCalendarList = new ScheduleCalendarList();
        scheduleCalendarList.setPeriod(scheduleCalendarItemItems);
        return scheduleCalendarList;
    }

//    saveSchedule(STring jsonSchedule);
//    {
//        _id: "",
//                name: "",
//            start_date: "", //js ISO
//            end_date: "", //js ISO
//            period: [
//        {
//            name: "На складе",
//                    days : [],//js ISO
//            color: "#000000"
//        }
//        ]
//    }

    @RequestMapping("/saveSchedule")
    public void saveSchedule(@RequestParam(value="jsonSchedule") String jsonSchedule) {
        System.out.println(jsonSchedule);
    }

}

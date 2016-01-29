package com.helmes.schedule;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import com.helmes.schedule.bean.Schedule;
import com.helmes.schedule.bean.ScheduleCalendarItem;
import com.helmes.schedule.bean.ScheduleCalendarList;
import com.helmes.schedule.bean.ScheduleListItem;
import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@org.springframework.web.bind.annotation.RestController
public class RestAPIController {

    @Autowired
    private ScheduleMongoRepository scheduleMongoRepository;

    @RequestMapping("/getSchedules")
    public List<ScheduleListItem> getSchedules() {
        Iterator<Schedule> iterator = scheduleMongoRepository.findAll().iterator();
        List<ScheduleListItem> result = new ArrayList<>();
        while (iterator.hasNext()) {
            Schedule next = iterator.next();
            ScheduleListItem scheduleListItem = new ScheduleListItem();
            scheduleListItem.set_id(next.getId());
            scheduleListItem.setName(next.getName());
            result.add(scheduleListItem);
        }
        return result;
    }

    @RequestMapping("/getSchedule")
    public ScheduleCalendarList getSchedules(@RequestParam(value="id") String id) {
        // TODO remove this fake data and add the code calculating ScheduleCalendarItems
        List<ScheduleCalendarItem> scheduleCalendarItemItems = new ArrayList<>();
        LocalDateTime now = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        scheduleCalendarItemItems.add(new ScheduleCalendarItem("#ff0077", now.format(formatter), "На складе"));
        ScheduleCalendarList scheduleCalendarList = new ScheduleCalendarList();
        scheduleCalendarList.setPeriod(scheduleCalendarItemItems);
        return scheduleCalendarList;
    }

    @RequestMapping("/saveSchedule")
    public void saveSchedule(@RequestBody String jsonSchedule) {//@RequestParam(value="jsonSchedule") String jsonSchedule) {
        ObjectMapper mapper = new ObjectMapper();
        try
        {
            System.out.println(new String(jsonSchedule.getBytes("UTF-8")));
            Schedule schedule =  mapper.readValue(jsonSchedule, Schedule.class);
            scheduleMongoRepository.save(schedule);
        } catch (IOException e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }
    }

}

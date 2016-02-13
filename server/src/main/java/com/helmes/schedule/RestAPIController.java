package com.helmes.schedule;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import com.helmes.schedule.bean.*;
import com.helmes.schedule.util.ScheduleDatesCalculator;
import org.codehaus.jackson.JsonGenerationException;
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

    @RequestMapping("/getScheduleFullInfo")
    public String getScheduleInfo(@RequestParam(value = "id") String id) throws IOException {
        final Schedule schedule = scheduleMongoRepository.findOne(id);
        if(schedule == null){
            return null;
        }
        final ScheduleFullItem scheduleItem = new ScheduleFullItem();
        scheduleItem.setName(schedule.getName());
        scheduleItem.setId(schedule.getId());
        scheduleItem.setStartDate(schedule.getStartDate());
        scheduleItem.setEndDate(schedule.getEndDate());
        final List<SchedulePeriodItem> schedulePeriodItems = new ArrayList<>();
        if(schedule.getSchedulePeriodList() != null){
            for (SchedulePeriod schedulePeriod : schedule.getSchedulePeriodList()) {
                final SchedulePeriodItem schedulePeriodItem = new SchedulePeriodItem();
                schedulePeriodItem.setName(schedulePeriod.getName());
                schedulePeriodItem.setColor(schedulePeriod.getColor());
                schedulePeriodItem.setDays(schedulePeriod.getDays());
                schedulePeriodItems.add(schedulePeriodItem);
            }
        }
        scheduleItem.setSchedulePeriodItemList(schedulePeriodItems);
        return new ObjectMapper().writeValueAsString(scheduleItem);
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
    public void saveSchedule(@RequestBody String jsonSchedule) {
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

    @RequestMapping("/getCalculatedSchedule")
    public String getCalculatedSchedule(@RequestParam(value = "id") String scheduleId) throws IOException {
        final Schedule schedule = scheduleMongoRepository.findOne(scheduleId);
        final List<ScheduleCalendarItem> scheduleCalendarItems = ScheduleDatesCalculator.calculate(schedule);
        return new ObjectMapper().writeValueAsString(scheduleCalendarItems);
    }

}

package com.helmes.schedule.util;

import com.helmes.schedule.bean.Schedule;
import com.helmes.schedule.bean.ScheduleCalendarItem;
import com.helmes.schedule.bean.SchedulePeriod;

import java.time.LocalDate;
import java.time.Period;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by Sergey on 13.02.2016.
 */
public class ScheduleDatesCalculator {
    public static List<ScheduleCalendarItem> calculate(Schedule schedule) {
        final List<SchedulePeriod> schedulePeriods = schedule.getSchedulePeriodList();
        final List<ScheduleCalendarItem> scheduleCalendarItems = new ArrayList<>();
        if(schedulePeriods != null){
            for (SchedulePeriod schedulePeriod : schedulePeriods) {
                scheduleCalendarItems.addAll(calculate(schedulePeriod, schedule.getEndDate()));
            }
        }
        return scheduleCalendarItems;
    }

    private static List<ScheduleCalendarItem> calculate(SchedulePeriod schedulePeriod, String periodEnd) {
        final List<String> days = schedulePeriod.getDays();
        final List<ScheduleCalendarItem> scheduleCalendarItems = new ArrayList<>();
        for (String day : days) {
            final List<LocalDate> futureDates = calculateFutureDates(toDate(day), toDate(periodEnd));
            for (LocalDate futureDate : futureDates) {
                final ScheduleCalendarItem scheduleCalendarItem = new ScheduleCalendarItem(
                        schedulePeriod.getColor(),
                        dateToString(futureDate),
                        schedulePeriod.getName()
                );
                scheduleCalendarItems.add(scheduleCalendarItem);
            }
        }
        return scheduleCalendarItems;
    }

    private static List<LocalDate> calculateFutureDates(final LocalDate date, final LocalDate lastDate) {
        final List<LocalDate> futureDates = new ArrayList<>();
        final Period period = Period.of(0, 0, 7); //7 days
        LocalDate nextDate = date;
        while (nextDate.isBefore(lastDate)) {
            futureDates.add(nextDate);
            nextDate = nextDate.plus(period);
        }
        return futureDates;
    }

    private static LocalDate toDate(String date) {
        return LocalDate.parse(date, DateTimeFormatter.ISO_LOCAL_DATE);
    }

    private static String dateToString(LocalDate date) {
        return date.format(DateTimeFormatter.ISO_LOCAL_DATE);
    }
}

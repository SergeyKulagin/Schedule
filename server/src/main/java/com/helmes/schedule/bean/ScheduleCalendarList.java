package com.helmes.schedule.bean;

import java.util.List;

/**
 * Created by dmitry.poddubnik on 29/01/2016.
 */
public class ScheduleCalendarList {

  private List<ScheduleCalendarItem> period;

  public List<ScheduleCalendarItem> getPeriod() {
    return period;
  }

  public void setPeriod(List<ScheduleCalendarItem> period) {
    this.period = period;
  }
}

package com.helmes.schedule.bean;

import java.time.LocalDateTime;

/**
 * Created by dmitry.poddubnik on 29/01/2016.
 */
public class ScheduleCalendarItem {

  private String color;
  private String day;
  private String name;

  public ScheduleCalendarItem(String color, String day, String name) {
    this.color = color;
    this.day = day;
    this.name = name;
  }

  public String getColor() {
    return color;
  }

  public void setColor(String color) {
    this.color = color;
  }

  public String getDay() {
    return day;
  }

  public void setDay(String day) {
    this.day = day;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }
}

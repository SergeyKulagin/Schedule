package com.helmes.schedule.bean;

import java.util.List;

/**
 * Created by dmitry.poddubnik on 29/01/2016.
 */
public class SchedulePeriod {

  private String name;
  private List<String> days;
  private String color;

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public List<String> getDays() {
    return days;
  }

  public void setDays(List<String> days) {
    this.days = days;
  }

  public String getColor() {
    return color;
  }

  public void setColor(String color) {
    this.color = color;
  }
}

package com.helmes.schedule.bean;

/**
 * Created by dmitry.poddubnik on 29/01/2016.
 */
public class ScheduleListItem {

  private String _id;
  private String name;

  public ScheduleListItem() {
  }

  public String get_id() {
    return _id;
  }

  public void set_id(String _id) {
    this._id = _id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }
}

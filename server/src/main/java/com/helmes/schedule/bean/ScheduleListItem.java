package com.helmes.schedule.bean;

/**
 * Created by dmitry.poddubnik on 29/01/2016.
 */
public class ScheduleListItem {

  private final long _id;
  private final String name;

  public ScheduleListItem(long _id, String name) {  this._id = _id;
    this.name = name;
  }

  public long get_id() {
    return _id;
  }

  public String getName() {
    return name;
  }
}

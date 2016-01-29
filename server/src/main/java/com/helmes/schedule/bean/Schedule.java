package com.helmes.schedule.bean;

import org.codehaus.jackson.annotate.JsonProperty;
import org.springframework.data.annotation.Id;

import java.util.List;

/**
 * Created by dmitry.poddubnik on 29/01/2016.
 */
public class Schedule {

  @Id
  private String id;

  private String name;

  @JsonProperty("start_date")
  private String startDate;

  @JsonProperty("end_date")
  private String endDate;

  @JsonProperty("period")
  private List<SchedulePeriod> schedulePeriodList;

  public String getId() {
    return id;
  }

  public void setId(String id) {
    this.id = id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }
}

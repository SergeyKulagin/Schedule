package com.helmes.schedule.bean;

import org.codehaus.jackson.annotate.JsonProperty;

import java.util.List;

/**
 * Created by Sergey on 06.02.2016.
 */
public class ScheduleFullItem  {
    private String id;
    private String name;
    @JsonProperty("start_date")
    private String startDate;
    @JsonProperty("end_date")
    private String endDate;
    @JsonProperty("period")
    private List<SchedulePeriodItem> schedulePeriodItemList;

    public void setId(String id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setStartDate(String startDate) {
        this.startDate = startDate;
    }

    public void setEndDate(String endDate) {
        this.endDate = endDate;
    }

    public void setSchedulePeriodItemList(List<SchedulePeriodItem> schedulePeriodItemList) {
        this.schedulePeriodItemList = schedulePeriodItemList;
    }

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getStartDate() {
        return startDate;
    }

    public String getEndDate() {
        return endDate;
    }

    public List<SchedulePeriodItem> getSchedulePeriodItemList() {
        return schedulePeriodItemList;
    }
}

package com.helmes.schedule.bean;

import java.util.List;

/**
 * Created by Sergey on 06.02.2016.
 */
public class SchedulePeriodItem {
    private String name;
    private List<String> days;
    private String color;

    public void setName(String name) {
        this.name = name;
    }

    public void setDays(List<String> days) {
        this.days = days;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public String getName() {
        return name;
    }

    public List<String> getDays() {
        return days;
    }

    public String getColor() {
        return color;
    }
}

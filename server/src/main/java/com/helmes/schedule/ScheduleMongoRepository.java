package com.helmes.schedule;

import com.helmes.schedule.bean.Schedule;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Created by dmitry.poddubnik on 29/01/2016.
 */
@Repository
public interface ScheduleMongoRepository extends MongoRepository<Schedule, String> {

}

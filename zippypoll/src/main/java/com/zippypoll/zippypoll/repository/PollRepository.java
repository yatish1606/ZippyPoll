package com.zippypoll.zippypoll.repository;

import com.zippypoll.zippypoll.model.Poll;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PollRepository extends MongoRepository<Poll, String> {
}

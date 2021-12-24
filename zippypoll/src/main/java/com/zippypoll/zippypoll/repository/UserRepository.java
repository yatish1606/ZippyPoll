package com.zippypoll.zippypoll.repository;

import com.zippypoll.zippypoll.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<User, String> {
}

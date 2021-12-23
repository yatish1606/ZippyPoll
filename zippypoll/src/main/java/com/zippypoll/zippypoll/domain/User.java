package com.zippypoll.zippypoll.domain;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Optional;

@Document
public class User {

    @Id
    private ObjectId id;
    private String firstName;
    private String lastName;
    private Optional<String> profilePicture;

    public void createUser(String firstName, String lastName, String profilePicture) {

    }
}

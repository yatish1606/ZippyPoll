package com.zippypoll.zippypoll.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.HashMap;
import java.util.List;

@Document("poll")
public class Poll {
    @Id
    @Indexed(unique = true)
    private String id;
    private String title;
    private String description;
    private PollType type;
    private List<HashMap<String, String>> options;
    private List<Response> responses;
    private Long deadline;
    private User createdBy;

    public Poll(String title, String description, PollType type, List<HashMap<String, String>> options, Long deadline, User createdBy) {
        this.title = title;
        this.description = description;
        this.type = type;
        this.options = options;
        this.deadline = deadline;
        this.createdBy = createdBy;
        this.responses = null;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public PollType getType() {
        return type;
    }

    public void setType(PollType type) {
        this.type = type;
    }

    public List<HashMap<String, String>> getOptions() {
        return options;
    }

    public void setOptions(List<HashMap<String, String>> options) {
        this.options = options;
    }

    public List<Response> getResponses() {
        return responses;
    }

    public void setResponses(List<Response> responses) {
        this.responses = responses;
    }

    public Long getDeadline() {
        return deadline;
    }

    public void setDeadline(Long deadline) {
        this.deadline = deadline;
    }

    public User getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(User createdBy) {
        this.createdBy = createdBy;
    }
}

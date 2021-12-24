package com.zippypoll.zippypoll.controller;

import com.zippypoll.zippypoll.model.Poll;
import com.zippypoll.zippypoll.model.Response;
import com.zippypoll.zippypoll.service.PollService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/poll")
public class PollController {

    private final PollService pollService;

    public PollController(PollService pollService) {
        this.pollService = pollService;
    }

    @PostMapping
    public ResponseEntity createPoll(@RequestBody Poll poll) {
        pollService.addPoll(poll);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @GetMapping("/all")
    public ResponseEntity<List<Poll>> getAllPolls() {
        return ResponseEntity.ok(pollService.getAllPolls());
    }

    @GetMapping("/{pollId}")
    public ResponseEntity<Optional<Poll>> getPoll(@PathVariable String pollId) {
        return ResponseEntity.ok(pollService.getPoll(pollId));
    }

    @PutMapping
    public ResponseEntity updatePoll(@RequestBody Poll poll) {
        pollService.updatePoll(poll);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{pollId}")
    public ResponseEntity deletePoll(@PathVariable String pollId) {
        pollService.deletePoll(pollId);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @PostMapping("/{pollId}/response")
    public ResponseEntity addResponse(@RequestBody Response response, @PathVariable String pollId) {
        if(pollService.addResponse(response, pollId)) {
            return ResponseEntity.ok().build();
        } else return ResponseEntity.badRequest().build();
    }

    @DeleteMapping("/{pollId}/responses")
    public ResponseEntity deleteAllResponses(@PathVariable String pollId) {
        pollService.removeAllResponses(pollId);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

}

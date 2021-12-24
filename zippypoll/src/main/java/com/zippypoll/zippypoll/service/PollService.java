package com.zippypoll.zippypoll.service;

import com.zippypoll.zippypoll.model.Poll;
import com.zippypoll.zippypoll.model.Response;
import com.zippypoll.zippypoll.repository.PollRepository;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class PollService {

    private final PollRepository pollRepository;

    public PollService(PollRepository pollRepository) {
        this.pollRepository = pollRepository;
    }

    public void addPoll(Poll poll) {
        pollRepository.insert(poll);
    }

    public List<Poll> getAllPolls() {
        return pollRepository.findAll();
    }

    public Optional<Poll> getPoll(String pollId) {
        return pollRepository.findById(pollId);
    }

    public void updatePoll(Poll poll) {
        Poll savedPoll = pollRepository.findById(poll.getId())
                .orElseThrow(() -> new RuntimeException(String.format("Cannot update poll with id as ", poll.getId())));

        savedPoll.setDeadline(poll.getDeadline());
        savedPoll.setType(poll.getType());
        savedPoll.setTitle(poll.getTitle());
        savedPoll.setDescription(poll.getDescription());
        savedPoll.setOptions(poll.getOptions());

        pollRepository.save(savedPoll);
    }

    public void deletePoll(String pollId) {
        pollRepository.deleteById(pollId);
    }

    public boolean addResponse(Response response, String pollId) {
        Poll savedPoll = pollRepository.findById(pollId)
                .orElseThrow(() -> new RuntimeException(String.format("Cannot add response for poll with id as ", pollId)));

        List<Response> currentResponses = new ArrayList<Response>();

        if (savedPoll.getResponses() != null) {

            for (Response r: savedPoll.getResponses()) {
                if(r.getIpAddress().equals(response.getIpAddress())) {
                    return false;
                }
            }
            currentResponses.addAll(savedPoll.getResponses());
        }
        currentResponses.add(response);
        savedPoll.setResponses(currentResponses);
        pollRepository.save(savedPoll);
        return true;
    }

    public void removeAllResponses(String pollId) {
        Poll savedPoll = pollRepository.findById(pollId)
                .orElseThrow(() -> new RuntimeException(String.format("Cannot update poll with id as ", pollId)));
        savedPoll.setResponses(null);
        pollRepository.save(savedPoll);
    }

    public HashMap<HashMap<String, String>, Integer> getResponseStats(String pollId) {
        Poll savedPoll = pollRepository.findById(pollId)
                .orElseThrow(() -> new RuntimeException(String.format("Cannot update poll with id as ", pollId)));
        List<Response> responses = new ArrayList<Response>();
        HashMap<HashMap<String, String>, Integer> hashMap = new HashMap<HashMap<String, String>, Integer>();
        for (HashMap<String, String> currentHashObject: savedPoll.getOptions()) {
            for (HashMap.Entry<String, String> currentHash: currentHashObject.entrySet()) {
                HashMap<String, String> keyValuePair = new HashMap<String, String>();
                keyValuePair.put(currentHash.getKey(), currentHash.getValue());
                hashMap.put(keyValuePair, 0);
            }
        }
        if(savedPoll.getResponses() != null) {
            responses.addAll(savedPoll.getResponses());
            for (Response response: responses) {
                HashMap<String, String> currentEntry = response.getSelectedOption();
                hashMap.merge(currentEntry, 1, Integer::sum);
            }
        } else {

        }
        return hashMap;
    }
}

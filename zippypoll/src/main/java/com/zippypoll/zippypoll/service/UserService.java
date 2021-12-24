package com.zippypoll.zippypoll.service;

import com.zippypoll.zippypoll.model.User;
import com.zippypoll.zippypoll.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public void addUser(User user) {
        userRepository.insert(user);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public void updateUser(User user) {
        User savedUser = userRepository.findById(user.getId())
                .orElseThrow(() -> new RuntimeException(String.format("Cannot update user with Id as ", user.getId())));
        savedUser.setFirstName(user.getFirstName());
        savedUser.setLastName(user.getLastName());
        savedUser.setProfilePicture(user.getProfilePicture());

        userRepository.save(savedUser);
    }

    public Optional<User> getUser(String userId) {
        return userRepository.findById(userId);
    }

    public void deleteUser(String userId) {
        userRepository.deleteById(userId);
    }
}

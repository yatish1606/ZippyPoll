package com.zippypoll.zippypoll.service;

import com.zippypoll.zippypoll.model.User;
import com.zippypoll.zippypoll.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;

    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public boolean isExistingUser(String email) {
        for (User user: userRepository.findAll()) {
            if(user.getEmail().equals(email)) {
                return true;
            }
        }
        return false;
    }
}

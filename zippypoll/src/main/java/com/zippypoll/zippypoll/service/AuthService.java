package com.zippypoll.zippypoll.service;

import com.zippypoll.zippypoll.model.User;
import com.zippypoll.zippypoll.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.HashMap;

@Service
public class AuthService {

    private final UserRepository userRepository;

    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public boolean isExistingUser(String email) {
        for (User user: userRepository.findAll()) {
            System.out.println("hi" + user.getEmail() + " " + email);
            if(user.getEmail().equals(email)) {
                return true;
            }
        }
        return false;
    }

    public HashMap<String, Boolean> login(String email) {
        HashMap<String, Boolean> res = new HashMap<>();
        if(isExistingUser(email)) {
            res.put("isExisting",true);
        } else res.put("isExisting", false);
        return res;
    }
}

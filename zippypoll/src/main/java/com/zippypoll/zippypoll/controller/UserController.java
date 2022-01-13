package com.zippypoll.zippypoll.controller;

import com.zippypoll.zippypoll.model.User;
import com.zippypoll.zippypoll.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public ResponseEntity addUser(@RequestBody User user) {
        System.out.println(user);
        userService.addUser(user);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @GetMapping("/all")
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @PutMapping
    public ResponseEntity updateUser(@RequestBody User user) {
        userService.updateUser(user);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{userId}")
    public ResponseEntity<Optional<User>> getUser(@PathVariable String userId) {
        return ResponseEntity.ok(userService.getUser(userId));
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity deleteUser(@PathVariable String userId) {
        userService.deleteUser(userId);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}

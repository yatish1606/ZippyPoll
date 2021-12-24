package com.zippypoll.zippypoll.controller;

import com.zippypoll.zippypoll.model.Response;
import com.zippypoll.zippypoll.service.AuthService;
import com.zippypoll.zippypoll.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;
    private final UserService userService;

    public AuthController(AuthService authService, UserService userService) {
        this.authService = authService;
        this.userService = userService;
    }

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody String email) {
        if(authService.isExistingUser(email)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        } else return ResponseEntity.ok().build();
    }
}

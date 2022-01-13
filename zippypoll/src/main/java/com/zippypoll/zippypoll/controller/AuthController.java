package com.zippypoll.zippypoll.controller;

import com.zippypoll.zippypoll.model.Response;
import com.zippypoll.zippypoll.service.AuthService;
import com.zippypoll.zippypoll.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin()
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;
    private final UserService userService;

    public AuthController(AuthService authService, UserService userService) {
        this.authService = authService;
        this.userService = userService;
    }

    @PostMapping("/login/{email}")
    public ResponseEntity login(@PathVariable String email) {
        System.out.println("email from param" + email);
        if(authService.isExistingUser(email)) {
            return ResponseEntity.ok(userService.findUserByEmail(email));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}

package com.zippypoll.zippypoll.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class UserController {

    @GetMapping("/testing")
    public void test() {
        System.out.println("hi there");
    }
}

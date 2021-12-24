package com.zippypoll.zippypoll.model;

import java.util.HashMap;

public class Response {
    private HashMap<String, String> selectedOption;
    private String ipAddress;

    public Response(HashMap<String, String> selectedOption, String ipAddress) {
        this.selectedOption = selectedOption;
        this.ipAddress = ipAddress;
    }

    public HashMap<String, String> getSelectedOption() {
        return selectedOption;
    }

    public void setSelectedOption(HashMap<String, String> selectedOption) {
        this.selectedOption = selectedOption;
    }

    public String getIpAddress() {
        return ipAddress;
    }

    public void setIpAddress(String ipAddress) {
        this.ipAddress = ipAddress;
    }
}

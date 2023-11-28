package com.example.backend.sevices.noAuth;

import com.example.backend.models.User;

public interface NoAuthService {


    boolean createUser(User user);

    boolean activateUsers(String link,Integer code);
}

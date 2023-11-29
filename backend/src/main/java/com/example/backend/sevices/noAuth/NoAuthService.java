package com.example.backend.sevices.noAuth;

import com.example.backend.dto.ForgotCodeDTO;
import com.example.backend.models.User;

public interface NoAuthService {


    boolean createUser(User user);

    boolean activateUsers(String link,Integer code);

    boolean forgotMessage(String email);

    boolean changePassword(String link, ForgotCodeDTO forgotCodeDTO);
}

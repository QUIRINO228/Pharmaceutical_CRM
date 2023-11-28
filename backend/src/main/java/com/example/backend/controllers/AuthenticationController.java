package com.example.backend.controllers;

import com.example.backend.dto.LoginDTO;
import com.example.backend.models.User;
import com.example.backend.repositories.UserRepository;
import com.example.backend.utils.JwtUtils;
import jakarta.servlet.http.HttpServletResponse;
import net.minidev.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.Objects;


@RestController
public class AuthenticationController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private UserRepository userRepository;

    private static final String TOKEN_PREFIX = "Bearer ";
    private static final String HEADER_STRING = "Authorization ";

    @PostMapping(value = "/authenticate", produces = MediaType.APPLICATION_JSON_VALUE)
    public void createAuthenticationToken(
            @RequestBody LoginDTO loginDTO, HttpServletResponse httpResponse) throws IOException {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginDTO.getEmail(), loginDTO.getPassword()));
        } catch (BadCredentialsException e) {
            throw new BadCredentialsException("Incorrect Username or password");
        } catch (DisabledException disabledException) {
            httpResponse.sendError(HttpServletResponse.SC_NOT_FOUND, "User is not created");
            ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            return;
        }

        final UserDetails userDetails = userDetailsService.loadUserByUsername(loginDTO.getEmail());
        final String jwt = jwtUtils.generateToken(userDetails.getUsername());
        User user = userRepository.findByEmail(userDetails.getUsername());
        if (!user.getIsActive()) throw new BadCredentialsException("Activate your account");
        if (user != null) {
            JSONObject json = new JSONObject();
            json.put("user_id", user.getId());
            json.put("role", user.getRole());
            httpResponse.getWriter().write(Objects.requireNonNull(Objects.requireNonNull(json.toString())));
        }

        httpResponse.setHeader("Access-Control-Expose-Headers", "Authorization");
        httpResponse.setHeader("Access-Control-Allow-Headers", "Authorization,X-Pingother,Origin,X-Requested-With,Content-Type,Accept,X-Custom-header");
        httpResponse.setHeader(HEADER_STRING, TOKEN_PREFIX + jwt);
    }
}
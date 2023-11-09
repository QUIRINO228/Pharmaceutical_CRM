package com.example.backend.models.enums;

import org.springframework.security.core.GrantedAuthority;

public enum Role implements GrantedAuthority {
    ROLE_WORKER, ROLE_ADMIN, ROLE_MANAGER, ROLE_CUSTOMER;

    @Override
    public String getAuthority() {
        return name();
    }
}
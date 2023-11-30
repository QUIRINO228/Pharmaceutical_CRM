package com.example.backend.models.enums;

public enum TaskEnum {
    DONE, GIVEN, ACCEPTED, RE_DO, NOT_DONE;

    public static TaskEnum getTaskEnum(String status) {
        return TaskEnum.valueOf(status);
    }
}

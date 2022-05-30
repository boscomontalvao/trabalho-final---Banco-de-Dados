package com.bosco.dbapi.dto;

import java.time.LocalDate;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

@Data
public class EventDto {

    @NotNull
    private Long[] idsOfCategoriesToBeAdd;

    @NotBlank
    private String description;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate eventDate;
}

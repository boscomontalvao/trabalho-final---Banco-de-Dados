package com.bosco.dbapi.dto;

import javax.validation.constraints.NotBlank;

import lombok.Data;

@Data
public class CategoryDto {

    @NotBlank
    private String name;

}

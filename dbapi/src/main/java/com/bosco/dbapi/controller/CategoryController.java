package com.bosco.dbapi.controller;

import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import com.bosco.dbapi.dto.CategoryDto;
import com.bosco.dbapi.models.Category;
import com.bosco.dbapi.models.Event;
import com.bosco.dbapi.repository.CategoryRepository;

import org.springframework.beans.BeanUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
@RequestMapping(value = "/api/categories")
public class CategoryController {

    private final CategoryRepository categoryRepository;

    public CategoryController(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @GetMapping
    public ResponseEntity<List<Category>> listCategories() {
        return ResponseEntity.status(HttpStatus.OK).body(categoryRepository.findAll());
    }

    @PostMapping
    public ResponseEntity<Object> addCategory(@RequestBody @Valid CategoryDto categoryDto) {
        Category category = new Category();

        BeanUtils.copyProperties(categoryDto, category);

        return ResponseEntity.status(HttpStatus.CREATED).body(categoryRepository.save(category));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Object> updateCategory(@PathVariable(value = "id") Long id,
            @RequestBody @Valid CategoryDto categoryDto) {

        Optional<Category> categoryOptional = categoryRepository.findById(id);

        if (!categoryOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Categoria não encontrada");
        }

        Category category = categoryOptional.get();

        category.setName(categoryDto.getName());

        return ResponseEntity.status(HttpStatus.CREATED).body(categoryRepository.save(category));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteEvent(@PathVariable(value = "id") Long id) {

        Optional<Category> categoryOptional = categoryRepository.findById(id);

        if (!categoryOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Evento não encontrado");
        }

        for (Event e : categoryOptional.get().getEvents()) {
            e.removeCategory(categoryOptional.get());
        }

        categoryOptional.get().removeAllEvents();
        categoryRepository.delete(categoryOptional.get());
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body("Evento deletado com sucesso");
    }
}

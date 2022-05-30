package com.bosco.dbapi.controller;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import javax.validation.Valid;

import com.bosco.dbapi.dto.EventDto;
import com.bosco.dbapi.models.Category;
import com.bosco.dbapi.models.Event;
import com.bosco.dbapi.repository.CategoryRepository;
import com.bosco.dbapi.repository.EventRepository;

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
@RequestMapping(value = "/api/events")
public class EventController {

    private final EventRepository eventRepository;
    private final CategoryRepository categoryRepository;

    public EventController(EventRepository eventRepository, CategoryRepository categoryRepository) {
        this.eventRepository = eventRepository;
        this.categoryRepository = categoryRepository;
    }

    @GetMapping
    public ResponseEntity<List<Event>> listEvents() {
        return ResponseEntity.status(HttpStatus.OK).body(eventRepository.findAll());
    }

    @PostMapping
    public ResponseEntity<Object> addEvent(@RequestBody @Valid EventDto eventDto) {

        if (eventDto.getIdsOfCategoriesToBeAdd().length == 0) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Não é possível adicionar eventos sem categoria(s)");
        }

        System.out.println(eventDto.getEventDate());
        Event event = new Event();

        for (int i = 0; i < eventDto.getIdsOfCategoriesToBeAdd().length; i++) {
            Optional<Category> optionalCategory = categoryRepository.findById(eventDto.getIdsOfCategoriesToBeAdd()[i]);

            Category category = optionalCategory.get();
            event.addCategory(category);
        }

        BeanUtils.copyProperties(eventDto, event);

        return ResponseEntity.status(HttpStatus.CREATED).body(eventRepository.save(event));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Object> updateEvent(@PathVariable(value = "id") Long id,
            @RequestBody @Valid EventDto eventDto) {

        Optional<Event> eventOptional = eventRepository.findById(id);

        if (!eventOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Evento não encontrado");
        }

        Set<Category> categories = new HashSet<>();

        for (int i = 0; i < eventDto.getIdsOfCategoriesToBeAdd().length; i++) {
            Optional<Category> optionalCategory = categoryRepository.findById(eventDto.getIdsOfCategoriesToBeAdd()[i]);

            Category category = optionalCategory.get();

            categories.add(category);
        }

        Event event = eventOptional.get();
        event.setDescription(eventDto.getDescription());
        event.setEventDate(eventDto.getEventDate());
        event.setCategories(categories);

        return ResponseEntity.status(HttpStatus.OK).body(eventRepository.save(event));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteEvent(@PathVariable(value = "id") Long id) {

        Optional<Event> eventOptional = eventRepository.findById(id);

        if (!eventOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Evento não encontrado");
        }

        eventRepository.delete(eventOptional.get());
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body("Evento deletado com sucesso");
    }
}

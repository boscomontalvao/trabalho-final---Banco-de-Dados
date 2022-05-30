package com.bosco.dbapi.models;

import java.util.Set;
import java.util.HashSet;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;

@Data
@Entity
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    @Column(length = 20, nullable = false, unique = true)
    private String name;

    @JsonIgnore
    @ManyToMany(mappedBy = "categories")
    private Set<Event> events = new HashSet<>();

    public void removeAllEvents() {
        for (Event event : this.getEvents()) {
            event.getCategories().remove(this);
        }
    }

    @Override
    public int hashCode() {
        return this.name.hashCode();
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null || getClass() != obj.getClass())
            return false;
        Category category = (Category) obj;
        return Objects.equals(id, category.id);
    }

    @Override
    public String toString() {
        return String.format("Category(name=%s)", this.name);
    }
}

package com.bosco.dbapi.models;

import java.time.LocalDate;
import java.util.Set;
import java.util.HashSet;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Entity;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.JoinTable;
import javax.persistence.JoinColumn;

import lombok.Data;

@Data
@Entity
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    @Column(length = 80, nullable = false, unique = true)
    private String description;

    @Column(nullable = true)
    private LocalDate eventDate;

    @ManyToMany
    @JoinTable(name = "events_categories", joinColumns = @JoinColumn(name = "event_id"), inverseJoinColumns = @JoinColumn(name = "category_id"))
    private Set<Category> categories = new HashSet<>();

    public void addCategory(Category category) {
        this.categories.add(category);
        category.getEvents().add(this);
    }

    public void removeCategory(Category category) {
        this.categories.remove(category);
        category.getEvents().remove(this);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id, this.description);
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (!(obj instanceof Event))
            return false;

        return id != null && id.equals(((Event) obj).getId());
    }

    @Override
    public String toString() {
        return String.format("Event(description=%s , dates=%s)", this.description, this.eventDate);
    }
}

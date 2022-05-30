package com.bosco.dbapi.repository;

import java.util.Optional;

import com.bosco.dbapi.models.Category;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
    @Query("FROM Category c JOIN FETCH c.events e JOIN FETCH e.categories")
    Optional<Category> byId(Long id);
}

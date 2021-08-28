package com.busifrog.repository;

import com.busifrog.domain.Category;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Category entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
    @Query(value = "select * from category where category_id is null", nativeQuery = true)
    Page<Category> findAllMainCategories(Pageable pageable);
}

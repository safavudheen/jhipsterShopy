package com.busifrog.repository;

import com.busifrog.domain.Category;
import com.busifrog.domain.Seller;
import java.util.List;
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

    @Query(value = "select * from category where category_id =?1", nativeQuery = true)
    Page<Category> findAllSubCategoriesById(Long id, Pageable pageable);

    @Query(
        value = "select distinct c.* from category c left outer join product p on p.category_id = c.id left outer join service s on s.category_id = c.id where p.seller_id =?1 or s.seller_id =?1",
        nativeQuery = true
    )
    Page<Category> findAllCategoriesBySeller(Long categoryId, Pageable pageable);
}

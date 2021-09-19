package com.busifrog.repository;

import com.busifrog.domain.Category;
import com.busifrog.domain.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Product entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    @Query(value = "select * from product p where p.category_id =?1", nativeQuery = true)
    Page<Product> findAllByCategoryId(Long categoryId, Pageable pageable);

    Page<Product> findAllBySellerId(Long sellerId, Pageable pageable);
}

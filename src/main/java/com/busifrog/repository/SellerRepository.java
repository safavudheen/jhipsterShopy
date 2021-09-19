package com.busifrog.repository;

import com.busifrog.domain.Category;
import com.busifrog.domain.Seller;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Seller entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SellerRepository extends JpaRepository<Seller, Long> {
    @Query(
        value = "select distinct r.* from seller r LEFT OUTER join product p on p.seller_id = r.id left OUTER join service s on s.seller_id = r.id where p.category_id in (select id from category where category_id =?1) or s.category_id in (select id from category where category_id =?1)",
        nativeQuery = true
    )
    List<Seller> findAllSellersByCategory(Long categoryId);

    @Query(value = "select* from seller r where r.id = ?1", nativeQuery = true)
    List<Seller> findAllById(long id);
}

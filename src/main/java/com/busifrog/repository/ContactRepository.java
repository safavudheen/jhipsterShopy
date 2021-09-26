package com.busifrog.repository;

import com.busifrog.domain.Contact;
import com.busifrog.domain.Product;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Contact entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ContactRepository extends JpaRepository<Contact, Long> {
    @Query(value = "select c.* from contact c join seller r on r.contact_id = c.id where r.id =?1", nativeQuery = true)
    Optional<Contact> findBySellerId(Long sellerId);
}

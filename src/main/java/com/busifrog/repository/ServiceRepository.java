package com.busifrog.repository;

import com.busifrog.domain.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Service entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ServiceRepository extends JpaRepository<Service, Long> {
    @Query(value = "select * from service s where s.room_id =?1", nativeQuery = true)
    Page<Service> findAllByRoomId(Long roomId, Pageable pageable);

    @Query(value = "select * from service s where s.category_id =?1", nativeQuery = true)
    Page<Service> findAllByCategoryId(Long categoryId, Pageable pageable);
}

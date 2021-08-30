package com.busifrog.repository;

import com.busifrog.domain.Category;
import com.busifrog.domain.Room;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Room entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RoomRepository extends JpaRepository<Room, Long> {
    @Query(
        value = "select distinct r.* from room r LEFT OUTER join product p on p.room_id = r.id left OUTER join service s on s.room_id = r.id where p.category_id =?1 or s.category_id =?1",
        nativeQuery = true
    )
    List<Room> findAllRoomsByCategory(Long categoryId);
}

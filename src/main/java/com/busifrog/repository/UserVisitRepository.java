package com.busifrog.repository;

import com.busifrog.domain.UserVisit;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the UserVisit entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UserVisitRepository extends JpaRepository<UserVisit, Long> {}

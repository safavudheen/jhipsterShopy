package com.busifrog.repository;

import com.busifrog.domain.SellerPlan;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the SellerPlan entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SellerPlanRepository extends JpaRepository<SellerPlan, Long> {}

package com.busifrog.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.busifrog.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class SellerPlanTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(SellerPlan.class);
        SellerPlan sellerPlan1 = new SellerPlan();
        sellerPlan1.setId(1L);
        SellerPlan sellerPlan2 = new SellerPlan();
        sellerPlan2.setId(sellerPlan1.getId());
        assertThat(sellerPlan1).isEqualTo(sellerPlan2);
        sellerPlan2.setId(2L);
        assertThat(sellerPlan1).isNotEqualTo(sellerPlan2);
        sellerPlan1.setId(null);
        assertThat(sellerPlan1).isNotEqualTo(sellerPlan2);
    }
}

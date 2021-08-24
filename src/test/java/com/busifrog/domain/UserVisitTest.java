package com.busifrog.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.busifrog.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class UserVisitTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(UserVisit.class);
        UserVisit userVisit1 = new UserVisit();
        userVisit1.setId(1L);
        UserVisit userVisit2 = new UserVisit();
        userVisit2.setId(userVisit1.getId());
        assertThat(userVisit1).isEqualTo(userVisit2);
        userVisit2.setId(2L);
        assertThat(userVisit1).isNotEqualTo(userVisit2);
        userVisit1.setId(null);
        assertThat(userVisit1).isNotEqualTo(userVisit2);
    }
}

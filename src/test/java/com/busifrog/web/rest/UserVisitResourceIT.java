package com.busifrog.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.busifrog.IntegrationTest;
import com.busifrog.domain.UserVisit;
import com.busifrog.repository.UserVisitRepository;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link UserVisitResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class UserVisitResourceIT {

    private static final Instant DEFAULT_START_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_START_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_END_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_END_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_CREATED_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_CREATED_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_LAST_MODIFIED_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_LAST_MODIFIED_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_CREATED_BY = "AAAAAAAAAA";
    private static final String UPDATED_CREATED_BY = "BBBBBBBBBB";

    private static final String DEFAULT_LAST_MODIFIED_BY = "AAAAAAAAAA";
    private static final String UPDATED_LAST_MODIFIED_BY = "BBBBBBBBBB";

    private static final Boolean DEFAULT_IS_DELETED = false;
    private static final Boolean UPDATED_IS_DELETED = true;

    private static final String ENTITY_API_URL = "/api/user-visits";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private UserVisitRepository userVisitRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restUserVisitMockMvc;

    private UserVisit userVisit;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static UserVisit createEntity(EntityManager em) {
        UserVisit userVisit = new UserVisit()
            .startDate(DEFAULT_START_DATE)
            .endDate(DEFAULT_END_DATE)
            .createdDate(DEFAULT_CREATED_DATE)
            .lastModifiedDate(DEFAULT_LAST_MODIFIED_DATE)
            .createdBy(DEFAULT_CREATED_BY)
            .lastModifiedBy(DEFAULT_LAST_MODIFIED_BY)
            .isDeleted(DEFAULT_IS_DELETED);
        return userVisit;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static UserVisit createUpdatedEntity(EntityManager em) {
        UserVisit userVisit = new UserVisit()
            .startDate(UPDATED_START_DATE)
            .endDate(UPDATED_END_DATE)
            .createdDate(UPDATED_CREATED_DATE)
            .lastModifiedDate(UPDATED_LAST_MODIFIED_DATE)
            .createdBy(UPDATED_CREATED_BY)
            .lastModifiedBy(UPDATED_LAST_MODIFIED_BY)
            .isDeleted(UPDATED_IS_DELETED);
        return userVisit;
    }

    @BeforeEach
    public void initTest() {
        userVisit = createEntity(em);
    }

    @Test
    @Transactional
    void createUserVisit() throws Exception {
        int databaseSizeBeforeCreate = userVisitRepository.findAll().size();
        // Create the UserVisit
        restUserVisitMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(userVisit)))
            .andExpect(status().isCreated());

        // Validate the UserVisit in the database
        List<UserVisit> userVisitList = userVisitRepository.findAll();
        assertThat(userVisitList).hasSize(databaseSizeBeforeCreate + 1);
        UserVisit testUserVisit = userVisitList.get(userVisitList.size() - 1);
        assertThat(testUserVisit.getStartDate()).isEqualTo(DEFAULT_START_DATE);
        assertThat(testUserVisit.getEndDate()).isEqualTo(DEFAULT_END_DATE);
        assertThat(testUserVisit.getCreatedDate()).isEqualTo(DEFAULT_CREATED_DATE);
        assertThat(testUserVisit.getLastModifiedDate()).isEqualTo(DEFAULT_LAST_MODIFIED_DATE);
        assertThat(testUserVisit.getCreatedBy()).isEqualTo(DEFAULT_CREATED_BY);
        assertThat(testUserVisit.getLastModifiedBy()).isEqualTo(DEFAULT_LAST_MODIFIED_BY);
        assertThat(testUserVisit.getIsDeleted()).isEqualTo(DEFAULT_IS_DELETED);
    }

    @Test
    @Transactional
    void createUserVisitWithExistingId() throws Exception {
        // Create the UserVisit with an existing ID
        userVisit.setId(1L);

        int databaseSizeBeforeCreate = userVisitRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restUserVisitMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(userVisit)))
            .andExpect(status().isBadRequest());

        // Validate the UserVisit in the database
        List<UserVisit> userVisitList = userVisitRepository.findAll();
        assertThat(userVisitList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllUserVisits() throws Exception {
        // Initialize the database
        userVisitRepository.saveAndFlush(userVisit);

        // Get all the userVisitList
        restUserVisitMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(userVisit.getId().intValue())))
            .andExpect(jsonPath("$.[*].startDate").value(hasItem(DEFAULT_START_DATE.toString())))
            .andExpect(jsonPath("$.[*].endDate").value(hasItem(DEFAULT_END_DATE.toString())))
            .andExpect(jsonPath("$.[*].createdDate").value(hasItem(DEFAULT_CREATED_DATE.toString())))
            .andExpect(jsonPath("$.[*].lastModifiedDate").value(hasItem(DEFAULT_LAST_MODIFIED_DATE.toString())))
            .andExpect(jsonPath("$.[*].createdBy").value(hasItem(DEFAULT_CREATED_BY)))
            .andExpect(jsonPath("$.[*].lastModifiedBy").value(hasItem(DEFAULT_LAST_MODIFIED_BY)))
            .andExpect(jsonPath("$.[*].isDeleted").value(hasItem(DEFAULT_IS_DELETED.booleanValue())));
    }

    @Test
    @Transactional
    void getUserVisit() throws Exception {
        // Initialize the database
        userVisitRepository.saveAndFlush(userVisit);

        // Get the userVisit
        restUserVisitMockMvc
            .perform(get(ENTITY_API_URL_ID, userVisit.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(userVisit.getId().intValue()))
            .andExpect(jsonPath("$.startDate").value(DEFAULT_START_DATE.toString()))
            .andExpect(jsonPath("$.endDate").value(DEFAULT_END_DATE.toString()))
            .andExpect(jsonPath("$.createdDate").value(DEFAULT_CREATED_DATE.toString()))
            .andExpect(jsonPath("$.lastModifiedDate").value(DEFAULT_LAST_MODIFIED_DATE.toString()))
            .andExpect(jsonPath("$.createdBy").value(DEFAULT_CREATED_BY))
            .andExpect(jsonPath("$.lastModifiedBy").value(DEFAULT_LAST_MODIFIED_BY))
            .andExpect(jsonPath("$.isDeleted").value(DEFAULT_IS_DELETED.booleanValue()));
    }

    @Test
    @Transactional
    void getNonExistingUserVisit() throws Exception {
        // Get the userVisit
        restUserVisitMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewUserVisit() throws Exception {
        // Initialize the database
        userVisitRepository.saveAndFlush(userVisit);

        int databaseSizeBeforeUpdate = userVisitRepository.findAll().size();

        // Update the userVisit
        UserVisit updatedUserVisit = userVisitRepository.findById(userVisit.getId()).get();
        // Disconnect from session so that the updates on updatedUserVisit are not directly saved in db
        em.detach(updatedUserVisit);
        updatedUserVisit
            .startDate(UPDATED_START_DATE)
            .endDate(UPDATED_END_DATE)
            .createdDate(UPDATED_CREATED_DATE)
            .lastModifiedDate(UPDATED_LAST_MODIFIED_DATE)
            .createdBy(UPDATED_CREATED_BY)
            .lastModifiedBy(UPDATED_LAST_MODIFIED_BY)
            .isDeleted(UPDATED_IS_DELETED);

        restUserVisitMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedUserVisit.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedUserVisit))
            )
            .andExpect(status().isOk());

        // Validate the UserVisit in the database
        List<UserVisit> userVisitList = userVisitRepository.findAll();
        assertThat(userVisitList).hasSize(databaseSizeBeforeUpdate);
        UserVisit testUserVisit = userVisitList.get(userVisitList.size() - 1);
        assertThat(testUserVisit.getStartDate()).isEqualTo(UPDATED_START_DATE);
        assertThat(testUserVisit.getEndDate()).isEqualTo(UPDATED_END_DATE);
        assertThat(testUserVisit.getCreatedDate()).isEqualTo(UPDATED_CREATED_DATE);
        assertThat(testUserVisit.getLastModifiedDate()).isEqualTo(UPDATED_LAST_MODIFIED_DATE);
        assertThat(testUserVisit.getCreatedBy()).isEqualTo(UPDATED_CREATED_BY);
        assertThat(testUserVisit.getLastModifiedBy()).isEqualTo(UPDATED_LAST_MODIFIED_BY);
        assertThat(testUserVisit.getIsDeleted()).isEqualTo(UPDATED_IS_DELETED);
    }

    @Test
    @Transactional
    void putNonExistingUserVisit() throws Exception {
        int databaseSizeBeforeUpdate = userVisitRepository.findAll().size();
        userVisit.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restUserVisitMockMvc
            .perform(
                put(ENTITY_API_URL_ID, userVisit.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(userVisit))
            )
            .andExpect(status().isBadRequest());

        // Validate the UserVisit in the database
        List<UserVisit> userVisitList = userVisitRepository.findAll();
        assertThat(userVisitList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchUserVisit() throws Exception {
        int databaseSizeBeforeUpdate = userVisitRepository.findAll().size();
        userVisit.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restUserVisitMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(userVisit))
            )
            .andExpect(status().isBadRequest());

        // Validate the UserVisit in the database
        List<UserVisit> userVisitList = userVisitRepository.findAll();
        assertThat(userVisitList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamUserVisit() throws Exception {
        int databaseSizeBeforeUpdate = userVisitRepository.findAll().size();
        userVisit.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restUserVisitMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(userVisit)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the UserVisit in the database
        List<UserVisit> userVisitList = userVisitRepository.findAll();
        assertThat(userVisitList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateUserVisitWithPatch() throws Exception {
        // Initialize the database
        userVisitRepository.saveAndFlush(userVisit);

        int databaseSizeBeforeUpdate = userVisitRepository.findAll().size();

        // Update the userVisit using partial update
        UserVisit partialUpdatedUserVisit = new UserVisit();
        partialUpdatedUserVisit.setId(userVisit.getId());

        partialUpdatedUserVisit.endDate(UPDATED_END_DATE).lastModifiedBy(UPDATED_LAST_MODIFIED_BY).isDeleted(UPDATED_IS_DELETED);

        restUserVisitMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedUserVisit.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedUserVisit))
            )
            .andExpect(status().isOk());

        // Validate the UserVisit in the database
        List<UserVisit> userVisitList = userVisitRepository.findAll();
        assertThat(userVisitList).hasSize(databaseSizeBeforeUpdate);
        UserVisit testUserVisit = userVisitList.get(userVisitList.size() - 1);
        assertThat(testUserVisit.getStartDate()).isEqualTo(DEFAULT_START_DATE);
        assertThat(testUserVisit.getEndDate()).isEqualTo(UPDATED_END_DATE);
        assertThat(testUserVisit.getCreatedDate()).isEqualTo(DEFAULT_CREATED_DATE);
        assertThat(testUserVisit.getLastModifiedDate()).isEqualTo(DEFAULT_LAST_MODIFIED_DATE);
        assertThat(testUserVisit.getCreatedBy()).isEqualTo(DEFAULT_CREATED_BY);
        assertThat(testUserVisit.getLastModifiedBy()).isEqualTo(UPDATED_LAST_MODIFIED_BY);
        assertThat(testUserVisit.getIsDeleted()).isEqualTo(UPDATED_IS_DELETED);
    }

    @Test
    @Transactional
    void fullUpdateUserVisitWithPatch() throws Exception {
        // Initialize the database
        userVisitRepository.saveAndFlush(userVisit);

        int databaseSizeBeforeUpdate = userVisitRepository.findAll().size();

        // Update the userVisit using partial update
        UserVisit partialUpdatedUserVisit = new UserVisit();
        partialUpdatedUserVisit.setId(userVisit.getId());

        partialUpdatedUserVisit
            .startDate(UPDATED_START_DATE)
            .endDate(UPDATED_END_DATE)
            .createdDate(UPDATED_CREATED_DATE)
            .lastModifiedDate(UPDATED_LAST_MODIFIED_DATE)
            .createdBy(UPDATED_CREATED_BY)
            .lastModifiedBy(UPDATED_LAST_MODIFIED_BY)
            .isDeleted(UPDATED_IS_DELETED);

        restUserVisitMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedUserVisit.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedUserVisit))
            )
            .andExpect(status().isOk());

        // Validate the UserVisit in the database
        List<UserVisit> userVisitList = userVisitRepository.findAll();
        assertThat(userVisitList).hasSize(databaseSizeBeforeUpdate);
        UserVisit testUserVisit = userVisitList.get(userVisitList.size() - 1);
        assertThat(testUserVisit.getStartDate()).isEqualTo(UPDATED_START_DATE);
        assertThat(testUserVisit.getEndDate()).isEqualTo(UPDATED_END_DATE);
        assertThat(testUserVisit.getCreatedDate()).isEqualTo(UPDATED_CREATED_DATE);
        assertThat(testUserVisit.getLastModifiedDate()).isEqualTo(UPDATED_LAST_MODIFIED_DATE);
        assertThat(testUserVisit.getCreatedBy()).isEqualTo(UPDATED_CREATED_BY);
        assertThat(testUserVisit.getLastModifiedBy()).isEqualTo(UPDATED_LAST_MODIFIED_BY);
        assertThat(testUserVisit.getIsDeleted()).isEqualTo(UPDATED_IS_DELETED);
    }

    @Test
    @Transactional
    void patchNonExistingUserVisit() throws Exception {
        int databaseSizeBeforeUpdate = userVisitRepository.findAll().size();
        userVisit.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restUserVisitMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, userVisit.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(userVisit))
            )
            .andExpect(status().isBadRequest());

        // Validate the UserVisit in the database
        List<UserVisit> userVisitList = userVisitRepository.findAll();
        assertThat(userVisitList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchUserVisit() throws Exception {
        int databaseSizeBeforeUpdate = userVisitRepository.findAll().size();
        userVisit.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restUserVisitMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(userVisit))
            )
            .andExpect(status().isBadRequest());

        // Validate the UserVisit in the database
        List<UserVisit> userVisitList = userVisitRepository.findAll();
        assertThat(userVisitList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamUserVisit() throws Exception {
        int databaseSizeBeforeUpdate = userVisitRepository.findAll().size();
        userVisit.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restUserVisitMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(userVisit))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the UserVisit in the database
        List<UserVisit> userVisitList = userVisitRepository.findAll();
        assertThat(userVisitList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteUserVisit() throws Exception {
        // Initialize the database
        userVisitRepository.saveAndFlush(userVisit);

        int databaseSizeBeforeDelete = userVisitRepository.findAll().size();

        // Delete the userVisit
        restUserVisitMockMvc
            .perform(delete(ENTITY_API_URL_ID, userVisit.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<UserVisit> userVisitList = userVisitRepository.findAll();
        assertThat(userVisitList).hasSize(databaseSizeBeforeDelete - 1);
    }
}

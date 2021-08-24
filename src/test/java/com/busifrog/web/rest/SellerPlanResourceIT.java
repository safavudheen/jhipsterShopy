package com.busifrog.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.busifrog.IntegrationTest;
import com.busifrog.domain.SellerPlan;
import com.busifrog.repository.SellerPlanRepository;
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
 * Integration tests for the {@link SellerPlanResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class SellerPlanResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final Long DEFAULT_PRODUCTS = 1L;
    private static final Long UPDATED_PRODUCTS = 2L;

    private static final Long DEFAULT_SERVICES = 1L;
    private static final Long UPDATED_SERVICES = 2L;

    private static final Double DEFAULT_MONTHLY_PRICE = 1D;
    private static final Double UPDATED_MONTHLY_PRICE = 2D;

    private static final Double DEFAULT_ANNUAL_PRICE = 1D;
    private static final Double UPDATED_ANNUAL_PRICE = 2D;

    private static final Long DEFAULT_DISCOUNT = 1L;
    private static final Long UPDATED_DISCOUNT = 2L;

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

    private static final String ENTITY_API_URL = "/api/seller-plans";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private SellerPlanRepository sellerPlanRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restSellerPlanMockMvc;

    private SellerPlan sellerPlan;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static SellerPlan createEntity(EntityManager em) {
        SellerPlan sellerPlan = new SellerPlan()
            .name(DEFAULT_NAME)
            .products(DEFAULT_PRODUCTS)
            .services(DEFAULT_SERVICES)
            .monthlyPrice(DEFAULT_MONTHLY_PRICE)
            .annualPrice(DEFAULT_ANNUAL_PRICE)
            .discount(DEFAULT_DISCOUNT)
            .createdDate(DEFAULT_CREATED_DATE)
            .lastModifiedDate(DEFAULT_LAST_MODIFIED_DATE)
            .createdBy(DEFAULT_CREATED_BY)
            .lastModifiedBy(DEFAULT_LAST_MODIFIED_BY)
            .isDeleted(DEFAULT_IS_DELETED);
        return sellerPlan;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static SellerPlan createUpdatedEntity(EntityManager em) {
        SellerPlan sellerPlan = new SellerPlan()
            .name(UPDATED_NAME)
            .products(UPDATED_PRODUCTS)
            .services(UPDATED_SERVICES)
            .monthlyPrice(UPDATED_MONTHLY_PRICE)
            .annualPrice(UPDATED_ANNUAL_PRICE)
            .discount(UPDATED_DISCOUNT)
            .createdDate(UPDATED_CREATED_DATE)
            .lastModifiedDate(UPDATED_LAST_MODIFIED_DATE)
            .createdBy(UPDATED_CREATED_BY)
            .lastModifiedBy(UPDATED_LAST_MODIFIED_BY)
            .isDeleted(UPDATED_IS_DELETED);
        return sellerPlan;
    }

    @BeforeEach
    public void initTest() {
        sellerPlan = createEntity(em);
    }

    @Test
    @Transactional
    void createSellerPlan() throws Exception {
        int databaseSizeBeforeCreate = sellerPlanRepository.findAll().size();
        // Create the SellerPlan
        restSellerPlanMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(sellerPlan)))
            .andExpect(status().isCreated());

        // Validate the SellerPlan in the database
        List<SellerPlan> sellerPlanList = sellerPlanRepository.findAll();
        assertThat(sellerPlanList).hasSize(databaseSizeBeforeCreate + 1);
        SellerPlan testSellerPlan = sellerPlanList.get(sellerPlanList.size() - 1);
        assertThat(testSellerPlan.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testSellerPlan.getProducts()).isEqualTo(DEFAULT_PRODUCTS);
        assertThat(testSellerPlan.getServices()).isEqualTo(DEFAULT_SERVICES);
        assertThat(testSellerPlan.getMonthlyPrice()).isEqualTo(DEFAULT_MONTHLY_PRICE);
        assertThat(testSellerPlan.getAnnualPrice()).isEqualTo(DEFAULT_ANNUAL_PRICE);
        assertThat(testSellerPlan.getDiscount()).isEqualTo(DEFAULT_DISCOUNT);
        assertThat(testSellerPlan.getCreatedDate()).isEqualTo(DEFAULT_CREATED_DATE);
        assertThat(testSellerPlan.getLastModifiedDate()).isEqualTo(DEFAULT_LAST_MODIFIED_DATE);
        assertThat(testSellerPlan.getCreatedBy()).isEqualTo(DEFAULT_CREATED_BY);
        assertThat(testSellerPlan.getLastModifiedBy()).isEqualTo(DEFAULT_LAST_MODIFIED_BY);
        assertThat(testSellerPlan.getIsDeleted()).isEqualTo(DEFAULT_IS_DELETED);
    }

    @Test
    @Transactional
    void createSellerPlanWithExistingId() throws Exception {
        // Create the SellerPlan with an existing ID
        sellerPlan.setId(1L);

        int databaseSizeBeforeCreate = sellerPlanRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restSellerPlanMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(sellerPlan)))
            .andExpect(status().isBadRequest());

        // Validate the SellerPlan in the database
        List<SellerPlan> sellerPlanList = sellerPlanRepository.findAll();
        assertThat(sellerPlanList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = sellerPlanRepository.findAll().size();
        // set the field null
        sellerPlan.setName(null);

        // Create the SellerPlan, which fails.

        restSellerPlanMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(sellerPlan)))
            .andExpect(status().isBadRequest());

        List<SellerPlan> sellerPlanList = sellerPlanRepository.findAll();
        assertThat(sellerPlanList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllSellerPlans() throws Exception {
        // Initialize the database
        sellerPlanRepository.saveAndFlush(sellerPlan);

        // Get all the sellerPlanList
        restSellerPlanMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(sellerPlan.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].products").value(hasItem(DEFAULT_PRODUCTS.intValue())))
            .andExpect(jsonPath("$.[*].services").value(hasItem(DEFAULT_SERVICES.intValue())))
            .andExpect(jsonPath("$.[*].monthlyPrice").value(hasItem(DEFAULT_MONTHLY_PRICE.doubleValue())))
            .andExpect(jsonPath("$.[*].annualPrice").value(hasItem(DEFAULT_ANNUAL_PRICE.doubleValue())))
            .andExpect(jsonPath("$.[*].discount").value(hasItem(DEFAULT_DISCOUNT.intValue())))
            .andExpect(jsonPath("$.[*].createdDate").value(hasItem(DEFAULT_CREATED_DATE.toString())))
            .andExpect(jsonPath("$.[*].lastModifiedDate").value(hasItem(DEFAULT_LAST_MODIFIED_DATE.toString())))
            .andExpect(jsonPath("$.[*].createdBy").value(hasItem(DEFAULT_CREATED_BY)))
            .andExpect(jsonPath("$.[*].lastModifiedBy").value(hasItem(DEFAULT_LAST_MODIFIED_BY)))
            .andExpect(jsonPath("$.[*].isDeleted").value(hasItem(DEFAULT_IS_DELETED.booleanValue())));
    }

    @Test
    @Transactional
    void getSellerPlan() throws Exception {
        // Initialize the database
        sellerPlanRepository.saveAndFlush(sellerPlan);

        // Get the sellerPlan
        restSellerPlanMockMvc
            .perform(get(ENTITY_API_URL_ID, sellerPlan.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(sellerPlan.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.products").value(DEFAULT_PRODUCTS.intValue()))
            .andExpect(jsonPath("$.services").value(DEFAULT_SERVICES.intValue()))
            .andExpect(jsonPath("$.monthlyPrice").value(DEFAULT_MONTHLY_PRICE.doubleValue()))
            .andExpect(jsonPath("$.annualPrice").value(DEFAULT_ANNUAL_PRICE.doubleValue()))
            .andExpect(jsonPath("$.discount").value(DEFAULT_DISCOUNT.intValue()))
            .andExpect(jsonPath("$.createdDate").value(DEFAULT_CREATED_DATE.toString()))
            .andExpect(jsonPath("$.lastModifiedDate").value(DEFAULT_LAST_MODIFIED_DATE.toString()))
            .andExpect(jsonPath("$.createdBy").value(DEFAULT_CREATED_BY))
            .andExpect(jsonPath("$.lastModifiedBy").value(DEFAULT_LAST_MODIFIED_BY))
            .andExpect(jsonPath("$.isDeleted").value(DEFAULT_IS_DELETED.booleanValue()));
    }

    @Test
    @Transactional
    void getNonExistingSellerPlan() throws Exception {
        // Get the sellerPlan
        restSellerPlanMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewSellerPlan() throws Exception {
        // Initialize the database
        sellerPlanRepository.saveAndFlush(sellerPlan);

        int databaseSizeBeforeUpdate = sellerPlanRepository.findAll().size();

        // Update the sellerPlan
        SellerPlan updatedSellerPlan = sellerPlanRepository.findById(sellerPlan.getId()).get();
        // Disconnect from session so that the updates on updatedSellerPlan are not directly saved in db
        em.detach(updatedSellerPlan);
        updatedSellerPlan
            .name(UPDATED_NAME)
            .products(UPDATED_PRODUCTS)
            .services(UPDATED_SERVICES)
            .monthlyPrice(UPDATED_MONTHLY_PRICE)
            .annualPrice(UPDATED_ANNUAL_PRICE)
            .discount(UPDATED_DISCOUNT)
            .createdDate(UPDATED_CREATED_DATE)
            .lastModifiedDate(UPDATED_LAST_MODIFIED_DATE)
            .createdBy(UPDATED_CREATED_BY)
            .lastModifiedBy(UPDATED_LAST_MODIFIED_BY)
            .isDeleted(UPDATED_IS_DELETED);

        restSellerPlanMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedSellerPlan.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedSellerPlan))
            )
            .andExpect(status().isOk());

        // Validate the SellerPlan in the database
        List<SellerPlan> sellerPlanList = sellerPlanRepository.findAll();
        assertThat(sellerPlanList).hasSize(databaseSizeBeforeUpdate);
        SellerPlan testSellerPlan = sellerPlanList.get(sellerPlanList.size() - 1);
        assertThat(testSellerPlan.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testSellerPlan.getProducts()).isEqualTo(UPDATED_PRODUCTS);
        assertThat(testSellerPlan.getServices()).isEqualTo(UPDATED_SERVICES);
        assertThat(testSellerPlan.getMonthlyPrice()).isEqualTo(UPDATED_MONTHLY_PRICE);
        assertThat(testSellerPlan.getAnnualPrice()).isEqualTo(UPDATED_ANNUAL_PRICE);
        assertThat(testSellerPlan.getDiscount()).isEqualTo(UPDATED_DISCOUNT);
        assertThat(testSellerPlan.getCreatedDate()).isEqualTo(UPDATED_CREATED_DATE);
        assertThat(testSellerPlan.getLastModifiedDate()).isEqualTo(UPDATED_LAST_MODIFIED_DATE);
        assertThat(testSellerPlan.getCreatedBy()).isEqualTo(UPDATED_CREATED_BY);
        assertThat(testSellerPlan.getLastModifiedBy()).isEqualTo(UPDATED_LAST_MODIFIED_BY);
        assertThat(testSellerPlan.getIsDeleted()).isEqualTo(UPDATED_IS_DELETED);
    }

    @Test
    @Transactional
    void putNonExistingSellerPlan() throws Exception {
        int databaseSizeBeforeUpdate = sellerPlanRepository.findAll().size();
        sellerPlan.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSellerPlanMockMvc
            .perform(
                put(ENTITY_API_URL_ID, sellerPlan.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(sellerPlan))
            )
            .andExpect(status().isBadRequest());

        // Validate the SellerPlan in the database
        List<SellerPlan> sellerPlanList = sellerPlanRepository.findAll();
        assertThat(sellerPlanList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchSellerPlan() throws Exception {
        int databaseSizeBeforeUpdate = sellerPlanRepository.findAll().size();
        sellerPlan.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restSellerPlanMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(sellerPlan))
            )
            .andExpect(status().isBadRequest());

        // Validate the SellerPlan in the database
        List<SellerPlan> sellerPlanList = sellerPlanRepository.findAll();
        assertThat(sellerPlanList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamSellerPlan() throws Exception {
        int databaseSizeBeforeUpdate = sellerPlanRepository.findAll().size();
        sellerPlan.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restSellerPlanMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(sellerPlan)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the SellerPlan in the database
        List<SellerPlan> sellerPlanList = sellerPlanRepository.findAll();
        assertThat(sellerPlanList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateSellerPlanWithPatch() throws Exception {
        // Initialize the database
        sellerPlanRepository.saveAndFlush(sellerPlan);

        int databaseSizeBeforeUpdate = sellerPlanRepository.findAll().size();

        // Update the sellerPlan using partial update
        SellerPlan partialUpdatedSellerPlan = new SellerPlan();
        partialUpdatedSellerPlan.setId(sellerPlan.getId());

        partialUpdatedSellerPlan
            .monthlyPrice(UPDATED_MONTHLY_PRICE)
            .annualPrice(UPDATED_ANNUAL_PRICE)
            .createdBy(UPDATED_CREATED_BY)
            .lastModifiedBy(UPDATED_LAST_MODIFIED_BY);

        restSellerPlanMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedSellerPlan.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedSellerPlan))
            )
            .andExpect(status().isOk());

        // Validate the SellerPlan in the database
        List<SellerPlan> sellerPlanList = sellerPlanRepository.findAll();
        assertThat(sellerPlanList).hasSize(databaseSizeBeforeUpdate);
        SellerPlan testSellerPlan = sellerPlanList.get(sellerPlanList.size() - 1);
        assertThat(testSellerPlan.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testSellerPlan.getProducts()).isEqualTo(DEFAULT_PRODUCTS);
        assertThat(testSellerPlan.getServices()).isEqualTo(DEFAULT_SERVICES);
        assertThat(testSellerPlan.getMonthlyPrice()).isEqualTo(UPDATED_MONTHLY_PRICE);
        assertThat(testSellerPlan.getAnnualPrice()).isEqualTo(UPDATED_ANNUAL_PRICE);
        assertThat(testSellerPlan.getDiscount()).isEqualTo(DEFAULT_DISCOUNT);
        assertThat(testSellerPlan.getCreatedDate()).isEqualTo(DEFAULT_CREATED_DATE);
        assertThat(testSellerPlan.getLastModifiedDate()).isEqualTo(DEFAULT_LAST_MODIFIED_DATE);
        assertThat(testSellerPlan.getCreatedBy()).isEqualTo(UPDATED_CREATED_BY);
        assertThat(testSellerPlan.getLastModifiedBy()).isEqualTo(UPDATED_LAST_MODIFIED_BY);
        assertThat(testSellerPlan.getIsDeleted()).isEqualTo(DEFAULT_IS_DELETED);
    }

    @Test
    @Transactional
    void fullUpdateSellerPlanWithPatch() throws Exception {
        // Initialize the database
        sellerPlanRepository.saveAndFlush(sellerPlan);

        int databaseSizeBeforeUpdate = sellerPlanRepository.findAll().size();

        // Update the sellerPlan using partial update
        SellerPlan partialUpdatedSellerPlan = new SellerPlan();
        partialUpdatedSellerPlan.setId(sellerPlan.getId());

        partialUpdatedSellerPlan
            .name(UPDATED_NAME)
            .products(UPDATED_PRODUCTS)
            .services(UPDATED_SERVICES)
            .monthlyPrice(UPDATED_MONTHLY_PRICE)
            .annualPrice(UPDATED_ANNUAL_PRICE)
            .discount(UPDATED_DISCOUNT)
            .createdDate(UPDATED_CREATED_DATE)
            .lastModifiedDate(UPDATED_LAST_MODIFIED_DATE)
            .createdBy(UPDATED_CREATED_BY)
            .lastModifiedBy(UPDATED_LAST_MODIFIED_BY)
            .isDeleted(UPDATED_IS_DELETED);

        restSellerPlanMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedSellerPlan.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedSellerPlan))
            )
            .andExpect(status().isOk());

        // Validate the SellerPlan in the database
        List<SellerPlan> sellerPlanList = sellerPlanRepository.findAll();
        assertThat(sellerPlanList).hasSize(databaseSizeBeforeUpdate);
        SellerPlan testSellerPlan = sellerPlanList.get(sellerPlanList.size() - 1);
        assertThat(testSellerPlan.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testSellerPlan.getProducts()).isEqualTo(UPDATED_PRODUCTS);
        assertThat(testSellerPlan.getServices()).isEqualTo(UPDATED_SERVICES);
        assertThat(testSellerPlan.getMonthlyPrice()).isEqualTo(UPDATED_MONTHLY_PRICE);
        assertThat(testSellerPlan.getAnnualPrice()).isEqualTo(UPDATED_ANNUAL_PRICE);
        assertThat(testSellerPlan.getDiscount()).isEqualTo(UPDATED_DISCOUNT);
        assertThat(testSellerPlan.getCreatedDate()).isEqualTo(UPDATED_CREATED_DATE);
        assertThat(testSellerPlan.getLastModifiedDate()).isEqualTo(UPDATED_LAST_MODIFIED_DATE);
        assertThat(testSellerPlan.getCreatedBy()).isEqualTo(UPDATED_CREATED_BY);
        assertThat(testSellerPlan.getLastModifiedBy()).isEqualTo(UPDATED_LAST_MODIFIED_BY);
        assertThat(testSellerPlan.getIsDeleted()).isEqualTo(UPDATED_IS_DELETED);
    }

    @Test
    @Transactional
    void patchNonExistingSellerPlan() throws Exception {
        int databaseSizeBeforeUpdate = sellerPlanRepository.findAll().size();
        sellerPlan.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSellerPlanMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, sellerPlan.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(sellerPlan))
            )
            .andExpect(status().isBadRequest());

        // Validate the SellerPlan in the database
        List<SellerPlan> sellerPlanList = sellerPlanRepository.findAll();
        assertThat(sellerPlanList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchSellerPlan() throws Exception {
        int databaseSizeBeforeUpdate = sellerPlanRepository.findAll().size();
        sellerPlan.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restSellerPlanMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(sellerPlan))
            )
            .andExpect(status().isBadRequest());

        // Validate the SellerPlan in the database
        List<SellerPlan> sellerPlanList = sellerPlanRepository.findAll();
        assertThat(sellerPlanList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamSellerPlan() throws Exception {
        int databaseSizeBeforeUpdate = sellerPlanRepository.findAll().size();
        sellerPlan.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restSellerPlanMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(sellerPlan))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the SellerPlan in the database
        List<SellerPlan> sellerPlanList = sellerPlanRepository.findAll();
        assertThat(sellerPlanList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteSellerPlan() throws Exception {
        // Initialize the database
        sellerPlanRepository.saveAndFlush(sellerPlan);

        int databaseSizeBeforeDelete = sellerPlanRepository.findAll().size();

        // Delete the sellerPlan
        restSellerPlanMockMvc
            .perform(delete(ENTITY_API_URL_ID, sellerPlan.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<SellerPlan> sellerPlanList = sellerPlanRepository.findAll();
        assertThat(sellerPlanList).hasSize(databaseSizeBeforeDelete - 1);
    }
}

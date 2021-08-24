package com.busifrog.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.busifrog.IntegrationTest;
import com.busifrog.domain.Contact;
import com.busifrog.repository.ContactRepository;
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
 * Integration tests for the {@link ContactResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class ContactResourceIT {

    private static final String DEFAULT_FIRST_PERSON_NAME = "AAAAAAAAAA";
    private static final String UPDATED_FIRST_PERSON_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_IMAGE_URL = "AAAAAAAAAA";
    private static final String UPDATED_IMAGE_URL = "BBBBBBBBBB";

    private static final String DEFAULT_WHATSAPP_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_WHATSAPP_NUMBER = "BBBBBBBBBB";

    private static final String DEFAULT_LANDLINE_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_LANDLINE_NUMBER = "BBBBBBBBBB";

    private static final String DEFAULT_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_EMAIL = "BBBBBBBBBB";

    private static final String DEFAULT_ADDRESS_LINE_1 = "AAAAAAAAAA";
    private static final String UPDATED_ADDRESS_LINE_1 = "BBBBBBBBBB";

    private static final String DEFAULT_ADDRESS_LINE_2 = "AAAAAAAAAA";
    private static final String UPDATED_ADDRESS_LINE_2 = "BBBBBBBBBB";

    private static final Long DEFAULT_PINCODE = 1L;
    private static final Long UPDATED_PINCODE = 2L;

    private static final String DEFAULT_LATITUDE = "AAAAAAAAAA";
    private static final String UPDATED_LATITUDE = "BBBBBBBBBB";

    private static final String DEFAULT_LONGITUDE = "AAAAAAAAAA";
    private static final String UPDATED_LONGITUDE = "BBBBBBBBBB";

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

    private static final String ENTITY_API_URL = "/api/contacts";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ContactRepository contactRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restContactMockMvc;

    private Contact contact;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Contact createEntity(EntityManager em) {
        Contact contact = new Contact()
            .firstPersonName(DEFAULT_FIRST_PERSON_NAME)
            .imageUrl(DEFAULT_IMAGE_URL)
            .whatsappNumber(DEFAULT_WHATSAPP_NUMBER)
            .landlineNumber(DEFAULT_LANDLINE_NUMBER)
            .email(DEFAULT_EMAIL)
            .addressLine1(DEFAULT_ADDRESS_LINE_1)
            .addressLine2(DEFAULT_ADDRESS_LINE_2)
            .pincode(DEFAULT_PINCODE)
            .latitude(DEFAULT_LATITUDE)
            .longitude(DEFAULT_LONGITUDE)
            .createdDate(DEFAULT_CREATED_DATE)
            .lastModifiedDate(DEFAULT_LAST_MODIFIED_DATE)
            .createdBy(DEFAULT_CREATED_BY)
            .lastModifiedBy(DEFAULT_LAST_MODIFIED_BY)
            .isDeleted(DEFAULT_IS_DELETED);
        return contact;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Contact createUpdatedEntity(EntityManager em) {
        Contact contact = new Contact()
            .firstPersonName(UPDATED_FIRST_PERSON_NAME)
            .imageUrl(UPDATED_IMAGE_URL)
            .whatsappNumber(UPDATED_WHATSAPP_NUMBER)
            .landlineNumber(UPDATED_LANDLINE_NUMBER)
            .email(UPDATED_EMAIL)
            .addressLine1(UPDATED_ADDRESS_LINE_1)
            .addressLine2(UPDATED_ADDRESS_LINE_2)
            .pincode(UPDATED_PINCODE)
            .latitude(UPDATED_LATITUDE)
            .longitude(UPDATED_LONGITUDE)
            .createdDate(UPDATED_CREATED_DATE)
            .lastModifiedDate(UPDATED_LAST_MODIFIED_DATE)
            .createdBy(UPDATED_CREATED_BY)
            .lastModifiedBy(UPDATED_LAST_MODIFIED_BY)
            .isDeleted(UPDATED_IS_DELETED);
        return contact;
    }

    @BeforeEach
    public void initTest() {
        contact = createEntity(em);
    }

    @Test
    @Transactional
    void createContact() throws Exception {
        int databaseSizeBeforeCreate = contactRepository.findAll().size();
        // Create the Contact
        restContactMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(contact)))
            .andExpect(status().isCreated());

        // Validate the Contact in the database
        List<Contact> contactList = contactRepository.findAll();
        assertThat(contactList).hasSize(databaseSizeBeforeCreate + 1);
        Contact testContact = contactList.get(contactList.size() - 1);
        assertThat(testContact.getFirstPersonName()).isEqualTo(DEFAULT_FIRST_PERSON_NAME);
        assertThat(testContact.getImageUrl()).isEqualTo(DEFAULT_IMAGE_URL);
        assertThat(testContact.getWhatsappNumber()).isEqualTo(DEFAULT_WHATSAPP_NUMBER);
        assertThat(testContact.getLandlineNumber()).isEqualTo(DEFAULT_LANDLINE_NUMBER);
        assertThat(testContact.getEmail()).isEqualTo(DEFAULT_EMAIL);
        assertThat(testContact.getAddressLine1()).isEqualTo(DEFAULT_ADDRESS_LINE_1);
        assertThat(testContact.getAddressLine2()).isEqualTo(DEFAULT_ADDRESS_LINE_2);
        assertThat(testContact.getPincode()).isEqualTo(DEFAULT_PINCODE);
        assertThat(testContact.getLatitude()).isEqualTo(DEFAULT_LATITUDE);
        assertThat(testContact.getLongitude()).isEqualTo(DEFAULT_LONGITUDE);
        assertThat(testContact.getCreatedDate()).isEqualTo(DEFAULT_CREATED_DATE);
        assertThat(testContact.getLastModifiedDate()).isEqualTo(DEFAULT_LAST_MODIFIED_DATE);
        assertThat(testContact.getCreatedBy()).isEqualTo(DEFAULT_CREATED_BY);
        assertThat(testContact.getLastModifiedBy()).isEqualTo(DEFAULT_LAST_MODIFIED_BY);
        assertThat(testContact.getIsDeleted()).isEqualTo(DEFAULT_IS_DELETED);
    }

    @Test
    @Transactional
    void createContactWithExistingId() throws Exception {
        // Create the Contact with an existing ID
        contact.setId(1L);

        int databaseSizeBeforeCreate = contactRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restContactMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(contact)))
            .andExpect(status().isBadRequest());

        // Validate the Contact in the database
        List<Contact> contactList = contactRepository.findAll();
        assertThat(contactList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllContacts() throws Exception {
        // Initialize the database
        contactRepository.saveAndFlush(contact);

        // Get all the contactList
        restContactMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(contact.getId().intValue())))
            .andExpect(jsonPath("$.[*].firstPersonName").value(hasItem(DEFAULT_FIRST_PERSON_NAME)))
            .andExpect(jsonPath("$.[*].imageUrl").value(hasItem(DEFAULT_IMAGE_URL)))
            .andExpect(jsonPath("$.[*].whatsappNumber").value(hasItem(DEFAULT_WHATSAPP_NUMBER)))
            .andExpect(jsonPath("$.[*].landlineNumber").value(hasItem(DEFAULT_LANDLINE_NUMBER)))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL)))
            .andExpect(jsonPath("$.[*].addressLine1").value(hasItem(DEFAULT_ADDRESS_LINE_1)))
            .andExpect(jsonPath("$.[*].addressLine2").value(hasItem(DEFAULT_ADDRESS_LINE_2)))
            .andExpect(jsonPath("$.[*].pincode").value(hasItem(DEFAULT_PINCODE.intValue())))
            .andExpect(jsonPath("$.[*].latitude").value(hasItem(DEFAULT_LATITUDE)))
            .andExpect(jsonPath("$.[*].longitude").value(hasItem(DEFAULT_LONGITUDE)))
            .andExpect(jsonPath("$.[*].createdDate").value(hasItem(DEFAULT_CREATED_DATE.toString())))
            .andExpect(jsonPath("$.[*].lastModifiedDate").value(hasItem(DEFAULT_LAST_MODIFIED_DATE.toString())))
            .andExpect(jsonPath("$.[*].createdBy").value(hasItem(DEFAULT_CREATED_BY)))
            .andExpect(jsonPath("$.[*].lastModifiedBy").value(hasItem(DEFAULT_LAST_MODIFIED_BY)))
            .andExpect(jsonPath("$.[*].isDeleted").value(hasItem(DEFAULT_IS_DELETED.booleanValue())));
    }

    @Test
    @Transactional
    void getContact() throws Exception {
        // Initialize the database
        contactRepository.saveAndFlush(contact);

        // Get the contact
        restContactMockMvc
            .perform(get(ENTITY_API_URL_ID, contact.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(contact.getId().intValue()))
            .andExpect(jsonPath("$.firstPersonName").value(DEFAULT_FIRST_PERSON_NAME))
            .andExpect(jsonPath("$.imageUrl").value(DEFAULT_IMAGE_URL))
            .andExpect(jsonPath("$.whatsappNumber").value(DEFAULT_WHATSAPP_NUMBER))
            .andExpect(jsonPath("$.landlineNumber").value(DEFAULT_LANDLINE_NUMBER))
            .andExpect(jsonPath("$.email").value(DEFAULT_EMAIL))
            .andExpect(jsonPath("$.addressLine1").value(DEFAULT_ADDRESS_LINE_1))
            .andExpect(jsonPath("$.addressLine2").value(DEFAULT_ADDRESS_LINE_2))
            .andExpect(jsonPath("$.pincode").value(DEFAULT_PINCODE.intValue()))
            .andExpect(jsonPath("$.latitude").value(DEFAULT_LATITUDE))
            .andExpect(jsonPath("$.longitude").value(DEFAULT_LONGITUDE))
            .andExpect(jsonPath("$.createdDate").value(DEFAULT_CREATED_DATE.toString()))
            .andExpect(jsonPath("$.lastModifiedDate").value(DEFAULT_LAST_MODIFIED_DATE.toString()))
            .andExpect(jsonPath("$.createdBy").value(DEFAULT_CREATED_BY))
            .andExpect(jsonPath("$.lastModifiedBy").value(DEFAULT_LAST_MODIFIED_BY))
            .andExpect(jsonPath("$.isDeleted").value(DEFAULT_IS_DELETED.booleanValue()));
    }

    @Test
    @Transactional
    void getNonExistingContact() throws Exception {
        // Get the contact
        restContactMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewContact() throws Exception {
        // Initialize the database
        contactRepository.saveAndFlush(contact);

        int databaseSizeBeforeUpdate = contactRepository.findAll().size();

        // Update the contact
        Contact updatedContact = contactRepository.findById(contact.getId()).get();
        // Disconnect from session so that the updates on updatedContact are not directly saved in db
        em.detach(updatedContact);
        updatedContact
            .firstPersonName(UPDATED_FIRST_PERSON_NAME)
            .imageUrl(UPDATED_IMAGE_URL)
            .whatsappNumber(UPDATED_WHATSAPP_NUMBER)
            .landlineNumber(UPDATED_LANDLINE_NUMBER)
            .email(UPDATED_EMAIL)
            .addressLine1(UPDATED_ADDRESS_LINE_1)
            .addressLine2(UPDATED_ADDRESS_LINE_2)
            .pincode(UPDATED_PINCODE)
            .latitude(UPDATED_LATITUDE)
            .longitude(UPDATED_LONGITUDE)
            .createdDate(UPDATED_CREATED_DATE)
            .lastModifiedDate(UPDATED_LAST_MODIFIED_DATE)
            .createdBy(UPDATED_CREATED_BY)
            .lastModifiedBy(UPDATED_LAST_MODIFIED_BY)
            .isDeleted(UPDATED_IS_DELETED);

        restContactMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedContact.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedContact))
            )
            .andExpect(status().isOk());

        // Validate the Contact in the database
        List<Contact> contactList = contactRepository.findAll();
        assertThat(contactList).hasSize(databaseSizeBeforeUpdate);
        Contact testContact = contactList.get(contactList.size() - 1);
        assertThat(testContact.getFirstPersonName()).isEqualTo(UPDATED_FIRST_PERSON_NAME);
        assertThat(testContact.getImageUrl()).isEqualTo(UPDATED_IMAGE_URL);
        assertThat(testContact.getWhatsappNumber()).isEqualTo(UPDATED_WHATSAPP_NUMBER);
        assertThat(testContact.getLandlineNumber()).isEqualTo(UPDATED_LANDLINE_NUMBER);
        assertThat(testContact.getEmail()).isEqualTo(UPDATED_EMAIL);
        assertThat(testContact.getAddressLine1()).isEqualTo(UPDATED_ADDRESS_LINE_1);
        assertThat(testContact.getAddressLine2()).isEqualTo(UPDATED_ADDRESS_LINE_2);
        assertThat(testContact.getPincode()).isEqualTo(UPDATED_PINCODE);
        assertThat(testContact.getLatitude()).isEqualTo(UPDATED_LATITUDE);
        assertThat(testContact.getLongitude()).isEqualTo(UPDATED_LONGITUDE);
        assertThat(testContact.getCreatedDate()).isEqualTo(UPDATED_CREATED_DATE);
        assertThat(testContact.getLastModifiedDate()).isEqualTo(UPDATED_LAST_MODIFIED_DATE);
        assertThat(testContact.getCreatedBy()).isEqualTo(UPDATED_CREATED_BY);
        assertThat(testContact.getLastModifiedBy()).isEqualTo(UPDATED_LAST_MODIFIED_BY);
        assertThat(testContact.getIsDeleted()).isEqualTo(UPDATED_IS_DELETED);
    }

    @Test
    @Transactional
    void putNonExistingContact() throws Exception {
        int databaseSizeBeforeUpdate = contactRepository.findAll().size();
        contact.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restContactMockMvc
            .perform(
                put(ENTITY_API_URL_ID, contact.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(contact))
            )
            .andExpect(status().isBadRequest());

        // Validate the Contact in the database
        List<Contact> contactList = contactRepository.findAll();
        assertThat(contactList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchContact() throws Exception {
        int databaseSizeBeforeUpdate = contactRepository.findAll().size();
        contact.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restContactMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(contact))
            )
            .andExpect(status().isBadRequest());

        // Validate the Contact in the database
        List<Contact> contactList = contactRepository.findAll();
        assertThat(contactList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamContact() throws Exception {
        int databaseSizeBeforeUpdate = contactRepository.findAll().size();
        contact.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restContactMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(contact)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Contact in the database
        List<Contact> contactList = contactRepository.findAll();
        assertThat(contactList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateContactWithPatch() throws Exception {
        // Initialize the database
        contactRepository.saveAndFlush(contact);

        int databaseSizeBeforeUpdate = contactRepository.findAll().size();

        // Update the contact using partial update
        Contact partialUpdatedContact = new Contact();
        partialUpdatedContact.setId(contact.getId());

        partialUpdatedContact
            .firstPersonName(UPDATED_FIRST_PERSON_NAME)
            .whatsappNumber(UPDATED_WHATSAPP_NUMBER)
            .landlineNumber(UPDATED_LANDLINE_NUMBER)
            .addressLine2(UPDATED_ADDRESS_LINE_2)
            .pincode(UPDATED_PINCODE)
            .latitude(UPDATED_LATITUDE)
            .longitude(UPDATED_LONGITUDE)
            .isDeleted(UPDATED_IS_DELETED);

        restContactMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedContact.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedContact))
            )
            .andExpect(status().isOk());

        // Validate the Contact in the database
        List<Contact> contactList = contactRepository.findAll();
        assertThat(contactList).hasSize(databaseSizeBeforeUpdate);
        Contact testContact = contactList.get(contactList.size() - 1);
        assertThat(testContact.getFirstPersonName()).isEqualTo(UPDATED_FIRST_PERSON_NAME);
        assertThat(testContact.getImageUrl()).isEqualTo(DEFAULT_IMAGE_URL);
        assertThat(testContact.getWhatsappNumber()).isEqualTo(UPDATED_WHATSAPP_NUMBER);
        assertThat(testContact.getLandlineNumber()).isEqualTo(UPDATED_LANDLINE_NUMBER);
        assertThat(testContact.getEmail()).isEqualTo(DEFAULT_EMAIL);
        assertThat(testContact.getAddressLine1()).isEqualTo(DEFAULT_ADDRESS_LINE_1);
        assertThat(testContact.getAddressLine2()).isEqualTo(UPDATED_ADDRESS_LINE_2);
        assertThat(testContact.getPincode()).isEqualTo(UPDATED_PINCODE);
        assertThat(testContact.getLatitude()).isEqualTo(UPDATED_LATITUDE);
        assertThat(testContact.getLongitude()).isEqualTo(UPDATED_LONGITUDE);
        assertThat(testContact.getCreatedDate()).isEqualTo(DEFAULT_CREATED_DATE);
        assertThat(testContact.getLastModifiedDate()).isEqualTo(DEFAULT_LAST_MODIFIED_DATE);
        assertThat(testContact.getCreatedBy()).isEqualTo(DEFAULT_CREATED_BY);
        assertThat(testContact.getLastModifiedBy()).isEqualTo(DEFAULT_LAST_MODIFIED_BY);
        assertThat(testContact.getIsDeleted()).isEqualTo(UPDATED_IS_DELETED);
    }

    @Test
    @Transactional
    void fullUpdateContactWithPatch() throws Exception {
        // Initialize the database
        contactRepository.saveAndFlush(contact);

        int databaseSizeBeforeUpdate = contactRepository.findAll().size();

        // Update the contact using partial update
        Contact partialUpdatedContact = new Contact();
        partialUpdatedContact.setId(contact.getId());

        partialUpdatedContact
            .firstPersonName(UPDATED_FIRST_PERSON_NAME)
            .imageUrl(UPDATED_IMAGE_URL)
            .whatsappNumber(UPDATED_WHATSAPP_NUMBER)
            .landlineNumber(UPDATED_LANDLINE_NUMBER)
            .email(UPDATED_EMAIL)
            .addressLine1(UPDATED_ADDRESS_LINE_1)
            .addressLine2(UPDATED_ADDRESS_LINE_2)
            .pincode(UPDATED_PINCODE)
            .latitude(UPDATED_LATITUDE)
            .longitude(UPDATED_LONGITUDE)
            .createdDate(UPDATED_CREATED_DATE)
            .lastModifiedDate(UPDATED_LAST_MODIFIED_DATE)
            .createdBy(UPDATED_CREATED_BY)
            .lastModifiedBy(UPDATED_LAST_MODIFIED_BY)
            .isDeleted(UPDATED_IS_DELETED);

        restContactMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedContact.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedContact))
            )
            .andExpect(status().isOk());

        // Validate the Contact in the database
        List<Contact> contactList = contactRepository.findAll();
        assertThat(contactList).hasSize(databaseSizeBeforeUpdate);
        Contact testContact = contactList.get(contactList.size() - 1);
        assertThat(testContact.getFirstPersonName()).isEqualTo(UPDATED_FIRST_PERSON_NAME);
        assertThat(testContact.getImageUrl()).isEqualTo(UPDATED_IMAGE_URL);
        assertThat(testContact.getWhatsappNumber()).isEqualTo(UPDATED_WHATSAPP_NUMBER);
        assertThat(testContact.getLandlineNumber()).isEqualTo(UPDATED_LANDLINE_NUMBER);
        assertThat(testContact.getEmail()).isEqualTo(UPDATED_EMAIL);
        assertThat(testContact.getAddressLine1()).isEqualTo(UPDATED_ADDRESS_LINE_1);
        assertThat(testContact.getAddressLine2()).isEqualTo(UPDATED_ADDRESS_LINE_2);
        assertThat(testContact.getPincode()).isEqualTo(UPDATED_PINCODE);
        assertThat(testContact.getLatitude()).isEqualTo(UPDATED_LATITUDE);
        assertThat(testContact.getLongitude()).isEqualTo(UPDATED_LONGITUDE);
        assertThat(testContact.getCreatedDate()).isEqualTo(UPDATED_CREATED_DATE);
        assertThat(testContact.getLastModifiedDate()).isEqualTo(UPDATED_LAST_MODIFIED_DATE);
        assertThat(testContact.getCreatedBy()).isEqualTo(UPDATED_CREATED_BY);
        assertThat(testContact.getLastModifiedBy()).isEqualTo(UPDATED_LAST_MODIFIED_BY);
        assertThat(testContact.getIsDeleted()).isEqualTo(UPDATED_IS_DELETED);
    }

    @Test
    @Transactional
    void patchNonExistingContact() throws Exception {
        int databaseSizeBeforeUpdate = contactRepository.findAll().size();
        contact.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restContactMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, contact.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(contact))
            )
            .andExpect(status().isBadRequest());

        // Validate the Contact in the database
        List<Contact> contactList = contactRepository.findAll();
        assertThat(contactList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchContact() throws Exception {
        int databaseSizeBeforeUpdate = contactRepository.findAll().size();
        contact.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restContactMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(contact))
            )
            .andExpect(status().isBadRequest());

        // Validate the Contact in the database
        List<Contact> contactList = contactRepository.findAll();
        assertThat(contactList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamContact() throws Exception {
        int databaseSizeBeforeUpdate = contactRepository.findAll().size();
        contact.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restContactMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(contact)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Contact in the database
        List<Contact> contactList = contactRepository.findAll();
        assertThat(contactList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteContact() throws Exception {
        // Initialize the database
        contactRepository.saveAndFlush(contact);

        int databaseSizeBeforeDelete = contactRepository.findAll().size();

        // Delete the contact
        restContactMockMvc
            .perform(delete(ENTITY_API_URL_ID, contact.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Contact> contactList = contactRepository.findAll();
        assertThat(contactList).hasSize(databaseSizeBeforeDelete - 1);
    }
}

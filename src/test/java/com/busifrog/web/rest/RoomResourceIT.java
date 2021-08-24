package com.busifrog.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.busifrog.IntegrationTest;
import com.busifrog.domain.Room;
import com.busifrog.domain.enumeration.RoomStatus;
import com.busifrog.repository.RoomRepository;
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
 * Integration tests for the {@link RoomResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class RoomResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_LOGO_IMAGE_URL = "AAAAAAAAAA";
    private static final String UPDATED_LOGO_IMAGE_URL = "BBBBBBBBBB";

    private static final Long DEFAULT_PINCODE = 1L;
    private static final Long UPDATED_PINCODE = 2L;

    private static final String DEFAULT_LATITUDE = "AAAAAAAAAA";
    private static final String UPDATED_LATITUDE = "BBBBBBBBBB";

    private static final String DEFAULT_LONGITUDE = "AAAAAAAAAA";
    private static final String UPDATED_LONGITUDE = "BBBBBBBBBB";

    private static final Instant DEFAULT_PLAN_EXPIRY_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_PLAN_EXPIRY_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final RoomStatus DEFAULT_STATUS = RoomStatus.INACTIVE;
    private static final RoomStatus UPDATED_STATUS = RoomStatus.VERIFIED;

    private static final String DEFAULT_WEBSITE_LINK = "AAAAAAAAAA";
    private static final String UPDATED_WEBSITE_LINK = "BBBBBBBBBB";

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

    private static final String ENTITY_API_URL = "/api/rooms";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restRoomMockMvc;

    private Room room;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Room createEntity(EntityManager em) {
        Room room = new Room()
            .name(DEFAULT_NAME)
            .logoImageUrl(DEFAULT_LOGO_IMAGE_URL)
            .pincode(DEFAULT_PINCODE)
            .latitude(DEFAULT_LATITUDE)
            .longitude(DEFAULT_LONGITUDE)
            .planExpiryDate(DEFAULT_PLAN_EXPIRY_DATE)
            .status(DEFAULT_STATUS)
            .websiteLink(DEFAULT_WEBSITE_LINK)
            .createdDate(DEFAULT_CREATED_DATE)
            .lastModifiedDate(DEFAULT_LAST_MODIFIED_DATE)
            .createdBy(DEFAULT_CREATED_BY)
            .lastModifiedBy(DEFAULT_LAST_MODIFIED_BY)
            .isDeleted(DEFAULT_IS_DELETED);
        return room;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Room createUpdatedEntity(EntityManager em) {
        Room room = new Room()
            .name(UPDATED_NAME)
            .logoImageUrl(UPDATED_LOGO_IMAGE_URL)
            .pincode(UPDATED_PINCODE)
            .latitude(UPDATED_LATITUDE)
            .longitude(UPDATED_LONGITUDE)
            .planExpiryDate(UPDATED_PLAN_EXPIRY_DATE)
            .status(UPDATED_STATUS)
            .websiteLink(UPDATED_WEBSITE_LINK)
            .createdDate(UPDATED_CREATED_DATE)
            .lastModifiedDate(UPDATED_LAST_MODIFIED_DATE)
            .createdBy(UPDATED_CREATED_BY)
            .lastModifiedBy(UPDATED_LAST_MODIFIED_BY)
            .isDeleted(UPDATED_IS_DELETED);
        return room;
    }

    @BeforeEach
    public void initTest() {
        room = createEntity(em);
    }

    @Test
    @Transactional
    void createRoom() throws Exception {
        int databaseSizeBeforeCreate = roomRepository.findAll().size();
        // Create the Room
        restRoomMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(room)))
            .andExpect(status().isCreated());

        // Validate the Room in the database
        List<Room> roomList = roomRepository.findAll();
        assertThat(roomList).hasSize(databaseSizeBeforeCreate + 1);
        Room testRoom = roomList.get(roomList.size() - 1);
        assertThat(testRoom.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testRoom.getLogoImageUrl()).isEqualTo(DEFAULT_LOGO_IMAGE_URL);
        assertThat(testRoom.getPincode()).isEqualTo(DEFAULT_PINCODE);
        assertThat(testRoom.getLatitude()).isEqualTo(DEFAULT_LATITUDE);
        assertThat(testRoom.getLongitude()).isEqualTo(DEFAULT_LONGITUDE);
        assertThat(testRoom.getPlanExpiryDate()).isEqualTo(DEFAULT_PLAN_EXPIRY_DATE);
        assertThat(testRoom.getStatus()).isEqualTo(DEFAULT_STATUS);
        assertThat(testRoom.getWebsiteLink()).isEqualTo(DEFAULT_WEBSITE_LINK);
        assertThat(testRoom.getCreatedDate()).isEqualTo(DEFAULT_CREATED_DATE);
        assertThat(testRoom.getLastModifiedDate()).isEqualTo(DEFAULT_LAST_MODIFIED_DATE);
        assertThat(testRoom.getCreatedBy()).isEqualTo(DEFAULT_CREATED_BY);
        assertThat(testRoom.getLastModifiedBy()).isEqualTo(DEFAULT_LAST_MODIFIED_BY);
        assertThat(testRoom.getIsDeleted()).isEqualTo(DEFAULT_IS_DELETED);
    }

    @Test
    @Transactional
    void createRoomWithExistingId() throws Exception {
        // Create the Room with an existing ID
        room.setId(1L);

        int databaseSizeBeforeCreate = roomRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restRoomMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(room)))
            .andExpect(status().isBadRequest());

        // Validate the Room in the database
        List<Room> roomList = roomRepository.findAll();
        assertThat(roomList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = roomRepository.findAll().size();
        // set the field null
        room.setName(null);

        // Create the Room, which fails.

        restRoomMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(room)))
            .andExpect(status().isBadRequest());

        List<Room> roomList = roomRepository.findAll();
        assertThat(roomList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllRooms() throws Exception {
        // Initialize the database
        roomRepository.saveAndFlush(room);

        // Get all the roomList
        restRoomMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(room.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].logoImageUrl").value(hasItem(DEFAULT_LOGO_IMAGE_URL)))
            .andExpect(jsonPath("$.[*].pincode").value(hasItem(DEFAULT_PINCODE.intValue())))
            .andExpect(jsonPath("$.[*].latitude").value(hasItem(DEFAULT_LATITUDE)))
            .andExpect(jsonPath("$.[*].longitude").value(hasItem(DEFAULT_LONGITUDE)))
            .andExpect(jsonPath("$.[*].planExpiryDate").value(hasItem(DEFAULT_PLAN_EXPIRY_DATE.toString())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())))
            .andExpect(jsonPath("$.[*].websiteLink").value(hasItem(DEFAULT_WEBSITE_LINK)))
            .andExpect(jsonPath("$.[*].createdDate").value(hasItem(DEFAULT_CREATED_DATE.toString())))
            .andExpect(jsonPath("$.[*].lastModifiedDate").value(hasItem(DEFAULT_LAST_MODIFIED_DATE.toString())))
            .andExpect(jsonPath("$.[*].createdBy").value(hasItem(DEFAULT_CREATED_BY)))
            .andExpect(jsonPath("$.[*].lastModifiedBy").value(hasItem(DEFAULT_LAST_MODIFIED_BY)))
            .andExpect(jsonPath("$.[*].isDeleted").value(hasItem(DEFAULT_IS_DELETED.booleanValue())));
    }

    @Test
    @Transactional
    void getRoom() throws Exception {
        // Initialize the database
        roomRepository.saveAndFlush(room);

        // Get the room
        restRoomMockMvc
            .perform(get(ENTITY_API_URL_ID, room.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(room.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.logoImageUrl").value(DEFAULT_LOGO_IMAGE_URL))
            .andExpect(jsonPath("$.pincode").value(DEFAULT_PINCODE.intValue()))
            .andExpect(jsonPath("$.latitude").value(DEFAULT_LATITUDE))
            .andExpect(jsonPath("$.longitude").value(DEFAULT_LONGITUDE))
            .andExpect(jsonPath("$.planExpiryDate").value(DEFAULT_PLAN_EXPIRY_DATE.toString()))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.toString()))
            .andExpect(jsonPath("$.websiteLink").value(DEFAULT_WEBSITE_LINK))
            .andExpect(jsonPath("$.createdDate").value(DEFAULT_CREATED_DATE.toString()))
            .andExpect(jsonPath("$.lastModifiedDate").value(DEFAULT_LAST_MODIFIED_DATE.toString()))
            .andExpect(jsonPath("$.createdBy").value(DEFAULT_CREATED_BY))
            .andExpect(jsonPath("$.lastModifiedBy").value(DEFAULT_LAST_MODIFIED_BY))
            .andExpect(jsonPath("$.isDeleted").value(DEFAULT_IS_DELETED.booleanValue()));
    }

    @Test
    @Transactional
    void getNonExistingRoom() throws Exception {
        // Get the room
        restRoomMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewRoom() throws Exception {
        // Initialize the database
        roomRepository.saveAndFlush(room);

        int databaseSizeBeforeUpdate = roomRepository.findAll().size();

        // Update the room
        Room updatedRoom = roomRepository.findById(room.getId()).get();
        // Disconnect from session so that the updates on updatedRoom are not directly saved in db
        em.detach(updatedRoom);
        updatedRoom
            .name(UPDATED_NAME)
            .logoImageUrl(UPDATED_LOGO_IMAGE_URL)
            .pincode(UPDATED_PINCODE)
            .latitude(UPDATED_LATITUDE)
            .longitude(UPDATED_LONGITUDE)
            .planExpiryDate(UPDATED_PLAN_EXPIRY_DATE)
            .status(UPDATED_STATUS)
            .websiteLink(UPDATED_WEBSITE_LINK)
            .createdDate(UPDATED_CREATED_DATE)
            .lastModifiedDate(UPDATED_LAST_MODIFIED_DATE)
            .createdBy(UPDATED_CREATED_BY)
            .lastModifiedBy(UPDATED_LAST_MODIFIED_BY)
            .isDeleted(UPDATED_IS_DELETED);

        restRoomMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedRoom.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedRoom))
            )
            .andExpect(status().isOk());

        // Validate the Room in the database
        List<Room> roomList = roomRepository.findAll();
        assertThat(roomList).hasSize(databaseSizeBeforeUpdate);
        Room testRoom = roomList.get(roomList.size() - 1);
        assertThat(testRoom.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testRoom.getLogoImageUrl()).isEqualTo(UPDATED_LOGO_IMAGE_URL);
        assertThat(testRoom.getPincode()).isEqualTo(UPDATED_PINCODE);
        assertThat(testRoom.getLatitude()).isEqualTo(UPDATED_LATITUDE);
        assertThat(testRoom.getLongitude()).isEqualTo(UPDATED_LONGITUDE);
        assertThat(testRoom.getPlanExpiryDate()).isEqualTo(UPDATED_PLAN_EXPIRY_DATE);
        assertThat(testRoom.getStatus()).isEqualTo(UPDATED_STATUS);
        assertThat(testRoom.getWebsiteLink()).isEqualTo(UPDATED_WEBSITE_LINK);
        assertThat(testRoom.getCreatedDate()).isEqualTo(UPDATED_CREATED_DATE);
        assertThat(testRoom.getLastModifiedDate()).isEqualTo(UPDATED_LAST_MODIFIED_DATE);
        assertThat(testRoom.getCreatedBy()).isEqualTo(UPDATED_CREATED_BY);
        assertThat(testRoom.getLastModifiedBy()).isEqualTo(UPDATED_LAST_MODIFIED_BY);
        assertThat(testRoom.getIsDeleted()).isEqualTo(UPDATED_IS_DELETED);
    }

    @Test
    @Transactional
    void putNonExistingRoom() throws Exception {
        int databaseSizeBeforeUpdate = roomRepository.findAll().size();
        room.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restRoomMockMvc
            .perform(
                put(ENTITY_API_URL_ID, room.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(room))
            )
            .andExpect(status().isBadRequest());

        // Validate the Room in the database
        List<Room> roomList = roomRepository.findAll();
        assertThat(roomList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchRoom() throws Exception {
        int databaseSizeBeforeUpdate = roomRepository.findAll().size();
        room.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restRoomMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(room))
            )
            .andExpect(status().isBadRequest());

        // Validate the Room in the database
        List<Room> roomList = roomRepository.findAll();
        assertThat(roomList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamRoom() throws Exception {
        int databaseSizeBeforeUpdate = roomRepository.findAll().size();
        room.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restRoomMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(room)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Room in the database
        List<Room> roomList = roomRepository.findAll();
        assertThat(roomList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateRoomWithPatch() throws Exception {
        // Initialize the database
        roomRepository.saveAndFlush(room);

        int databaseSizeBeforeUpdate = roomRepository.findAll().size();

        // Update the room using partial update
        Room partialUpdatedRoom = new Room();
        partialUpdatedRoom.setId(room.getId());

        partialUpdatedRoom
            .logoImageUrl(UPDATED_LOGO_IMAGE_URL)
            .pincode(UPDATED_PINCODE)
            .latitude(UPDATED_LATITUDE)
            .planExpiryDate(UPDATED_PLAN_EXPIRY_DATE)
            .createdDate(UPDATED_CREATED_DATE);

        restRoomMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedRoom.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedRoom))
            )
            .andExpect(status().isOk());

        // Validate the Room in the database
        List<Room> roomList = roomRepository.findAll();
        assertThat(roomList).hasSize(databaseSizeBeforeUpdate);
        Room testRoom = roomList.get(roomList.size() - 1);
        assertThat(testRoom.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testRoom.getLogoImageUrl()).isEqualTo(UPDATED_LOGO_IMAGE_URL);
        assertThat(testRoom.getPincode()).isEqualTo(UPDATED_PINCODE);
        assertThat(testRoom.getLatitude()).isEqualTo(UPDATED_LATITUDE);
        assertThat(testRoom.getLongitude()).isEqualTo(DEFAULT_LONGITUDE);
        assertThat(testRoom.getPlanExpiryDate()).isEqualTo(UPDATED_PLAN_EXPIRY_DATE);
        assertThat(testRoom.getStatus()).isEqualTo(DEFAULT_STATUS);
        assertThat(testRoom.getWebsiteLink()).isEqualTo(DEFAULT_WEBSITE_LINK);
        assertThat(testRoom.getCreatedDate()).isEqualTo(UPDATED_CREATED_DATE);
        assertThat(testRoom.getLastModifiedDate()).isEqualTo(DEFAULT_LAST_MODIFIED_DATE);
        assertThat(testRoom.getCreatedBy()).isEqualTo(DEFAULT_CREATED_BY);
        assertThat(testRoom.getLastModifiedBy()).isEqualTo(DEFAULT_LAST_MODIFIED_BY);
        assertThat(testRoom.getIsDeleted()).isEqualTo(DEFAULT_IS_DELETED);
    }

    @Test
    @Transactional
    void fullUpdateRoomWithPatch() throws Exception {
        // Initialize the database
        roomRepository.saveAndFlush(room);

        int databaseSizeBeforeUpdate = roomRepository.findAll().size();

        // Update the room using partial update
        Room partialUpdatedRoom = new Room();
        partialUpdatedRoom.setId(room.getId());

        partialUpdatedRoom
            .name(UPDATED_NAME)
            .logoImageUrl(UPDATED_LOGO_IMAGE_URL)
            .pincode(UPDATED_PINCODE)
            .latitude(UPDATED_LATITUDE)
            .longitude(UPDATED_LONGITUDE)
            .planExpiryDate(UPDATED_PLAN_EXPIRY_DATE)
            .status(UPDATED_STATUS)
            .websiteLink(UPDATED_WEBSITE_LINK)
            .createdDate(UPDATED_CREATED_DATE)
            .lastModifiedDate(UPDATED_LAST_MODIFIED_DATE)
            .createdBy(UPDATED_CREATED_BY)
            .lastModifiedBy(UPDATED_LAST_MODIFIED_BY)
            .isDeleted(UPDATED_IS_DELETED);

        restRoomMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedRoom.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedRoom))
            )
            .andExpect(status().isOk());

        // Validate the Room in the database
        List<Room> roomList = roomRepository.findAll();
        assertThat(roomList).hasSize(databaseSizeBeforeUpdate);
        Room testRoom = roomList.get(roomList.size() - 1);
        assertThat(testRoom.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testRoom.getLogoImageUrl()).isEqualTo(UPDATED_LOGO_IMAGE_URL);
        assertThat(testRoom.getPincode()).isEqualTo(UPDATED_PINCODE);
        assertThat(testRoom.getLatitude()).isEqualTo(UPDATED_LATITUDE);
        assertThat(testRoom.getLongitude()).isEqualTo(UPDATED_LONGITUDE);
        assertThat(testRoom.getPlanExpiryDate()).isEqualTo(UPDATED_PLAN_EXPIRY_DATE);
        assertThat(testRoom.getStatus()).isEqualTo(UPDATED_STATUS);
        assertThat(testRoom.getWebsiteLink()).isEqualTo(UPDATED_WEBSITE_LINK);
        assertThat(testRoom.getCreatedDate()).isEqualTo(UPDATED_CREATED_DATE);
        assertThat(testRoom.getLastModifiedDate()).isEqualTo(UPDATED_LAST_MODIFIED_DATE);
        assertThat(testRoom.getCreatedBy()).isEqualTo(UPDATED_CREATED_BY);
        assertThat(testRoom.getLastModifiedBy()).isEqualTo(UPDATED_LAST_MODIFIED_BY);
        assertThat(testRoom.getIsDeleted()).isEqualTo(UPDATED_IS_DELETED);
    }

    @Test
    @Transactional
    void patchNonExistingRoom() throws Exception {
        int databaseSizeBeforeUpdate = roomRepository.findAll().size();
        room.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restRoomMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, room.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(room))
            )
            .andExpect(status().isBadRequest());

        // Validate the Room in the database
        List<Room> roomList = roomRepository.findAll();
        assertThat(roomList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchRoom() throws Exception {
        int databaseSizeBeforeUpdate = roomRepository.findAll().size();
        room.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restRoomMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(room))
            )
            .andExpect(status().isBadRequest());

        // Validate the Room in the database
        List<Room> roomList = roomRepository.findAll();
        assertThat(roomList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamRoom() throws Exception {
        int databaseSizeBeforeUpdate = roomRepository.findAll().size();
        room.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restRoomMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(room)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Room in the database
        List<Room> roomList = roomRepository.findAll();
        assertThat(roomList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteRoom() throws Exception {
        // Initialize the database
        roomRepository.saveAndFlush(room);

        int databaseSizeBeforeDelete = roomRepository.findAll().size();

        // Delete the room
        restRoomMockMvc
            .perform(delete(ENTITY_API_URL_ID, room.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Room> roomList = roomRepository.findAll();
        assertThat(roomList).hasSize(databaseSizeBeforeDelete - 1);
    }
}

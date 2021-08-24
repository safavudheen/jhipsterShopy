package com.busifrog.web.rest;

import com.busifrog.domain.UserVisit;
import com.busifrog.repository.UserVisitRepository;
import com.busifrog.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.busifrog.domain.UserVisit}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class UserVisitResource {

    private final Logger log = LoggerFactory.getLogger(UserVisitResource.class);

    private static final String ENTITY_NAME = "userVisit";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final UserVisitRepository userVisitRepository;

    public UserVisitResource(UserVisitRepository userVisitRepository) {
        this.userVisitRepository = userVisitRepository;
    }

    /**
     * {@code POST  /user-visits} : Create a new userVisit.
     *
     * @param userVisit the userVisit to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new userVisit, or with status {@code 400 (Bad Request)} if the userVisit has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/user-visits")
    public ResponseEntity<UserVisit> createUserVisit(@RequestBody UserVisit userVisit) throws URISyntaxException {
        log.debug("REST request to save UserVisit : {}", userVisit);
        if (userVisit.getId() != null) {
            throw new BadRequestAlertException("A new userVisit cannot already have an ID", ENTITY_NAME, "idexists");
        }
        UserVisit result = userVisitRepository.save(userVisit);
        return ResponseEntity
            .created(new URI("/api/user-visits/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /user-visits/:id} : Updates an existing userVisit.
     *
     * @param id the id of the userVisit to save.
     * @param userVisit the userVisit to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated userVisit,
     * or with status {@code 400 (Bad Request)} if the userVisit is not valid,
     * or with status {@code 500 (Internal Server Error)} if the userVisit couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/user-visits/{id}")
    public ResponseEntity<UserVisit> updateUserVisit(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody UserVisit userVisit
    ) throws URISyntaxException {
        log.debug("REST request to update UserVisit : {}, {}", id, userVisit);
        if (userVisit.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, userVisit.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!userVisitRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        UserVisit result = userVisitRepository.save(userVisit);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, userVisit.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /user-visits/:id} : Partial updates given fields of an existing userVisit, field will ignore if it is null
     *
     * @param id the id of the userVisit to save.
     * @param userVisit the userVisit to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated userVisit,
     * or with status {@code 400 (Bad Request)} if the userVisit is not valid,
     * or with status {@code 404 (Not Found)} if the userVisit is not found,
     * or with status {@code 500 (Internal Server Error)} if the userVisit couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/user-visits/{id}", consumes = "application/merge-patch+json")
    public ResponseEntity<UserVisit> partialUpdateUserVisit(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody UserVisit userVisit
    ) throws URISyntaxException {
        log.debug("REST request to partial update UserVisit partially : {}, {}", id, userVisit);
        if (userVisit.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, userVisit.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!userVisitRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<UserVisit> result = userVisitRepository
            .findById(userVisit.getId())
            .map(
                existingUserVisit -> {
                    if (userVisit.getStartDate() != null) {
                        existingUserVisit.setStartDate(userVisit.getStartDate());
                    }
                    if (userVisit.getEndDate() != null) {
                        existingUserVisit.setEndDate(userVisit.getEndDate());
                    }
                    if (userVisit.getCreatedDate() != null) {
                        existingUserVisit.setCreatedDate(userVisit.getCreatedDate());
                    }
                    if (userVisit.getLastModifiedDate() != null) {
                        existingUserVisit.setLastModifiedDate(userVisit.getLastModifiedDate());
                    }
                    if (userVisit.getCreatedBy() != null) {
                        existingUserVisit.setCreatedBy(userVisit.getCreatedBy());
                    }
                    if (userVisit.getLastModifiedBy() != null) {
                        existingUserVisit.setLastModifiedBy(userVisit.getLastModifiedBy());
                    }
                    if (userVisit.getIsDeleted() != null) {
                        existingUserVisit.setIsDeleted(userVisit.getIsDeleted());
                    }

                    return existingUserVisit;
                }
            )
            .map(userVisitRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, userVisit.getId().toString())
        );
    }

    /**
     * {@code GET  /user-visits} : get all the userVisits.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of userVisits in body.
     */
    @GetMapping("/user-visits")
    public ResponseEntity<List<UserVisit>> getAllUserVisits(Pageable pageable) {
        log.debug("REST request to get a page of UserVisits");
        Page<UserVisit> page = userVisitRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /user-visits/:id} : get the "id" userVisit.
     *
     * @param id the id of the userVisit to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the userVisit, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/user-visits/{id}")
    public ResponseEntity<UserVisit> getUserVisit(@PathVariable Long id) {
        log.debug("REST request to get UserVisit : {}", id);
        Optional<UserVisit> userVisit = userVisitRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(userVisit);
    }

    /**
     * {@code DELETE  /user-visits/:id} : delete the "id" userVisit.
     *
     * @param id the id of the userVisit to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/user-visits/{id}")
    public ResponseEntity<Void> deleteUserVisit(@PathVariable Long id) {
        log.debug("REST request to delete UserVisit : {}", id);
        userVisitRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}

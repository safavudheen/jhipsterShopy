package com.busifrog.web.rest;

import com.busifrog.domain.Contact;
import com.busifrog.repository.ContactRepository;
import com.busifrog.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.busifrog.domain.Contact}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ContactResource {

    private final Logger log = LoggerFactory.getLogger(ContactResource.class);

    private static final String ENTITY_NAME = "contact";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ContactRepository contactRepository;

    public ContactResource(ContactRepository contactRepository) {
        this.contactRepository = contactRepository;
    }

    /**
     * {@code POST  /contacts} : Create a new contact.
     *
     * @param contact the contact to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new contact, or with status {@code 400 (Bad Request)} if the contact has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/contacts")
    public ResponseEntity<Contact> createContact(@RequestBody Contact contact) throws URISyntaxException {
        log.debug("REST request to save Contact : {}", contact);
        if (contact.getId() != null) {
            throw new BadRequestAlertException("A new contact cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Contact result = contactRepository.save(contact);
        return ResponseEntity
            .created(new URI("/api/contacts/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /contacts/:id} : Updates an existing contact.
     *
     * @param id the id of the contact to save.
     * @param contact the contact to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated contact,
     * or with status {@code 400 (Bad Request)} if the contact is not valid,
     * or with status {@code 500 (Internal Server Error)} if the contact couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/contacts/{id}")
    public ResponseEntity<Contact> updateContact(@PathVariable(value = "id", required = false) final Long id, @RequestBody Contact contact)
        throws URISyntaxException {
        log.debug("REST request to update Contact : {}, {}", id, contact);
        if (contact.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, contact.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!contactRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Contact result = contactRepository.save(contact);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, contact.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /contacts/:id} : Partial updates given fields of an existing contact, field will ignore if it is null
     *
     * @param id the id of the contact to save.
     * @param contact the contact to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated contact,
     * or with status {@code 400 (Bad Request)} if the contact is not valid,
     * or with status {@code 404 (Not Found)} if the contact is not found,
     * or with status {@code 500 (Internal Server Error)} if the contact couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/contacts/{id}", consumes = "application/merge-patch+json")
    public ResponseEntity<Contact> partialUpdateContact(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody Contact contact
    ) throws URISyntaxException {
        log.debug("REST request to partial update Contact partially : {}, {}", id, contact);
        if (contact.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, contact.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!contactRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Contact> result = contactRepository
            .findById(contact.getId())
            .map(
                existingContact -> {
                    if (contact.getFirstPersonName() != null) {
                        existingContact.setFirstPersonName(contact.getFirstPersonName());
                    }
                    if (contact.getImageUrl() != null) {
                        existingContact.setImageUrl(contact.getImageUrl());
                    }
                    if (contact.getWhatsappNumber() != null) {
                        existingContact.setWhatsappNumber(contact.getWhatsappNumber());
                    }
                    if (contact.getLandlineNumber() != null) {
                        existingContact.setLandlineNumber(contact.getLandlineNumber());
                    }
                    if (contact.getEmail() != null) {
                        existingContact.setEmail(contact.getEmail());
                    }
                    if (contact.getAddressLine1() != null) {
                        existingContact.setAddressLine1(contact.getAddressLine1());
                    }
                    if (contact.getAddressLine2() != null) {
                        existingContact.setAddressLine2(contact.getAddressLine2());
                    }
                    if (contact.getPincode() != null) {
                        existingContact.setPincode(contact.getPincode());
                    }
                    if (contact.getLatitude() != null) {
                        existingContact.setLatitude(contact.getLatitude());
                    }
                    if (contact.getLongitude() != null) {
                        existingContact.setLongitude(contact.getLongitude());
                    }
                    if (contact.getCreatedDate() != null) {
                        existingContact.setCreatedDate(contact.getCreatedDate());
                    }
                    if (contact.getLastModifiedDate() != null) {
                        existingContact.setLastModifiedDate(contact.getLastModifiedDate());
                    }
                    if (contact.getCreatedBy() != null) {
                        existingContact.setCreatedBy(contact.getCreatedBy());
                    }
                    if (contact.getLastModifiedBy() != null) {
                        existingContact.setLastModifiedBy(contact.getLastModifiedBy());
                    }
                    if (contact.getIsDeleted() != null) {
                        existingContact.setIsDeleted(contact.getIsDeleted());
                    }

                    return existingContact;
                }
            )
            .map(contactRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, contact.getId().toString())
        );
    }

    /**
     * {@code GET  /contacts} : get all the contacts.
     *
     * @param filter the filter of the request.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of contacts in body.
     */
    @GetMapping("/contacts")
    public List<Contact> getAllContacts(@RequestParam(required = false) String filter) {
        if ("room-is-null".equals(filter)) {
            log.debug("REST request to get all Contacts where room is null");
            return StreamSupport
                .stream(contactRepository.findAll().spliterator(), false)
                .filter(contact -> contact.getRoom() == null)
                .collect(Collectors.toList());
        }
        log.debug("REST request to get all Contacts");
        return contactRepository.findAll();
    }

    /**
     * {@code GET  /contacts/:id} : get the "id" contact.
     *
     * @param id the id of the contact to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the contact, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/contacts/{id}")
    public ResponseEntity<Contact> getContact(@PathVariable Long id) {
        log.debug("REST request to get Contact : {}", id);
        Optional<Contact> contact = contactRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(contact);
    }

    /**
     * {@code DELETE  /contacts/:id} : delete the "id" contact.
     *
     * @param id the id of the contact to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/contacts/{id}")
    public ResponseEntity<Void> deleteContact(@PathVariable Long id) {
        log.debug("REST request to delete Contact : {}", id);
        contactRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}

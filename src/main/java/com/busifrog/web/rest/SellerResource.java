package com.busifrog.web.rest;

import com.busifrog.domain.Seller;
import com.busifrog.repository.SellerRepository;
import com.busifrog.security.AuthoritiesConstants;
import com.busifrog.security.SecurityUtils;
import com.busifrog.service.UserService;
import com.busifrog.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.busifrog.domain.Seller}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class SellerResource {

    private final Logger log = LoggerFactory.getLogger(SellerResource.class);

    private static final String ENTITY_NAME = "seller";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final SellerRepository sellerRepository;

    private final UserService userService;

    public SellerResource(SellerRepository sellerRepository, UserService userService) {
        this.sellerRepository = sellerRepository;
        this.userService = userService;
    }

    /**
     * {@code POST  /sellers} : Create a new seller.
     *
     * @param seller the seller to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new seller, or with status {@code 400 (Bad Request)} if the seller has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/sellers")
    public ResponseEntity<Seller> createSeller(@Valid @RequestBody Seller seller) throws URISyntaxException {
        log.debug("REST request to save Seller : {}", seller);
        if (seller.getId() != null) {
            throw new BadRequestAlertException("A new seller cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Seller result = sellerRepository.save(seller);
        return ResponseEntity
            .created(new URI("/api/sellers/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /sellers/:id} : Updates an existing seller.
     *
     * @param id the id of the seller to save.
     * @param seller the seller to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated seller,
     * or with status {@code 400 (Bad Request)} if the seller is not valid,
     * or with status {@code 500 (Internal Server Error)} if the seller couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/sellers/{id}")
    public ResponseEntity<Seller> updateSeller(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody Seller seller
    ) throws URISyntaxException {
        log.debug("REST request to update Seller : {}, {}", id, seller);
        if (seller.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, seller.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!sellerRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Seller result = sellerRepository.save(seller);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, seller.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /sellers/:id} : Partial updates given fields of an existing seller, field will ignore if it is null
     *
     * @param id the id of the seller to save.
     * @param seller the seller to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated seller,
     * or with status {@code 400 (Bad Request)} if the seller is not valid,
     * or with status {@code 404 (Not Found)} if the seller is not found,
     * or with status {@code 500 (Internal Server Error)} if the seller couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/sellers/{id}", consumes = "application/merge-patch+json")
    public ResponseEntity<Seller> partialUpdateSeller(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody Seller seller
    ) throws URISyntaxException {
        log.debug("REST request to partial update Seller partially : {}, {}", id, seller);
        if (seller.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, seller.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!sellerRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Seller> result = sellerRepository
            .findById(seller.getId())
            .map(
                existingSeller -> {
                    if (seller.getName() != null) {
                        existingSeller.setName(seller.getName());
                    }
                    if (seller.getLogoImageUrl() != null) {
                        existingSeller.setLogoImageUrl(seller.getLogoImageUrl());
                    }
                    if (seller.getPincode() != null) {
                        existingSeller.setPincode(seller.getPincode());
                    }
                    if (seller.getLatitude() != null) {
                        existingSeller.setLatitude(seller.getLatitude());
                    }
                    if (seller.getLongitude() != null) {
                        existingSeller.setLongitude(seller.getLongitude());
                    }
                    if (seller.getPlanExpiryDate() != null) {
                        existingSeller.setPlanExpiryDate(seller.getPlanExpiryDate());
                    }
                    if (seller.getStatus() != null) {
                        existingSeller.setStatus(seller.getStatus());
                    }
                    if (seller.getWebsiteLink() != null) {
                        existingSeller.setWebsiteLink(seller.getWebsiteLink());
                    }
                    if (seller.getCreatedDate() != null) {
                        existingSeller.setCreatedDate(seller.getCreatedDate());
                    }
                    if (seller.getLastModifiedDate() != null) {
                        existingSeller.setLastModifiedDate(seller.getLastModifiedDate());
                    }
                    if (seller.getCreatedBy() != null) {
                        existingSeller.setCreatedBy(seller.getCreatedBy());
                    }
                    if (seller.getLastModifiedBy() != null) {
                        existingSeller.setLastModifiedBy(seller.getLastModifiedBy());
                    }
                    if (seller.getIsDeleted() != null) {
                        existingSeller.setIsDeleted(seller.getIsDeleted());
                    }

                    return existingSeller;
                }
            )
            .map(sellerRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, seller.getId().toString())
        );
    }

    /**
     * {@code GET  /sellers} : get all the sellers.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of sellers in body.
     */
    @GetMapping("/sellers")
    public List<Seller> getAllSellers() {
        log.debug("REST request to get all Sellers");
        if (SecurityUtils.hasCurrentUserThisAuthority(AuthoritiesConstants.SELLER_ADMIN)) {
            return sellerRepository.findAllById(userService.getCurrentUser().getSellerId());
        }
        return sellerRepository.findAll();
    }

    @GetMapping("/category/{categoryId}/sellers")
    public List<Seller> getAllSellersByCategory(@PathVariable Long categoryId) {
        return sellerRepository.findAllSellersByCategory(categoryId);
    }

    /**
     * {@code GET  /sellers/:id} : get the "id" seller.
     *
     * @param id the id of the seller to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the seller, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/sellers/{id}")
    public ResponseEntity<Seller> getSeller(@PathVariable Long id) {
        log.debug("REST request to get Seller : {}", id);
        Optional<Seller> seller = sellerRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(seller);
    }

    /**
     * {@code DELETE  /sellers/:id} : delete the "id" seller.
     *
     * @param id the id of the seller to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/sellers/{id}")
    public ResponseEntity<Void> deleteSeller(@PathVariable Long id) {
        log.debug("REST request to delete Seller : {}", id);
        sellerRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}

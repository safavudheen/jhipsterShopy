package com.busifrog.web.rest;

import com.busifrog.domain.SellerPlan;
import com.busifrog.repository.SellerPlanRepository;
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
 * REST controller for managing {@link com.busifrog.domain.SellerPlan}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class SellerPlanResource {

    private final Logger log = LoggerFactory.getLogger(SellerPlanResource.class);

    private static final String ENTITY_NAME = "sellerPlan";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final SellerPlanRepository sellerPlanRepository;

    public SellerPlanResource(SellerPlanRepository sellerPlanRepository) {
        this.sellerPlanRepository = sellerPlanRepository;
    }

    /**
     * {@code POST  /seller-plans} : Create a new sellerPlan.
     *
     * @param sellerPlan the sellerPlan to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new sellerPlan, or with status {@code 400 (Bad Request)} if the sellerPlan has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/seller-plans")
    public ResponseEntity<SellerPlan> createSellerPlan(@Valid @RequestBody SellerPlan sellerPlan) throws URISyntaxException {
        log.debug("REST request to save SellerPlan : {}", sellerPlan);
        if (sellerPlan.getId() != null) {
            throw new BadRequestAlertException("A new sellerPlan cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SellerPlan result = sellerPlanRepository.save(sellerPlan);
        return ResponseEntity
            .created(new URI("/api/seller-plans/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /seller-plans/:id} : Updates an existing sellerPlan.
     *
     * @param id the id of the sellerPlan to save.
     * @param sellerPlan the sellerPlan to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated sellerPlan,
     * or with status {@code 400 (Bad Request)} if the sellerPlan is not valid,
     * or with status {@code 500 (Internal Server Error)} if the sellerPlan couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/seller-plans/{id}")
    public ResponseEntity<SellerPlan> updateSellerPlan(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody SellerPlan sellerPlan
    ) throws URISyntaxException {
        log.debug("REST request to update SellerPlan : {}, {}", id, sellerPlan);
        if (sellerPlan.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, sellerPlan.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!sellerPlanRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        SellerPlan result = sellerPlanRepository.save(sellerPlan);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, sellerPlan.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /seller-plans/:id} : Partial updates given fields of an existing sellerPlan, field will ignore if it is null
     *
     * @param id the id of the sellerPlan to save.
     * @param sellerPlan the sellerPlan to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated sellerPlan,
     * or with status {@code 400 (Bad Request)} if the sellerPlan is not valid,
     * or with status {@code 404 (Not Found)} if the sellerPlan is not found,
     * or with status {@code 500 (Internal Server Error)} if the sellerPlan couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/seller-plans/{id}", consumes = "application/merge-patch+json")
    public ResponseEntity<SellerPlan> partialUpdateSellerPlan(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody SellerPlan sellerPlan
    ) throws URISyntaxException {
        log.debug("REST request to partial update SellerPlan partially : {}, {}", id, sellerPlan);
        if (sellerPlan.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, sellerPlan.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!sellerPlanRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<SellerPlan> result = sellerPlanRepository
            .findById(sellerPlan.getId())
            .map(
                existingSellerPlan -> {
                    if (sellerPlan.getName() != null) {
                        existingSellerPlan.setName(sellerPlan.getName());
                    }
                    if (sellerPlan.getProducts() != null) {
                        existingSellerPlan.setProducts(sellerPlan.getProducts());
                    }
                    if (sellerPlan.getServices() != null) {
                        existingSellerPlan.setServices(sellerPlan.getServices());
                    }
                    if (sellerPlan.getMonthlyPrice() != null) {
                        existingSellerPlan.setMonthlyPrice(sellerPlan.getMonthlyPrice());
                    }
                    if (sellerPlan.getAnnualPrice() != null) {
                        existingSellerPlan.setAnnualPrice(sellerPlan.getAnnualPrice());
                    }
                    if (sellerPlan.getDiscount() != null) {
                        existingSellerPlan.setDiscount(sellerPlan.getDiscount());
                    }
                    if (sellerPlan.getCreatedDate() != null) {
                        existingSellerPlan.setCreatedDate(sellerPlan.getCreatedDate());
                    }
                    if (sellerPlan.getLastModifiedDate() != null) {
                        existingSellerPlan.setLastModifiedDate(sellerPlan.getLastModifiedDate());
                    }
                    if (sellerPlan.getCreatedBy() != null) {
                        existingSellerPlan.setCreatedBy(sellerPlan.getCreatedBy());
                    }
                    if (sellerPlan.getLastModifiedBy() != null) {
                        existingSellerPlan.setLastModifiedBy(sellerPlan.getLastModifiedBy());
                    }
                    if (sellerPlan.getIsDeleted() != null) {
                        existingSellerPlan.setIsDeleted(sellerPlan.getIsDeleted());
                    }

                    return existingSellerPlan;
                }
            )
            .map(sellerPlanRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, sellerPlan.getId().toString())
        );
    }

    /**
     * {@code GET  /seller-plans} : get all the sellerPlans.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of sellerPlans in body.
     */
    @GetMapping("/seller-plans")
    public List<SellerPlan> getAllSellerPlans() {
        log.debug("REST request to get all SellerPlans");
        return sellerPlanRepository.findAll();
    }

    /**
     * {@code GET  /seller-plans/:id} : get the "id" sellerPlan.
     *
     * @param id the id of the sellerPlan to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the sellerPlan, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/seller-plans/{id}")
    public ResponseEntity<SellerPlan> getSellerPlan(@PathVariable Long id) {
        log.debug("REST request to get SellerPlan : {}", id);
        Optional<SellerPlan> sellerPlan = sellerPlanRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(sellerPlan);
    }

    /**
     * {@code DELETE  /seller-plans/:id} : delete the "id" sellerPlan.
     *
     * @param id the id of the sellerPlan to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/seller-plans/{id}")
    public ResponseEntity<Void> deleteSellerPlan(@PathVariable Long id) {
        log.debug("REST request to delete SellerPlan : {}", id);
        sellerPlanRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}

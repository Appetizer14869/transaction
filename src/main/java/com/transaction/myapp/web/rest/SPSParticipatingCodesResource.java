package com.transaction.myapp.web.rest;

import com.transaction.myapp.domain.SPSParticipatingCodes;
import com.transaction.myapp.repository.SPSParticipatingCodesRepository;
import com.transaction.myapp.web.rest.errors.BadRequestAlertException;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.transaction.myapp.domain.SPSParticipatingCodes}.
 */
@RestController
@RequestMapping("/api/sps-participating-codes")
@Transactional
public class SPSParticipatingCodesResource {

    private static final Logger LOG = LoggerFactory.getLogger(SPSParticipatingCodesResource.class);

    private static final String ENTITY_NAME = "transactionSpsParticipatingCodes";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final SPSParticipatingCodesRepository sPSParticipatingCodesRepository;

    public SPSParticipatingCodesResource(SPSParticipatingCodesRepository sPSParticipatingCodesRepository) {
        this.sPSParticipatingCodesRepository = sPSParticipatingCodesRepository;
    }

    /**
     * {@code POST  /sps-participating-codes} : Create a new sPSParticipatingCodes.
     *
     * @param sPSParticipatingCodes the sPSParticipatingCodes to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new sPSParticipatingCodes, or with status {@code 400 (Bad Request)} if the sPSParticipatingCodes has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<SPSParticipatingCodes> createSPSParticipatingCodes(
        @Valid @RequestBody SPSParticipatingCodes sPSParticipatingCodes
    ) throws URISyntaxException {
        LOG.debug("REST request to save SPSParticipatingCodes : {}", sPSParticipatingCodes);
        if (sPSParticipatingCodes.getId() != null) {
            throw new BadRequestAlertException("A new sPSParticipatingCodes cannot already have an ID", ENTITY_NAME, "idexists");
        }
        sPSParticipatingCodes = sPSParticipatingCodesRepository.save(sPSParticipatingCodes);
        return ResponseEntity.created(new URI("/api/sps-participating-codes/" + sPSParticipatingCodes.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, sPSParticipatingCodes.getId().toString()))
            .body(sPSParticipatingCodes);
    }

    /**
     * {@code PUT  /sps-participating-codes/:id} : Updates an existing sPSParticipatingCodes.
     *
     * @param id the id of the sPSParticipatingCodes to save.
     * @param sPSParticipatingCodes the sPSParticipatingCodes to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated sPSParticipatingCodes,
     * or with status {@code 400 (Bad Request)} if the sPSParticipatingCodes is not valid,
     * or with status {@code 500 (Internal Server Error)} if the sPSParticipatingCodes couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<SPSParticipatingCodes> updateSPSParticipatingCodes(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody SPSParticipatingCodes sPSParticipatingCodes
    ) throws URISyntaxException {
        LOG.debug("REST request to update SPSParticipatingCodes : {}, {}", id, sPSParticipatingCodes);
        if (sPSParticipatingCodes.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, sPSParticipatingCodes.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!sPSParticipatingCodesRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        sPSParticipatingCodes = sPSParticipatingCodesRepository.save(sPSParticipatingCodes);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, sPSParticipatingCodes.getId().toString()))
            .body(sPSParticipatingCodes);
    }

    /**
     * {@code PATCH  /sps-participating-codes/:id} : Partial updates given fields of an existing sPSParticipatingCodes, field will ignore if it is null
     *
     * @param id the id of the sPSParticipatingCodes to save.
     * @param sPSParticipatingCodes the sPSParticipatingCodes to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated sPSParticipatingCodes,
     * or with status {@code 400 (Bad Request)} if the sPSParticipatingCodes is not valid,
     * or with status {@code 404 (Not Found)} if the sPSParticipatingCodes is not found,
     * or with status {@code 500 (Internal Server Error)} if the sPSParticipatingCodes couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<SPSParticipatingCodes> partialUpdateSPSParticipatingCodes(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody SPSParticipatingCodes sPSParticipatingCodes
    ) throws URISyntaxException {
        LOG.debug("REST request to partial update SPSParticipatingCodes partially : {}, {}", id, sPSParticipatingCodes);
        if (sPSParticipatingCodes.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, sPSParticipatingCodes.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!sPSParticipatingCodesRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<SPSParticipatingCodes> result = sPSParticipatingCodesRepository
            .findById(sPSParticipatingCodes.getId())
            .map(existingSPSParticipatingCodes -> {
                if (sPSParticipatingCodes.getBiccode() != null) {
                    existingSPSParticipatingCodes.setBiccode(sPSParticipatingCodes.getBiccode());
                }
                if (sPSParticipatingCodes.getBicname() != null) {
                    existingSPSParticipatingCodes.setBicname(sPSParticipatingCodes.getBicname());
                }
                if (sPSParticipatingCodes.getBicstatus() != null) {
                    existingSPSParticipatingCodes.setBicstatus(sPSParticipatingCodes.getBicstatus());
                }

                return existingSPSParticipatingCodes;
            })
            .map(sPSParticipatingCodesRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, sPSParticipatingCodes.getId().toString())
        );
    }

    /**
     * {@code GET  /sps-participating-codes} : get all the sPSParticipatingCodes.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of sPSParticipatingCodes in body.
     */
    @GetMapping("")
    public List<SPSParticipatingCodes> getAllSPSParticipatingCodes() {
        LOG.debug("REST request to get all SPSParticipatingCodes");
        return sPSParticipatingCodesRepository.findAll();
    }

    /**
     * {@code GET  /sps-participating-codes/:id} : get the "id" sPSParticipatingCodes.
     *
     * @param id the id of the sPSParticipatingCodes to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the sPSParticipatingCodes, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<SPSParticipatingCodes> getSPSParticipatingCodes(@PathVariable("id") Long id) {
        LOG.debug("REST request to get SPSParticipatingCodes : {}", id);
        Optional<SPSParticipatingCodes> sPSParticipatingCodes = sPSParticipatingCodesRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(sPSParticipatingCodes);
    }

    /**
     * {@code DELETE  /sps-participating-codes/:id} : delete the "id" sPSParticipatingCodes.
     *
     * @param id the id of the sPSParticipatingCodes to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSPSParticipatingCodes(@PathVariable("id") Long id) {
        LOG.debug("REST request to delete SPSParticipatingCodes : {}", id);
        sPSParticipatingCodesRepository.deleteById(id);
        return ResponseEntity.noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}

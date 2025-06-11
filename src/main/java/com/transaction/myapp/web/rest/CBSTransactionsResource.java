package com.transaction.myapp.web.rest;

import com.transaction.myapp.domain.CBSTransactions;
import com.transaction.myapp.repository.CBSTransactionsRepository;
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
 * REST controller for managing {@link com.transaction.myapp.domain.CBSTransactions}.
 */
@RestController
@RequestMapping("/api/cbs-transactions")
@Transactional
public class CBSTransactionsResource {

    private static final Logger LOG = LoggerFactory.getLogger(CBSTransactionsResource.class);

    private static final String ENTITY_NAME = "transactionCbsTransactions";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CBSTransactionsRepository cBSTransactionsRepository;

    public CBSTransactionsResource(CBSTransactionsRepository cBSTransactionsRepository) {
        this.cBSTransactionsRepository = cBSTransactionsRepository;
    }

    /**
     * {@code POST  /cbs-transactions} : Create a new cBSTransactions.
     *
     * @param cBSTransactions the cBSTransactions to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new cBSTransactions, or with status {@code 400 (Bad Request)} if the cBSTransactions has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<CBSTransactions> createCBSTransactions(@Valid @RequestBody CBSTransactions cBSTransactions)
        throws URISyntaxException {
        LOG.debug("REST request to save CBSTransactions : {}", cBSTransactions);
        if (cBSTransactions.getId() != null) {
            throw new BadRequestAlertException("A new cBSTransactions cannot already have an ID", ENTITY_NAME, "idexists");
        }
        cBSTransactions = cBSTransactionsRepository.save(cBSTransactions);
        return ResponseEntity.created(new URI("/api/cbs-transactions/" + cBSTransactions.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, cBSTransactions.getId().toString()))
            .body(cBSTransactions);
    }

    /**
     * {@code PUT  /cbs-transactions/:id} : Updates an existing cBSTransactions.
     *
     * @param id the id of the cBSTransactions to save.
     * @param cBSTransactions the cBSTransactions to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated cBSTransactions,
     * or with status {@code 400 (Bad Request)} if the cBSTransactions is not valid,
     * or with status {@code 500 (Internal Server Error)} if the cBSTransactions couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<CBSTransactions> updateCBSTransactions(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody CBSTransactions cBSTransactions
    ) throws URISyntaxException {
        LOG.debug("REST request to update CBSTransactions : {}, {}", id, cBSTransactions);
        if (cBSTransactions.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, cBSTransactions.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!cBSTransactionsRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        cBSTransactions = cBSTransactionsRepository.save(cBSTransactions);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, cBSTransactions.getId().toString()))
            .body(cBSTransactions);
    }

    /**
     * {@code PATCH  /cbs-transactions/:id} : Partial updates given fields of an existing cBSTransactions, field will ignore if it is null
     *
     * @param id the id of the cBSTransactions to save.
     * @param cBSTransactions the cBSTransactions to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated cBSTransactions,
     * or with status {@code 400 (Bad Request)} if the cBSTransactions is not valid,
     * or with status {@code 404 (Not Found)} if the cBSTransactions is not found,
     * or with status {@code 500 (Internal Server Error)} if the cBSTransactions couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<CBSTransactions> partialUpdateCBSTransactions(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody CBSTransactions cBSTransactions
    ) throws URISyntaxException {
        LOG.debug("REST request to partial update CBSTransactions partially : {}, {}", id, cBSTransactions);
        if (cBSTransactions.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, cBSTransactions.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!cBSTransactionsRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<CBSTransactions> result = cBSTransactionsRepository
            .findById(cBSTransactions.getId())
            .map(existingCBSTransactions -> {
                if (cBSTransactions.getMessageid() != null) {
                    existingCBSTransactions.setMessageid(cBSTransactions.getMessageid());
                }
                if (cBSTransactions.getChannelcode() != null) {
                    existingCBSTransactions.setChannelcode(cBSTransactions.getChannelcode());
                }
                if (cBSTransactions.getMessagetype() != null) {
                    existingCBSTransactions.setMessagetype(cBSTransactions.getMessagetype());
                }
                if (cBSTransactions.getTranscurrency() != null) {
                    existingCBSTransactions.setTranscurrency(cBSTransactions.getTranscurrency());
                }
                if (cBSTransactions.getDebtorsname() != null) {
                    existingCBSTransactions.setDebtorsname(cBSTransactions.getDebtorsname());
                }
                if (cBSTransactions.getDebtorsaccountid() != null) {
                    existingCBSTransactions.setDebtorsaccountid(cBSTransactions.getDebtorsaccountid());
                }
                if (cBSTransactions.getDebtorsphone() != null) {
                    existingCBSTransactions.setDebtorsphone(cBSTransactions.getDebtorsphone());
                }
                if (cBSTransactions.getCreditorsname() != null) {
                    existingCBSTransactions.setCreditorsname(cBSTransactions.getCreditorsname());
                }
                if (cBSTransactions.getCreditorsaccountid() != null) {
                    existingCBSTransactions.setCreditorsaccountid(cBSTransactions.getCreditorsaccountid());
                }
                if (cBSTransactions.getCreditorsphone() != null) {
                    existingCBSTransactions.setCreditorsphone(cBSTransactions.getCreditorsphone());
                }
                if (cBSTransactions.getNarration() != null) {
                    existingCBSTransactions.setNarration(cBSTransactions.getNarration());
                }
                if (cBSTransactions.getExternalreference() != null) {
                    existingCBSTransactions.setExternalreference(cBSTransactions.getExternalreference());
                }
                if (cBSTransactions.getCbsreference() != null) {
                    existingCBSTransactions.setCbsreference(cBSTransactions.getCbsreference());
                }
                if (cBSTransactions.getCbsstatus() != null) {
                    existingCBSTransactions.setCbsstatus(cBSTransactions.getCbsstatus());
                }
                if (cBSTransactions.getCbsstatusdesc() != null) {
                    existingCBSTransactions.setCbsstatusdesc(cBSTransactions.getCbsstatusdesc());
                }
                if (cBSTransactions.getRequestInstanttime() != null) {
                    existingCBSTransactions.setRequestInstanttime(cBSTransactions.getRequestInstanttime());
                }
                if (cBSTransactions.getRequestjson() != null) {
                    existingCBSTransactions.setRequestjson(cBSTransactions.getRequestjson());
                }
                if (cBSTransactions.getCbsrequestxml() != null) {
                    existingCBSTransactions.setCbsrequestxml(cBSTransactions.getCbsrequestxml());
                }
                if (cBSTransactions.getCbsresponsexml() != null) {
                    existingCBSTransactions.setCbsresponsexml(cBSTransactions.getCbsresponsexml());
                }
                if (cBSTransactions.getAmount() != null) {
                    existingCBSTransactions.setAmount(cBSTransactions.getAmount());
                }

                return existingCBSTransactions;
            })
            .map(cBSTransactionsRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, cBSTransactions.getId().toString())
        );
    }

    /**
     * {@code GET  /cbs-transactions} : get all the cBSTransactions.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of cBSTransactions in body.
     */
    @GetMapping("")
    public List<CBSTransactions> getAllCBSTransactions() {
        LOG.debug("REST request to get all CBSTransactions");
        return cBSTransactionsRepository.findAll();
    }

    /**
     * {@code GET  /cbs-transactions/:id} : get the "id" cBSTransactions.
     *
     * @param id the id of the cBSTransactions to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the cBSTransactions, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<CBSTransactions> getCBSTransactions(@PathVariable("id") Long id) {
        LOG.debug("REST request to get CBSTransactions : {}", id);
        Optional<CBSTransactions> cBSTransactions = cBSTransactionsRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(cBSTransactions);
    }

    /**
     * {@code DELETE  /cbs-transactions/:id} : delete the "id" cBSTransactions.
     *
     * @param id the id of the cBSTransactions to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCBSTransactions(@PathVariable("id") Long id) {
        LOG.debug("REST request to delete CBSTransactions : {}", id);
        cBSTransactionsRepository.deleteById(id);
        return ResponseEntity.noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}

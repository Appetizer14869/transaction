package com.transaction.myapp.web.rest;

import com.transaction.myapp.domain.SPSIncomingTransactions;
import com.transaction.myapp.repository.SPSIncomingTransactionsRepository;
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
 * REST controller for managing {@link com.transaction.myapp.domain.SPSIncomingTransactions}.
 */
@RestController
@RequestMapping("/api/sps-incoming-transactions")
@Transactional
public class SPSIncomingTransactionsResource {

    private static final Logger LOG = LoggerFactory.getLogger(SPSIncomingTransactionsResource.class);

    private static final String ENTITY_NAME = "transactionSpsIncomingTransactions";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final SPSIncomingTransactionsRepository sPSIncomingTransactionsRepository;

    public SPSIncomingTransactionsResource(SPSIncomingTransactionsRepository sPSIncomingTransactionsRepository) {
        this.sPSIncomingTransactionsRepository = sPSIncomingTransactionsRepository;
    }

    /**
     * {@code POST  /sps-incoming-transactions} : Create a new sPSIncomingTransactions.
     *
     * @param sPSIncomingTransactions the sPSIncomingTransactions to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new sPSIncomingTransactions, or with status {@code 400 (Bad Request)} if the sPSIncomingTransactions has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<SPSIncomingTransactions> createSPSIncomingTransactions(
        @Valid @RequestBody SPSIncomingTransactions sPSIncomingTransactions
    ) throws URISyntaxException {
        LOG.debug("REST request to save SPSIncomingTransactions : {}", sPSIncomingTransactions);
        if (sPSIncomingTransactions.getId() != null) {
            throw new BadRequestAlertException("A new sPSIncomingTransactions cannot already have an ID", ENTITY_NAME, "idexists");
        }
        sPSIncomingTransactions = sPSIncomingTransactionsRepository.save(sPSIncomingTransactions);
        return ResponseEntity.created(new URI("/api/sps-incoming-transactions/" + sPSIncomingTransactions.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, sPSIncomingTransactions.getId().toString()))
            .body(sPSIncomingTransactions);
    }

    /**
     * {@code PUT  /sps-incoming-transactions/:id} : Updates an existing sPSIncomingTransactions.
     *
     * @param id the id of the sPSIncomingTransactions to save.
     * @param sPSIncomingTransactions the sPSIncomingTransactions to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated sPSIncomingTransactions,
     * or with status {@code 400 (Bad Request)} if the sPSIncomingTransactions is not valid,
     * or with status {@code 500 (Internal Server Error)} if the sPSIncomingTransactions couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<SPSIncomingTransactions> updateSPSIncomingTransactions(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody SPSIncomingTransactions sPSIncomingTransactions
    ) throws URISyntaxException {
        LOG.debug("REST request to update SPSIncomingTransactions : {}, {}", id, sPSIncomingTransactions);
        if (sPSIncomingTransactions.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, sPSIncomingTransactions.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!sPSIncomingTransactionsRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        sPSIncomingTransactions = sPSIncomingTransactionsRepository.save(sPSIncomingTransactions);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, sPSIncomingTransactions.getId().toString()))
            .body(sPSIncomingTransactions);
    }

    /**
     * {@code PATCH  /sps-incoming-transactions/:id} : Partial updates given fields of an existing sPSIncomingTransactions, field will ignore if it is null
     *
     * @param id the id of the sPSIncomingTransactions to save.
     * @param sPSIncomingTransactions the sPSIncomingTransactions to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated sPSIncomingTransactions,
     * or with status {@code 400 (Bad Request)} if the sPSIncomingTransactions is not valid,
     * or with status {@code 404 (Not Found)} if the sPSIncomingTransactions is not found,
     * or with status {@code 500 (Internal Server Error)} if the sPSIncomingTransactions couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<SPSIncomingTransactions> partialUpdateSPSIncomingTransactions(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody SPSIncomingTransactions sPSIncomingTransactions
    ) throws URISyntaxException {
        LOG.debug("REST request to partial update SPSIncomingTransactions partially : {}, {}", id, sPSIncomingTransactions);
        if (sPSIncomingTransactions.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, sPSIncomingTransactions.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!sPSIncomingTransactionsRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<SPSIncomingTransactions> result = sPSIncomingTransactionsRepository
            .findById(sPSIncomingTransactions.getId())
            .map(existingSPSIncomingTransactions -> {
                if (sPSIncomingTransactions.getMessageid() != null) {
                    existingSPSIncomingTransactions.setMessageid(sPSIncomingTransactions.getMessageid());
                }
                if (sPSIncomingTransactions.getChannelcode() != null) {
                    existingSPSIncomingTransactions.setChannelcode(sPSIncomingTransactions.getChannelcode());
                }
                if (sPSIncomingTransactions.getCallbackurl() != null) {
                    existingSPSIncomingTransactions.setCallbackurl(sPSIncomingTransactions.getCallbackurl());
                }
                if (sPSIncomingTransactions.getMessagetype() != null) {
                    existingSPSIncomingTransactions.setMessagetype(sPSIncomingTransactions.getMessagetype());
                }
                if (sPSIncomingTransactions.getTranscurrency() != null) {
                    existingSPSIncomingTransactions.setTranscurrency(sPSIncomingTransactions.getTranscurrency());
                }
                if (sPSIncomingTransactions.getDebtorsname() != null) {
                    existingSPSIncomingTransactions.setDebtorsname(sPSIncomingTransactions.getDebtorsname());
                }
                if (sPSIncomingTransactions.getDebtorsaccountid() != null) {
                    existingSPSIncomingTransactions.setDebtorsaccountid(sPSIncomingTransactions.getDebtorsaccountid());
                }
                if (sPSIncomingTransactions.getDebtorsbankcode() != null) {
                    existingSPSIncomingTransactions.setDebtorsbankcode(sPSIncomingTransactions.getDebtorsbankcode());
                }
                if (sPSIncomingTransactions.getDebtorsphone() != null) {
                    existingSPSIncomingTransactions.setDebtorsphone(sPSIncomingTransactions.getDebtorsphone());
                }
                if (sPSIncomingTransactions.getBeneficiaryname() != null) {
                    existingSPSIncomingTransactions.setBeneficiaryname(sPSIncomingTransactions.getBeneficiaryname());
                }
                if (sPSIncomingTransactions.getBeneficiaryaccountid() != null) {
                    existingSPSIncomingTransactions.setBeneficiaryaccountid(sPSIncomingTransactions.getBeneficiaryaccountid());
                }
                if (sPSIncomingTransactions.getBeneficiarybankcode() != null) {
                    existingSPSIncomingTransactions.setBeneficiarybankcode(sPSIncomingTransactions.getBeneficiarybankcode());
                }
                if (sPSIncomingTransactions.getBeneficiaryphone() != null) {
                    existingSPSIncomingTransactions.setBeneficiaryphone(sPSIncomingTransactions.getBeneficiaryphone());
                }
                if (sPSIncomingTransactions.getNarration() != null) {
                    existingSPSIncomingTransactions.setNarration(sPSIncomingTransactions.getNarration());
                }
                if (sPSIncomingTransactions.getExternalreference() != null) {
                    existingSPSIncomingTransactions.setExternalreference(sPSIncomingTransactions.getExternalreference());
                }
                if (sPSIncomingTransactions.getCbsreference() != null) {
                    existingSPSIncomingTransactions.setCbsreference(sPSIncomingTransactions.getCbsreference());
                }
                if (sPSIncomingTransactions.getMessageendtoendid() != null) {
                    existingSPSIncomingTransactions.setMessageendtoendid(sPSIncomingTransactions.getMessageendtoendid());
                }
                if (sPSIncomingTransactions.getTransactionstatus() != null) {
                    existingSPSIncomingTransactions.setTransactionstatus(sPSIncomingTransactions.getTransactionstatus());
                }
                if (sPSIncomingTransactions.getTransactionstatusdesc() != null) {
                    existingSPSIncomingTransactions.setTransactionstatusdesc(sPSIncomingTransactions.getTransactionstatusdesc());
                }
                if (sPSIncomingTransactions.getSpsstatus() != null) {
                    existingSPSIncomingTransactions.setSpsstatus(sPSIncomingTransactions.getSpsstatus());
                }
                if (sPSIncomingTransactions.getSpsstatusdesc() != null) {
                    existingSPSIncomingTransactions.setSpsstatusdesc(sPSIncomingTransactions.getSpsstatusdesc());
                }
                if (sPSIncomingTransactions.getCbsstatus() != null) {
                    existingSPSIncomingTransactions.setCbsstatus(sPSIncomingTransactions.getCbsstatus());
                }
                if (sPSIncomingTransactions.getCbsstatusdesc() != null) {
                    existingSPSIncomingTransactions.setCbsstatusdesc(sPSIncomingTransactions.getCbsstatusdesc());
                }
                if (sPSIncomingTransactions.getRequestInstanttime() != null) {
                    existingSPSIncomingTransactions.setRequestInstanttime(sPSIncomingTransactions.getRequestInstanttime());
                }
                if (sPSIncomingTransactions.getIsomessagetype() != null) {
                    existingSPSIncomingTransactions.setIsomessagetype(sPSIncomingTransactions.getIsomessagetype());
                }
                if (sPSIncomingTransactions.getRequestjson() != null) {
                    existingSPSIncomingTransactions.setRequestjson(sPSIncomingTransactions.getRequestjson());
                }
                if (sPSIncomingTransactions.getSpsrequestxml() != null) {
                    existingSPSIncomingTransactions.setSpsrequestxml(sPSIncomingTransactions.getSpsrequestxml());
                }
                if (sPSIncomingTransactions.getSpsresponsexml() != null) {
                    existingSPSIncomingTransactions.setSpsresponsexml(sPSIncomingTransactions.getSpsresponsexml());
                }
                if (sPSIncomingTransactions.getAmount() != null) {
                    existingSPSIncomingTransactions.setAmount(sPSIncomingTransactions.getAmount());
                }

                return existingSPSIncomingTransactions;
            })
            .map(sPSIncomingTransactionsRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, sPSIncomingTransactions.getId().toString())
        );
    }

    /**
     * {@code GET  /sps-incoming-transactions} : get all the sPSIncomingTransactions.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of sPSIncomingTransactions in body.
     */
    @GetMapping("")
    public List<SPSIncomingTransactions> getAllSPSIncomingTransactions() {
        LOG.debug("REST request to get all SPSIncomingTransactions");
        return sPSIncomingTransactionsRepository.findAll();
    }

    /**
     * {@code GET  /sps-incoming-transactions/:id} : get the "id" sPSIncomingTransactions.
     *
     * @param id the id of the sPSIncomingTransactions to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the sPSIncomingTransactions, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<SPSIncomingTransactions> getSPSIncomingTransactions(@PathVariable("id") Long id) {
        LOG.debug("REST request to get SPSIncomingTransactions : {}", id);
        Optional<SPSIncomingTransactions> sPSIncomingTransactions = sPSIncomingTransactionsRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(sPSIncomingTransactions);
    }

    /**
     * {@code DELETE  /sps-incoming-transactions/:id} : delete the "id" sPSIncomingTransactions.
     *
     * @param id the id of the sPSIncomingTransactions to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSPSIncomingTransactions(@PathVariable("id") Long id) {
        LOG.debug("REST request to delete SPSIncomingTransactions : {}", id);
        sPSIncomingTransactionsRepository.deleteById(id);
        return ResponseEntity.noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}

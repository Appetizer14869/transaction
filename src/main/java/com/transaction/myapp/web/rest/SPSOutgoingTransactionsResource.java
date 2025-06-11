package com.transaction.myapp.web.rest;

import com.transaction.myapp.domain.SPSOutgoingTransactions;
import com.transaction.myapp.repository.SPSOutgoingTransactionsRepository;
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
 * REST controller for managing {@link com.transaction.myapp.domain.SPSOutgoingTransactions}.
 */
@RestController
@RequestMapping("/api/sps-outgoing-transactions")
@Transactional
public class SPSOutgoingTransactionsResource {

    private static final Logger LOG = LoggerFactory.getLogger(SPSOutgoingTransactionsResource.class);

    private static final String ENTITY_NAME = "transactionSpsOutgoingTransactions";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final SPSOutgoingTransactionsRepository sPSOutgoingTransactionsRepository;

    public SPSOutgoingTransactionsResource(SPSOutgoingTransactionsRepository sPSOutgoingTransactionsRepository) {
        this.sPSOutgoingTransactionsRepository = sPSOutgoingTransactionsRepository;
    }

    /**
     * {@code POST  /sps-outgoing-transactions} : Create a new sPSOutgoingTransactions.
     *
     * @param sPSOutgoingTransactions the sPSOutgoingTransactions to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new sPSOutgoingTransactions, or with status {@code 400 (Bad Request)} if the sPSOutgoingTransactions has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<SPSOutgoingTransactions> createSPSOutgoingTransactions(
        @Valid @RequestBody SPSOutgoingTransactions sPSOutgoingTransactions
    ) throws URISyntaxException {
        LOG.debug("REST request to save SPSOutgoingTransactions : {}", sPSOutgoingTransactions);
        if (sPSOutgoingTransactions.getId() != null) {
            throw new BadRequestAlertException("A new sPSOutgoingTransactions cannot already have an ID", ENTITY_NAME, "idexists");
        }
        sPSOutgoingTransactions = sPSOutgoingTransactionsRepository.save(sPSOutgoingTransactions);
        return ResponseEntity.created(new URI("/api/sps-outgoing-transactions/" + sPSOutgoingTransactions.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, sPSOutgoingTransactions.getId().toString()))
            .body(sPSOutgoingTransactions);
    }

    /**
     * {@code PUT  /sps-outgoing-transactions/:id} : Updates an existing sPSOutgoingTransactions.
     *
     * @param id the id of the sPSOutgoingTransactions to save.
     * @param sPSOutgoingTransactions the sPSOutgoingTransactions to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated sPSOutgoingTransactions,
     * or with status {@code 400 (Bad Request)} if the sPSOutgoingTransactions is not valid,
     * or with status {@code 500 (Internal Server Error)} if the sPSOutgoingTransactions couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<SPSOutgoingTransactions> updateSPSOutgoingTransactions(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody SPSOutgoingTransactions sPSOutgoingTransactions
    ) throws URISyntaxException {
        LOG.debug("REST request to update SPSOutgoingTransactions : {}, {}", id, sPSOutgoingTransactions);
        if (sPSOutgoingTransactions.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, sPSOutgoingTransactions.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!sPSOutgoingTransactionsRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        sPSOutgoingTransactions = sPSOutgoingTransactionsRepository.save(sPSOutgoingTransactions);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, sPSOutgoingTransactions.getId().toString()))
            .body(sPSOutgoingTransactions);
    }

    /**
     * {@code PATCH  /sps-outgoing-transactions/:id} : Partial updates given fields of an existing sPSOutgoingTransactions, field will ignore if it is null
     *
     * @param id the id of the sPSOutgoingTransactions to save.
     * @param sPSOutgoingTransactions the sPSOutgoingTransactions to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated sPSOutgoingTransactions,
     * or with status {@code 400 (Bad Request)} if the sPSOutgoingTransactions is not valid,
     * or with status {@code 404 (Not Found)} if the sPSOutgoingTransactions is not found,
     * or with status {@code 500 (Internal Server Error)} if the sPSOutgoingTransactions couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<SPSOutgoingTransactions> partialUpdateSPSOutgoingTransactions(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody SPSOutgoingTransactions sPSOutgoingTransactions
    ) throws URISyntaxException {
        LOG.debug("REST request to partial update SPSOutgoingTransactions partially : {}, {}", id, sPSOutgoingTransactions);
        if (sPSOutgoingTransactions.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, sPSOutgoingTransactions.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!sPSOutgoingTransactionsRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<SPSOutgoingTransactions> result = sPSOutgoingTransactionsRepository
            .findById(sPSOutgoingTransactions.getId())
            .map(existingSPSOutgoingTransactions -> {
                if (sPSOutgoingTransactions.getMessageid() != null) {
                    existingSPSOutgoingTransactions.setMessageid(sPSOutgoingTransactions.getMessageid());
                }
                if (sPSOutgoingTransactions.getChannelcode() != null) {
                    existingSPSOutgoingTransactions.setChannelcode(sPSOutgoingTransactions.getChannelcode());
                }
                if (sPSOutgoingTransactions.getCallbackurl() != null) {
                    existingSPSOutgoingTransactions.setCallbackurl(sPSOutgoingTransactions.getCallbackurl());
                }
                if (sPSOutgoingTransactions.getMessagetype() != null) {
                    existingSPSOutgoingTransactions.setMessagetype(sPSOutgoingTransactions.getMessagetype());
                }
                if (sPSOutgoingTransactions.getTranscurrency() != null) {
                    existingSPSOutgoingTransactions.setTranscurrency(sPSOutgoingTransactions.getTranscurrency());
                }
                if (sPSOutgoingTransactions.getDebtorsname() != null) {
                    existingSPSOutgoingTransactions.setDebtorsname(sPSOutgoingTransactions.getDebtorsname());
                }
                if (sPSOutgoingTransactions.getDebtorsaccountid() != null) {
                    existingSPSOutgoingTransactions.setDebtorsaccountid(sPSOutgoingTransactions.getDebtorsaccountid());
                }
                if (sPSOutgoingTransactions.getDebtorsbankcode() != null) {
                    existingSPSOutgoingTransactions.setDebtorsbankcode(sPSOutgoingTransactions.getDebtorsbankcode());
                }
                if (sPSOutgoingTransactions.getDebtorsphone() != null) {
                    existingSPSOutgoingTransactions.setDebtorsphone(sPSOutgoingTransactions.getDebtorsphone());
                }
                if (sPSOutgoingTransactions.getBeneficiaryname() != null) {
                    existingSPSOutgoingTransactions.setBeneficiaryname(sPSOutgoingTransactions.getBeneficiaryname());
                }
                if (sPSOutgoingTransactions.getBeneficiaryaccountid() != null) {
                    existingSPSOutgoingTransactions.setBeneficiaryaccountid(sPSOutgoingTransactions.getBeneficiaryaccountid());
                }
                if (sPSOutgoingTransactions.getBeneficiarybankcode() != null) {
                    existingSPSOutgoingTransactions.setBeneficiarybankcode(sPSOutgoingTransactions.getBeneficiarybankcode());
                }
                if (sPSOutgoingTransactions.getBeneficiaryphone() != null) {
                    existingSPSOutgoingTransactions.setBeneficiaryphone(sPSOutgoingTransactions.getBeneficiaryphone());
                }
                if (sPSOutgoingTransactions.getNarration() != null) {
                    existingSPSOutgoingTransactions.setNarration(sPSOutgoingTransactions.getNarration());
                }
                if (sPSOutgoingTransactions.getExternalreference() != null) {
                    existingSPSOutgoingTransactions.setExternalreference(sPSOutgoingTransactions.getExternalreference());
                }
                if (sPSOutgoingTransactions.getCbsreference() != null) {
                    existingSPSOutgoingTransactions.setCbsreference(sPSOutgoingTransactions.getCbsreference());
                }
                if (sPSOutgoingTransactions.getMessageendtoendid() != null) {
                    existingSPSOutgoingTransactions.setMessageendtoendid(sPSOutgoingTransactions.getMessageendtoendid());
                }
                if (sPSOutgoingTransactions.getTransactionstatus() != null) {
                    existingSPSOutgoingTransactions.setTransactionstatus(sPSOutgoingTransactions.getTransactionstatus());
                }
                if (sPSOutgoingTransactions.getTransactionstatusdesc() != null) {
                    existingSPSOutgoingTransactions.setTransactionstatusdesc(sPSOutgoingTransactions.getTransactionstatusdesc());
                }
                if (sPSOutgoingTransactions.getSpsstatus() != null) {
                    existingSPSOutgoingTransactions.setSpsstatus(sPSOutgoingTransactions.getSpsstatus());
                }
                if (sPSOutgoingTransactions.getSpsstatusdesc() != null) {
                    existingSPSOutgoingTransactions.setSpsstatusdesc(sPSOutgoingTransactions.getSpsstatusdesc());
                }
                if (sPSOutgoingTransactions.getCbsstatus() != null) {
                    existingSPSOutgoingTransactions.setCbsstatus(sPSOutgoingTransactions.getCbsstatus());
                }
                if (sPSOutgoingTransactions.getCbsstatusdesc() != null) {
                    existingSPSOutgoingTransactions.setCbsstatusdesc(sPSOutgoingTransactions.getCbsstatusdesc());
                }
                if (sPSOutgoingTransactions.getRequestInstanttime() != null) {
                    existingSPSOutgoingTransactions.setRequestInstanttime(sPSOutgoingTransactions.getRequestInstanttime());
                }
                if (sPSOutgoingTransactions.getIsomessagetype() != null) {
                    existingSPSOutgoingTransactions.setIsomessagetype(sPSOutgoingTransactions.getIsomessagetype());
                }
                if (sPSOutgoingTransactions.getRequestjson() != null) {
                    existingSPSOutgoingTransactions.setRequestjson(sPSOutgoingTransactions.getRequestjson());
                }
                if (sPSOutgoingTransactions.getSpsrequestxml() != null) {
                    existingSPSOutgoingTransactions.setSpsrequestxml(sPSOutgoingTransactions.getSpsrequestxml());
                }
                if (sPSOutgoingTransactions.getSpsresponsexml() != null) {
                    existingSPSOutgoingTransactions.setSpsresponsexml(sPSOutgoingTransactions.getSpsresponsexml());
                }
                if (sPSOutgoingTransactions.getAmount() != null) {
                    existingSPSOutgoingTransactions.setAmount(sPSOutgoingTransactions.getAmount());
                }
                if (sPSOutgoingTransactions.getCallbackstatus() != null) {
                    existingSPSOutgoingTransactions.setCallbackstatus(sPSOutgoingTransactions.getCallbackstatus());
                }
                if (sPSOutgoingTransactions.getCallbackstatusdesc() != null) {
                    existingSPSOutgoingTransactions.setCallbackstatusdesc(sPSOutgoingTransactions.getCallbackstatusdesc());
                }

                return existingSPSOutgoingTransactions;
            })
            .map(sPSOutgoingTransactionsRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, sPSOutgoingTransactions.getId().toString())
        );
    }

    /**
     * {@code GET  /sps-outgoing-transactions} : get all the sPSOutgoingTransactions.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of sPSOutgoingTransactions in body.
     */
    @GetMapping("")
    public List<SPSOutgoingTransactions> getAllSPSOutgoingTransactions() {
        LOG.debug("REST request to get all SPSOutgoingTransactions");
        return sPSOutgoingTransactionsRepository.findAll();
    }

    /**
     * {@code GET  /sps-outgoing-transactions/:id} : get the "id" sPSOutgoingTransactions.
     *
     * @param id the id of the sPSOutgoingTransactions to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the sPSOutgoingTransactions, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<SPSOutgoingTransactions> getSPSOutgoingTransactions(@PathVariable("id") Long id) {
        LOG.debug("REST request to get SPSOutgoingTransactions : {}", id);
        Optional<SPSOutgoingTransactions> sPSOutgoingTransactions = sPSOutgoingTransactionsRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(sPSOutgoingTransactions);
    }

    /**
     * {@code DELETE  /sps-outgoing-transactions/:id} : delete the "id" sPSOutgoingTransactions.
     *
     * @param id the id of the sPSOutgoingTransactions to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSPSOutgoingTransactions(@PathVariable("id") Long id) {
        LOG.debug("REST request to delete SPSOutgoingTransactions : {}", id);
        sPSOutgoingTransactionsRepository.deleteById(id);
        return ResponseEntity.noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}

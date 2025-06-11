package com.transaction.myapp.web.rest;

import static com.transaction.myapp.domain.SPSOutgoingTransactionsAsserts.*;
import static com.transaction.myapp.web.rest.TestUtil.createUpdateProxyForBean;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.transaction.myapp.IntegrationTest;
import com.transaction.myapp.domain.SPSOutgoingTransactions;
import com.transaction.myapp.repository.SPSOutgoingTransactionsRepository;
import jakarta.persistence.EntityManager;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link SPSOutgoingTransactionsResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class SPSOutgoingTransactionsResourceIT {

    private static final String DEFAULT_MESSAGEID = "AAAAAAAAAA";
    private static final String UPDATED_MESSAGEID = "BBBBBBBBBB";

    private static final String DEFAULT_CHANNELCODE = "AAAAAAAAAA";
    private static final String UPDATED_CHANNELCODE = "BBBBBBBBBB";

    private static final String DEFAULT_CALLBACKURL = "AAAAAAAAAA";
    private static final String UPDATED_CALLBACKURL = "BBBBBBBBBB";

    private static final String DEFAULT_MESSAGETYPE = "AAAAAAAAAA";
    private static final String UPDATED_MESSAGETYPE = "BBBBBBBBBB";

    private static final String DEFAULT_TRANSCURRENCY = "AAAAAAAAAA";
    private static final String UPDATED_TRANSCURRENCY = "BBBBBBBBBB";

    private static final String DEFAULT_DEBTORSNAME = "AAAAAAAAAA";
    private static final String UPDATED_DEBTORSNAME = "BBBBBBBBBB";

    private static final String DEFAULT_DEBTORSACCOUNTID = "AAAAAAAAAA";
    private static final String UPDATED_DEBTORSACCOUNTID = "BBBBBBBBBB";

    private static final String DEFAULT_DEBTORSBANKCODE = "AAAAAAAAAA";
    private static final String UPDATED_DEBTORSBANKCODE = "BBBBBBBBBB";

    private static final String DEFAULT_DEBTORSPHONE = "AAAAAAAAAA";
    private static final String UPDATED_DEBTORSPHONE = "BBBBBBBBBB";

    private static final String DEFAULT_BENEFICIARYNAME = "AAAAAAAAAA";
    private static final String UPDATED_BENEFICIARYNAME = "BBBBBBBBBB";

    private static final String DEFAULT_BENEFICIARYACCOUNTID = "AAAAAAAAAA";
    private static final String UPDATED_BENEFICIARYACCOUNTID = "BBBBBBBBBB";

    private static final String DEFAULT_BENEFICIARYBANKCODE = "AAAAAAAAAA";
    private static final String UPDATED_BENEFICIARYBANKCODE = "BBBBBBBBBB";

    private static final String DEFAULT_BENEFICIARYPHONE = "AAAAAAAAAA";
    private static final String UPDATED_BENEFICIARYPHONE = "BBBBBBBBBB";

    private static final String DEFAULT_NARRATION = "AAAAAAAAAA";
    private static final String UPDATED_NARRATION = "BBBBBBBBBB";

    private static final String DEFAULT_EXTERNALREFERENCE = "AAAAAAAAAA";
    private static final String UPDATED_EXTERNALREFERENCE = "BBBBBBBBBB";

    private static final String DEFAULT_CBSREFERENCE = "AAAAAAAAAA";
    private static final String UPDATED_CBSREFERENCE = "BBBBBBBBBB";

    private static final String DEFAULT_MESSAGEENDTOENDID = "AAAAAAAAAA";
    private static final String UPDATED_MESSAGEENDTOENDID = "BBBBBBBBBB";

    private static final String DEFAULT_TRANSACTIONSTATUS = "AAAAAAAAAA";
    private static final String UPDATED_TRANSACTIONSTATUS = "BBBBBBBBBB";

    private static final String DEFAULT_TRANSACTIONSTATUSDESC = "AAAAAAAAAA";
    private static final String UPDATED_TRANSACTIONSTATUSDESC = "BBBBBBBBBB";

    private static final String DEFAULT_SPSSTATUS = "AAAAAAAAAA";
    private static final String UPDATED_SPSSTATUS = "BBBBBBBBBB";

    private static final String DEFAULT_SPSSTATUSDESC = "AAAAAAAAAA";
    private static final String UPDATED_SPSSTATUSDESC = "BBBBBBBBBB";

    private static final String DEFAULT_CBSSTATUS = "AAAAAAAAAA";
    private static final String UPDATED_CBSSTATUS = "BBBBBBBBBB";

    private static final String DEFAULT_CBSSTATUSDESC = "AAAAAAAAAA";
    private static final String UPDATED_CBSSTATUSDESC = "BBBBBBBBBB";

    private static final Instant DEFAULT_REQUEST_INSTANTTIME = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_REQUEST_INSTANTTIME = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_ISOMESSAGETYPE = "AAAAAAAAAA";
    private static final String UPDATED_ISOMESSAGETYPE = "BBBBBBBBBB";

    private static final String DEFAULT_REQUESTJSON = "AAAAAAAAAA";
    private static final String UPDATED_REQUESTJSON = "BBBBBBBBBB";

    private static final String DEFAULT_SPSREQUESTXML = "AAAAAAAAAA";
    private static final String UPDATED_SPSREQUESTXML = "BBBBBBBBBB";

    private static final String DEFAULT_SPSRESPONSEXML = "AAAAAAAAAA";
    private static final String UPDATED_SPSRESPONSEXML = "BBBBBBBBBB";

    private static final Double DEFAULT_AMOUNT = 1D;
    private static final Double UPDATED_AMOUNT = 2D;

    private static final String DEFAULT_CALLBACKSTATUS = "AAAAAAAAAA";
    private static final String UPDATED_CALLBACKSTATUS = "BBBBBBBBBB";

    private static final String DEFAULT_CALLBACKSTATUSDESC = "AAAAAAAAAA";
    private static final String UPDATED_CALLBACKSTATUSDESC = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/sps-outgoing-transactions";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ObjectMapper om;

    @Autowired
    private SPSOutgoingTransactionsRepository sPSOutgoingTransactionsRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restSPSOutgoingTransactionsMockMvc;

    private SPSOutgoingTransactions sPSOutgoingTransactions;

    private SPSOutgoingTransactions insertedSPSOutgoingTransactions;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static SPSOutgoingTransactions createEntity() {
        return new SPSOutgoingTransactions()
            .messageid(DEFAULT_MESSAGEID)
            .channelcode(DEFAULT_CHANNELCODE)
            .callbackurl(DEFAULT_CALLBACKURL)
            .messagetype(DEFAULT_MESSAGETYPE)
            .transcurrency(DEFAULT_TRANSCURRENCY)
            .debtorsname(DEFAULT_DEBTORSNAME)
            .debtorsaccountid(DEFAULT_DEBTORSACCOUNTID)
            .debtorsbankcode(DEFAULT_DEBTORSBANKCODE)
            .debtorsphone(DEFAULT_DEBTORSPHONE)
            .beneficiaryname(DEFAULT_BENEFICIARYNAME)
            .beneficiaryaccountid(DEFAULT_BENEFICIARYACCOUNTID)
            .beneficiarybankcode(DEFAULT_BENEFICIARYBANKCODE)
            .beneficiaryphone(DEFAULT_BENEFICIARYPHONE)
            .narration(DEFAULT_NARRATION)
            .externalreference(DEFAULT_EXTERNALREFERENCE)
            .cbsreference(DEFAULT_CBSREFERENCE)
            .messageendtoendid(DEFAULT_MESSAGEENDTOENDID)
            .transactionstatus(DEFAULT_TRANSACTIONSTATUS)
            .transactionstatusdesc(DEFAULT_TRANSACTIONSTATUSDESC)
            .spsstatus(DEFAULT_SPSSTATUS)
            .spsstatusdesc(DEFAULT_SPSSTATUSDESC)
            .cbsstatus(DEFAULT_CBSSTATUS)
            .cbsstatusdesc(DEFAULT_CBSSTATUSDESC)
            .requestInstanttime(DEFAULT_REQUEST_INSTANTTIME)
            .isomessagetype(DEFAULT_ISOMESSAGETYPE)
            .requestjson(DEFAULT_REQUESTJSON)
            .spsrequestxml(DEFAULT_SPSREQUESTXML)
            .spsresponsexml(DEFAULT_SPSRESPONSEXML)
            .amount(DEFAULT_AMOUNT)
            .callbackstatus(DEFAULT_CALLBACKSTATUS)
            .callbackstatusdesc(DEFAULT_CALLBACKSTATUSDESC);
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static SPSOutgoingTransactions createUpdatedEntity() {
        return new SPSOutgoingTransactions()
            .messageid(UPDATED_MESSAGEID)
            .channelcode(UPDATED_CHANNELCODE)
            .callbackurl(UPDATED_CALLBACKURL)
            .messagetype(UPDATED_MESSAGETYPE)
            .transcurrency(UPDATED_TRANSCURRENCY)
            .debtorsname(UPDATED_DEBTORSNAME)
            .debtorsaccountid(UPDATED_DEBTORSACCOUNTID)
            .debtorsbankcode(UPDATED_DEBTORSBANKCODE)
            .debtorsphone(UPDATED_DEBTORSPHONE)
            .beneficiaryname(UPDATED_BENEFICIARYNAME)
            .beneficiaryaccountid(UPDATED_BENEFICIARYACCOUNTID)
            .beneficiarybankcode(UPDATED_BENEFICIARYBANKCODE)
            .beneficiaryphone(UPDATED_BENEFICIARYPHONE)
            .narration(UPDATED_NARRATION)
            .externalreference(UPDATED_EXTERNALREFERENCE)
            .cbsreference(UPDATED_CBSREFERENCE)
            .messageendtoendid(UPDATED_MESSAGEENDTOENDID)
            .transactionstatus(UPDATED_TRANSACTIONSTATUS)
            .transactionstatusdesc(UPDATED_TRANSACTIONSTATUSDESC)
            .spsstatus(UPDATED_SPSSTATUS)
            .spsstatusdesc(UPDATED_SPSSTATUSDESC)
            .cbsstatus(UPDATED_CBSSTATUS)
            .cbsstatusdesc(UPDATED_CBSSTATUSDESC)
            .requestInstanttime(UPDATED_REQUEST_INSTANTTIME)
            .isomessagetype(UPDATED_ISOMESSAGETYPE)
            .requestjson(UPDATED_REQUESTJSON)
            .spsrequestxml(UPDATED_SPSREQUESTXML)
            .spsresponsexml(UPDATED_SPSRESPONSEXML)
            .amount(UPDATED_AMOUNT)
            .callbackstatus(UPDATED_CALLBACKSTATUS)
            .callbackstatusdesc(UPDATED_CALLBACKSTATUSDESC);
    }

    @BeforeEach
    void initTest() {
        sPSOutgoingTransactions = createEntity();
    }

    @AfterEach
    void cleanup() {
        if (insertedSPSOutgoingTransactions != null) {
            sPSOutgoingTransactionsRepository.delete(insertedSPSOutgoingTransactions);
            insertedSPSOutgoingTransactions = null;
        }
    }

    @Test
    @Transactional
    void createSPSOutgoingTransactions() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the SPSOutgoingTransactions
        var returnedSPSOutgoingTransactions = om.readValue(
            restSPSOutgoingTransactionsMockMvc
                .perform(
                    post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(sPSOutgoingTransactions))
                )
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            SPSOutgoingTransactions.class
        );

        // Validate the SPSOutgoingTransactions in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        assertSPSOutgoingTransactionsUpdatableFieldsEquals(
            returnedSPSOutgoingTransactions,
            getPersistedSPSOutgoingTransactions(returnedSPSOutgoingTransactions)
        );

        insertedSPSOutgoingTransactions = returnedSPSOutgoingTransactions;
    }

    @Test
    @Transactional
    void createSPSOutgoingTransactionsWithExistingId() throws Exception {
        // Create the SPSOutgoingTransactions with an existing ID
        sPSOutgoingTransactions.setId(1L);

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restSPSOutgoingTransactionsMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(sPSOutgoingTransactions)))
            .andExpect(status().isBadRequest());

        // Validate the SPSOutgoingTransactions in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllSPSOutgoingTransactions() throws Exception {
        // Initialize the database
        insertedSPSOutgoingTransactions = sPSOutgoingTransactionsRepository.saveAndFlush(sPSOutgoingTransactions);

        // Get all the sPSOutgoingTransactionsList
        restSPSOutgoingTransactionsMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(sPSOutgoingTransactions.getId().intValue())))
            .andExpect(jsonPath("$.[*].messageid").value(hasItem(DEFAULT_MESSAGEID)))
            .andExpect(jsonPath("$.[*].channelcode").value(hasItem(DEFAULT_CHANNELCODE)))
            .andExpect(jsonPath("$.[*].callbackurl").value(hasItem(DEFAULT_CALLBACKURL)))
            .andExpect(jsonPath("$.[*].messagetype").value(hasItem(DEFAULT_MESSAGETYPE)))
            .andExpect(jsonPath("$.[*].transcurrency").value(hasItem(DEFAULT_TRANSCURRENCY)))
            .andExpect(jsonPath("$.[*].debtorsname").value(hasItem(DEFAULT_DEBTORSNAME)))
            .andExpect(jsonPath("$.[*].debtorsaccountid").value(hasItem(DEFAULT_DEBTORSACCOUNTID)))
            .andExpect(jsonPath("$.[*].debtorsbankcode").value(hasItem(DEFAULT_DEBTORSBANKCODE)))
            .andExpect(jsonPath("$.[*].debtorsphone").value(hasItem(DEFAULT_DEBTORSPHONE)))
            .andExpect(jsonPath("$.[*].beneficiaryname").value(hasItem(DEFAULT_BENEFICIARYNAME)))
            .andExpect(jsonPath("$.[*].beneficiaryaccountid").value(hasItem(DEFAULT_BENEFICIARYACCOUNTID)))
            .andExpect(jsonPath("$.[*].beneficiarybankcode").value(hasItem(DEFAULT_BENEFICIARYBANKCODE)))
            .andExpect(jsonPath("$.[*].beneficiaryphone").value(hasItem(DEFAULT_BENEFICIARYPHONE)))
            .andExpect(jsonPath("$.[*].narration").value(hasItem(DEFAULT_NARRATION)))
            .andExpect(jsonPath("$.[*].externalreference").value(hasItem(DEFAULT_EXTERNALREFERENCE)))
            .andExpect(jsonPath("$.[*].cbsreference").value(hasItem(DEFAULT_CBSREFERENCE)))
            .andExpect(jsonPath("$.[*].messageendtoendid").value(hasItem(DEFAULT_MESSAGEENDTOENDID)))
            .andExpect(jsonPath("$.[*].transactionstatus").value(hasItem(DEFAULT_TRANSACTIONSTATUS)))
            .andExpect(jsonPath("$.[*].transactionstatusdesc").value(hasItem(DEFAULT_TRANSACTIONSTATUSDESC)))
            .andExpect(jsonPath("$.[*].spsstatus").value(hasItem(DEFAULT_SPSSTATUS)))
            .andExpect(jsonPath("$.[*].spsstatusdesc").value(hasItem(DEFAULT_SPSSTATUSDESC)))
            .andExpect(jsonPath("$.[*].cbsstatus").value(hasItem(DEFAULT_CBSSTATUS)))
            .andExpect(jsonPath("$.[*].cbsstatusdesc").value(hasItem(DEFAULT_CBSSTATUSDESC)))
            .andExpect(jsonPath("$.[*].requestInstanttime").value(hasItem(DEFAULT_REQUEST_INSTANTTIME.toString())))
            .andExpect(jsonPath("$.[*].isomessagetype").value(hasItem(DEFAULT_ISOMESSAGETYPE)))
            .andExpect(jsonPath("$.[*].requestjson").value(hasItem(DEFAULT_REQUESTJSON)))
            .andExpect(jsonPath("$.[*].spsrequestxml").value(hasItem(DEFAULT_SPSREQUESTXML)))
            .andExpect(jsonPath("$.[*].spsresponsexml").value(hasItem(DEFAULT_SPSRESPONSEXML)))
            .andExpect(jsonPath("$.[*].amount").value(hasItem(DEFAULT_AMOUNT)))
            .andExpect(jsonPath("$.[*].callbackstatus").value(hasItem(DEFAULT_CALLBACKSTATUS)))
            .andExpect(jsonPath("$.[*].callbackstatusdesc").value(hasItem(DEFAULT_CALLBACKSTATUSDESC)));
    }

    @Test
    @Transactional
    void getSPSOutgoingTransactions() throws Exception {
        // Initialize the database
        insertedSPSOutgoingTransactions = sPSOutgoingTransactionsRepository.saveAndFlush(sPSOutgoingTransactions);

        // Get the sPSOutgoingTransactions
        restSPSOutgoingTransactionsMockMvc
            .perform(get(ENTITY_API_URL_ID, sPSOutgoingTransactions.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(sPSOutgoingTransactions.getId().intValue()))
            .andExpect(jsonPath("$.messageid").value(DEFAULT_MESSAGEID))
            .andExpect(jsonPath("$.channelcode").value(DEFAULT_CHANNELCODE))
            .andExpect(jsonPath("$.callbackurl").value(DEFAULT_CALLBACKURL))
            .andExpect(jsonPath("$.messagetype").value(DEFAULT_MESSAGETYPE))
            .andExpect(jsonPath("$.transcurrency").value(DEFAULT_TRANSCURRENCY))
            .andExpect(jsonPath("$.debtorsname").value(DEFAULT_DEBTORSNAME))
            .andExpect(jsonPath("$.debtorsaccountid").value(DEFAULT_DEBTORSACCOUNTID))
            .andExpect(jsonPath("$.debtorsbankcode").value(DEFAULT_DEBTORSBANKCODE))
            .andExpect(jsonPath("$.debtorsphone").value(DEFAULT_DEBTORSPHONE))
            .andExpect(jsonPath("$.beneficiaryname").value(DEFAULT_BENEFICIARYNAME))
            .andExpect(jsonPath("$.beneficiaryaccountid").value(DEFAULT_BENEFICIARYACCOUNTID))
            .andExpect(jsonPath("$.beneficiarybankcode").value(DEFAULT_BENEFICIARYBANKCODE))
            .andExpect(jsonPath("$.beneficiaryphone").value(DEFAULT_BENEFICIARYPHONE))
            .andExpect(jsonPath("$.narration").value(DEFAULT_NARRATION))
            .andExpect(jsonPath("$.externalreference").value(DEFAULT_EXTERNALREFERENCE))
            .andExpect(jsonPath("$.cbsreference").value(DEFAULT_CBSREFERENCE))
            .andExpect(jsonPath("$.messageendtoendid").value(DEFAULT_MESSAGEENDTOENDID))
            .andExpect(jsonPath("$.transactionstatus").value(DEFAULT_TRANSACTIONSTATUS))
            .andExpect(jsonPath("$.transactionstatusdesc").value(DEFAULT_TRANSACTIONSTATUSDESC))
            .andExpect(jsonPath("$.spsstatus").value(DEFAULT_SPSSTATUS))
            .andExpect(jsonPath("$.spsstatusdesc").value(DEFAULT_SPSSTATUSDESC))
            .andExpect(jsonPath("$.cbsstatus").value(DEFAULT_CBSSTATUS))
            .andExpect(jsonPath("$.cbsstatusdesc").value(DEFAULT_CBSSTATUSDESC))
            .andExpect(jsonPath("$.requestInstanttime").value(DEFAULT_REQUEST_INSTANTTIME.toString()))
            .andExpect(jsonPath("$.isomessagetype").value(DEFAULT_ISOMESSAGETYPE))
            .andExpect(jsonPath("$.requestjson").value(DEFAULT_REQUESTJSON))
            .andExpect(jsonPath("$.spsrequestxml").value(DEFAULT_SPSREQUESTXML))
            .andExpect(jsonPath("$.spsresponsexml").value(DEFAULT_SPSRESPONSEXML))
            .andExpect(jsonPath("$.amount").value(DEFAULT_AMOUNT))
            .andExpect(jsonPath("$.callbackstatus").value(DEFAULT_CALLBACKSTATUS))
            .andExpect(jsonPath("$.callbackstatusdesc").value(DEFAULT_CALLBACKSTATUSDESC));
    }

    @Test
    @Transactional
    void getNonExistingSPSOutgoingTransactions() throws Exception {
        // Get the sPSOutgoingTransactions
        restSPSOutgoingTransactionsMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingSPSOutgoingTransactions() throws Exception {
        // Initialize the database
        insertedSPSOutgoingTransactions = sPSOutgoingTransactionsRepository.saveAndFlush(sPSOutgoingTransactions);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the sPSOutgoingTransactions
        SPSOutgoingTransactions updatedSPSOutgoingTransactions = sPSOutgoingTransactionsRepository
            .findById(sPSOutgoingTransactions.getId())
            .orElseThrow();
        // Disconnect from session so that the updates on updatedSPSOutgoingTransactions are not directly saved in db
        em.detach(updatedSPSOutgoingTransactions);
        updatedSPSOutgoingTransactions
            .messageid(UPDATED_MESSAGEID)
            .channelcode(UPDATED_CHANNELCODE)
            .callbackurl(UPDATED_CALLBACKURL)
            .messagetype(UPDATED_MESSAGETYPE)
            .transcurrency(UPDATED_TRANSCURRENCY)
            .debtorsname(UPDATED_DEBTORSNAME)
            .debtorsaccountid(UPDATED_DEBTORSACCOUNTID)
            .debtorsbankcode(UPDATED_DEBTORSBANKCODE)
            .debtorsphone(UPDATED_DEBTORSPHONE)
            .beneficiaryname(UPDATED_BENEFICIARYNAME)
            .beneficiaryaccountid(UPDATED_BENEFICIARYACCOUNTID)
            .beneficiarybankcode(UPDATED_BENEFICIARYBANKCODE)
            .beneficiaryphone(UPDATED_BENEFICIARYPHONE)
            .narration(UPDATED_NARRATION)
            .externalreference(UPDATED_EXTERNALREFERENCE)
            .cbsreference(UPDATED_CBSREFERENCE)
            .messageendtoendid(UPDATED_MESSAGEENDTOENDID)
            .transactionstatus(UPDATED_TRANSACTIONSTATUS)
            .transactionstatusdesc(UPDATED_TRANSACTIONSTATUSDESC)
            .spsstatus(UPDATED_SPSSTATUS)
            .spsstatusdesc(UPDATED_SPSSTATUSDESC)
            .cbsstatus(UPDATED_CBSSTATUS)
            .cbsstatusdesc(UPDATED_CBSSTATUSDESC)
            .requestInstanttime(UPDATED_REQUEST_INSTANTTIME)
            .isomessagetype(UPDATED_ISOMESSAGETYPE)
            .requestjson(UPDATED_REQUESTJSON)
            .spsrequestxml(UPDATED_SPSREQUESTXML)
            .spsresponsexml(UPDATED_SPSRESPONSEXML)
            .amount(UPDATED_AMOUNT)
            .callbackstatus(UPDATED_CALLBACKSTATUS)
            .callbackstatusdesc(UPDATED_CALLBACKSTATUSDESC);

        restSPSOutgoingTransactionsMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedSPSOutgoingTransactions.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(updatedSPSOutgoingTransactions))
            )
            .andExpect(status().isOk());

        // Validate the SPSOutgoingTransactions in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedSPSOutgoingTransactionsToMatchAllProperties(updatedSPSOutgoingTransactions);
    }

    @Test
    @Transactional
    void putNonExistingSPSOutgoingTransactions() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        sPSOutgoingTransactions.setId(longCount.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSPSOutgoingTransactionsMockMvc
            .perform(
                put(ENTITY_API_URL_ID, sPSOutgoingTransactions.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(sPSOutgoingTransactions))
            )
            .andExpect(status().isBadRequest());

        // Validate the SPSOutgoingTransactions in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchSPSOutgoingTransactions() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        sPSOutgoingTransactions.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restSPSOutgoingTransactionsMockMvc
            .perform(
                put(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(sPSOutgoingTransactions))
            )
            .andExpect(status().isBadRequest());

        // Validate the SPSOutgoingTransactions in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamSPSOutgoingTransactions() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        sPSOutgoingTransactions.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restSPSOutgoingTransactionsMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(sPSOutgoingTransactions)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the SPSOutgoingTransactions in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateSPSOutgoingTransactionsWithPatch() throws Exception {
        // Initialize the database
        insertedSPSOutgoingTransactions = sPSOutgoingTransactionsRepository.saveAndFlush(sPSOutgoingTransactions);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the sPSOutgoingTransactions using partial update
        SPSOutgoingTransactions partialUpdatedSPSOutgoingTransactions = new SPSOutgoingTransactions();
        partialUpdatedSPSOutgoingTransactions.setId(sPSOutgoingTransactions.getId());

        partialUpdatedSPSOutgoingTransactions
            .messageid(UPDATED_MESSAGEID)
            .channelcode(UPDATED_CHANNELCODE)
            .callbackurl(UPDATED_CALLBACKURL)
            .messagetype(UPDATED_MESSAGETYPE)
            .transcurrency(UPDATED_TRANSCURRENCY)
            .debtorsname(UPDATED_DEBTORSNAME)
            .debtorsaccountid(UPDATED_DEBTORSACCOUNTID)
            .beneficiaryname(UPDATED_BENEFICIARYNAME)
            .beneficiaryaccountid(UPDATED_BENEFICIARYACCOUNTID)
            .beneficiaryphone(UPDATED_BENEFICIARYPHONE)
            .externalreference(UPDATED_EXTERNALREFERENCE)
            .cbsreference(UPDATED_CBSREFERENCE)
            .messageendtoendid(UPDATED_MESSAGEENDTOENDID)
            .cbsstatusdesc(UPDATED_CBSSTATUSDESC)
            .requestInstanttime(UPDATED_REQUEST_INSTANTTIME)
            .isomessagetype(UPDATED_ISOMESSAGETYPE)
            .spsresponsexml(UPDATED_SPSRESPONSEXML)
            .amount(UPDATED_AMOUNT);

        restSPSOutgoingTransactionsMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedSPSOutgoingTransactions.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedSPSOutgoingTransactions))
            )
            .andExpect(status().isOk());

        // Validate the SPSOutgoingTransactions in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertSPSOutgoingTransactionsUpdatableFieldsEquals(
            createUpdateProxyForBean(partialUpdatedSPSOutgoingTransactions, sPSOutgoingTransactions),
            getPersistedSPSOutgoingTransactions(sPSOutgoingTransactions)
        );
    }

    @Test
    @Transactional
    void fullUpdateSPSOutgoingTransactionsWithPatch() throws Exception {
        // Initialize the database
        insertedSPSOutgoingTransactions = sPSOutgoingTransactionsRepository.saveAndFlush(sPSOutgoingTransactions);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the sPSOutgoingTransactions using partial update
        SPSOutgoingTransactions partialUpdatedSPSOutgoingTransactions = new SPSOutgoingTransactions();
        partialUpdatedSPSOutgoingTransactions.setId(sPSOutgoingTransactions.getId());

        partialUpdatedSPSOutgoingTransactions
            .messageid(UPDATED_MESSAGEID)
            .channelcode(UPDATED_CHANNELCODE)
            .callbackurl(UPDATED_CALLBACKURL)
            .messagetype(UPDATED_MESSAGETYPE)
            .transcurrency(UPDATED_TRANSCURRENCY)
            .debtorsname(UPDATED_DEBTORSNAME)
            .debtorsaccountid(UPDATED_DEBTORSACCOUNTID)
            .debtorsbankcode(UPDATED_DEBTORSBANKCODE)
            .debtorsphone(UPDATED_DEBTORSPHONE)
            .beneficiaryname(UPDATED_BENEFICIARYNAME)
            .beneficiaryaccountid(UPDATED_BENEFICIARYACCOUNTID)
            .beneficiarybankcode(UPDATED_BENEFICIARYBANKCODE)
            .beneficiaryphone(UPDATED_BENEFICIARYPHONE)
            .narration(UPDATED_NARRATION)
            .externalreference(UPDATED_EXTERNALREFERENCE)
            .cbsreference(UPDATED_CBSREFERENCE)
            .messageendtoendid(UPDATED_MESSAGEENDTOENDID)
            .transactionstatus(UPDATED_TRANSACTIONSTATUS)
            .transactionstatusdesc(UPDATED_TRANSACTIONSTATUSDESC)
            .spsstatus(UPDATED_SPSSTATUS)
            .spsstatusdesc(UPDATED_SPSSTATUSDESC)
            .cbsstatus(UPDATED_CBSSTATUS)
            .cbsstatusdesc(UPDATED_CBSSTATUSDESC)
            .requestInstanttime(UPDATED_REQUEST_INSTANTTIME)
            .isomessagetype(UPDATED_ISOMESSAGETYPE)
            .requestjson(UPDATED_REQUESTJSON)
            .spsrequestxml(UPDATED_SPSREQUESTXML)
            .spsresponsexml(UPDATED_SPSRESPONSEXML)
            .amount(UPDATED_AMOUNT)
            .callbackstatus(UPDATED_CALLBACKSTATUS)
            .callbackstatusdesc(UPDATED_CALLBACKSTATUSDESC);

        restSPSOutgoingTransactionsMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedSPSOutgoingTransactions.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedSPSOutgoingTransactions))
            )
            .andExpect(status().isOk());

        // Validate the SPSOutgoingTransactions in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertSPSOutgoingTransactionsUpdatableFieldsEquals(
            partialUpdatedSPSOutgoingTransactions,
            getPersistedSPSOutgoingTransactions(partialUpdatedSPSOutgoingTransactions)
        );
    }

    @Test
    @Transactional
    void patchNonExistingSPSOutgoingTransactions() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        sPSOutgoingTransactions.setId(longCount.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSPSOutgoingTransactionsMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, sPSOutgoingTransactions.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(sPSOutgoingTransactions))
            )
            .andExpect(status().isBadRequest());

        // Validate the SPSOutgoingTransactions in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchSPSOutgoingTransactions() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        sPSOutgoingTransactions.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restSPSOutgoingTransactionsMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(sPSOutgoingTransactions))
            )
            .andExpect(status().isBadRequest());

        // Validate the SPSOutgoingTransactions in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamSPSOutgoingTransactions() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        sPSOutgoingTransactions.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restSPSOutgoingTransactionsMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(om.writeValueAsBytes(sPSOutgoingTransactions))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the SPSOutgoingTransactions in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteSPSOutgoingTransactions() throws Exception {
        // Initialize the database
        insertedSPSOutgoingTransactions = sPSOutgoingTransactionsRepository.saveAndFlush(sPSOutgoingTransactions);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the sPSOutgoingTransactions
        restSPSOutgoingTransactionsMockMvc
            .perform(delete(ENTITY_API_URL_ID, sPSOutgoingTransactions.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return sPSOutgoingTransactionsRepository.count();
    }

    protected void assertIncrementedRepositoryCount(long countBefore) {
        assertThat(countBefore + 1).isEqualTo(getRepositoryCount());
    }

    protected void assertDecrementedRepositoryCount(long countBefore) {
        assertThat(countBefore - 1).isEqualTo(getRepositoryCount());
    }

    protected void assertSameRepositoryCount(long countBefore) {
        assertThat(countBefore).isEqualTo(getRepositoryCount());
    }

    protected SPSOutgoingTransactions getPersistedSPSOutgoingTransactions(SPSOutgoingTransactions sPSOutgoingTransactions) {
        return sPSOutgoingTransactionsRepository.findById(sPSOutgoingTransactions.getId()).orElseThrow();
    }

    protected void assertPersistedSPSOutgoingTransactionsToMatchAllProperties(SPSOutgoingTransactions expectedSPSOutgoingTransactions) {
        assertSPSOutgoingTransactionsAllPropertiesEquals(
            expectedSPSOutgoingTransactions,
            getPersistedSPSOutgoingTransactions(expectedSPSOutgoingTransactions)
        );
    }

    protected void assertPersistedSPSOutgoingTransactionsToMatchUpdatableProperties(
        SPSOutgoingTransactions expectedSPSOutgoingTransactions
    ) {
        assertSPSOutgoingTransactionsAllUpdatablePropertiesEquals(
            expectedSPSOutgoingTransactions,
            getPersistedSPSOutgoingTransactions(expectedSPSOutgoingTransactions)
        );
    }
}

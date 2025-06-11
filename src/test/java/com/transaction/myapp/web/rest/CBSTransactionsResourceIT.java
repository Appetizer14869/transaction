package com.transaction.myapp.web.rest;

import static com.transaction.myapp.domain.CBSTransactionsAsserts.*;
import static com.transaction.myapp.web.rest.TestUtil.createUpdateProxyForBean;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.transaction.myapp.IntegrationTest;
import com.transaction.myapp.domain.CBSTransactions;
import com.transaction.myapp.repository.CBSTransactionsRepository;
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
 * Integration tests for the {@link CBSTransactionsResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class CBSTransactionsResourceIT {

    private static final String DEFAULT_MESSAGEID = "AAAAAAAAAA";
    private static final String UPDATED_MESSAGEID = "BBBBBBBBBB";

    private static final String DEFAULT_CHANNELCODE = "AAAA";
    private static final String UPDATED_CHANNELCODE = "BBBB";

    private static final String DEFAULT_MESSAGETYPE = "AAA";
    private static final String UPDATED_MESSAGETYPE = "BBB";

    private static final String DEFAULT_TRANSCURRENCY = "AAA";
    private static final String UPDATED_TRANSCURRENCY = "BBB";

    private static final String DEFAULT_DEBTORSNAME = "AAAAAAAAAA";
    private static final String UPDATED_DEBTORSNAME = "BBBBBBBBBB";

    private static final String DEFAULT_DEBTORSACCOUNTID = "AAAAAAAAAA";
    private static final String UPDATED_DEBTORSACCOUNTID = "BBBBBBBBBB";

    private static final String DEFAULT_DEBTORSPHONE = "AAAAAAAAAA";
    private static final String UPDATED_DEBTORSPHONE = "BBBBBBBBBB";

    private static final String DEFAULT_CREDITORSNAME = "AAAAAAAAAA";
    private static final String UPDATED_CREDITORSNAME = "BBBBBBBBBB";

    private static final String DEFAULT_CREDITORSACCOUNTID = "AAAAAAAAAA";
    private static final String UPDATED_CREDITORSACCOUNTID = "BBBBBBBBBB";

    private static final String DEFAULT_CREDITORSPHONE = "AAAAAAAAAA";
    private static final String UPDATED_CREDITORSPHONE = "BBBBBBBBBB";

    private static final String DEFAULT_NARRATION = "AAAAAAAAAA";
    private static final String UPDATED_NARRATION = "BBBBBBBBBB";

    private static final String DEFAULT_EXTERNALREFERENCE = "AAAAAAAAAA";
    private static final String UPDATED_EXTERNALREFERENCE = "BBBBBBBBBB";

    private static final String DEFAULT_CBSREFERENCE = "AAAAAAAAAA";
    private static final String UPDATED_CBSREFERENCE = "BBBBBBBBBB";

    private static final String DEFAULT_CBSSTATUS = "AAAAAAAAAA";
    private static final String UPDATED_CBSSTATUS = "BBBBBBBBBB";

    private static final String DEFAULT_CBSSTATUSDESC = "AAAAAAAAAA";
    private static final String UPDATED_CBSSTATUSDESC = "BBBBBBBBBB";

    private static final Instant DEFAULT_REQUEST_INSTANTTIME = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_REQUEST_INSTANTTIME = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_REQUESTJSON = "AAAAAAAAAA";
    private static final String UPDATED_REQUESTJSON = "BBBBBBBBBB";

    private static final String DEFAULT_CBSREQUESTXML = "AAAAAAAAAA";
    private static final String UPDATED_CBSREQUESTXML = "BBBBBBBBBB";

    private static final String DEFAULT_CBSRESPONSEXML = "AAAAAAAAAA";
    private static final String UPDATED_CBSRESPONSEXML = "BBBBBBBBBB";

    private static final Double DEFAULT_AMOUNT = 1D;
    private static final Double UPDATED_AMOUNT = 2D;

    private static final String ENTITY_API_URL = "/api/cbs-transactions";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ObjectMapper om;

    @Autowired
    private CBSTransactionsRepository cBSTransactionsRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restCBSTransactionsMockMvc;

    private CBSTransactions cBSTransactions;

    private CBSTransactions insertedCBSTransactions;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CBSTransactions createEntity() {
        return new CBSTransactions()
            .messageid(DEFAULT_MESSAGEID)
            .channelcode(DEFAULT_CHANNELCODE)
            .messagetype(DEFAULT_MESSAGETYPE)
            .transcurrency(DEFAULT_TRANSCURRENCY)
            .debtorsname(DEFAULT_DEBTORSNAME)
            .debtorsaccountid(DEFAULT_DEBTORSACCOUNTID)
            .debtorsphone(DEFAULT_DEBTORSPHONE)
            .creditorsname(DEFAULT_CREDITORSNAME)
            .creditorsaccountid(DEFAULT_CREDITORSACCOUNTID)
            .creditorsphone(DEFAULT_CREDITORSPHONE)
            .narration(DEFAULT_NARRATION)
            .externalreference(DEFAULT_EXTERNALREFERENCE)
            .cbsreference(DEFAULT_CBSREFERENCE)
            .cbsstatus(DEFAULT_CBSSTATUS)
            .cbsstatusdesc(DEFAULT_CBSSTATUSDESC)
            .requestInstanttime(DEFAULT_REQUEST_INSTANTTIME)
            .requestjson(DEFAULT_REQUESTJSON)
            .cbsrequestxml(DEFAULT_CBSREQUESTXML)
            .cbsresponsexml(DEFAULT_CBSRESPONSEXML)
            .amount(DEFAULT_AMOUNT);
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CBSTransactions createUpdatedEntity() {
        return new CBSTransactions()
            .messageid(UPDATED_MESSAGEID)
            .channelcode(UPDATED_CHANNELCODE)
            .messagetype(UPDATED_MESSAGETYPE)
            .transcurrency(UPDATED_TRANSCURRENCY)
            .debtorsname(UPDATED_DEBTORSNAME)
            .debtorsaccountid(UPDATED_DEBTORSACCOUNTID)
            .debtorsphone(UPDATED_DEBTORSPHONE)
            .creditorsname(UPDATED_CREDITORSNAME)
            .creditorsaccountid(UPDATED_CREDITORSACCOUNTID)
            .creditorsphone(UPDATED_CREDITORSPHONE)
            .narration(UPDATED_NARRATION)
            .externalreference(UPDATED_EXTERNALREFERENCE)
            .cbsreference(UPDATED_CBSREFERENCE)
            .cbsstatus(UPDATED_CBSSTATUS)
            .cbsstatusdesc(UPDATED_CBSSTATUSDESC)
            .requestInstanttime(UPDATED_REQUEST_INSTANTTIME)
            .requestjson(UPDATED_REQUESTJSON)
            .cbsrequestxml(UPDATED_CBSREQUESTXML)
            .cbsresponsexml(UPDATED_CBSRESPONSEXML)
            .amount(UPDATED_AMOUNT);
    }

    @BeforeEach
    void initTest() {
        cBSTransactions = createEntity();
    }

    @AfterEach
    void cleanup() {
        if (insertedCBSTransactions != null) {
            cBSTransactionsRepository.delete(insertedCBSTransactions);
            insertedCBSTransactions = null;
        }
    }

    @Test
    @Transactional
    void createCBSTransactions() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the CBSTransactions
        var returnedCBSTransactions = om.readValue(
            restCBSTransactionsMockMvc
                .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(cBSTransactions)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            CBSTransactions.class
        );

        // Validate the CBSTransactions in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        assertCBSTransactionsUpdatableFieldsEquals(returnedCBSTransactions, getPersistedCBSTransactions(returnedCBSTransactions));

        insertedCBSTransactions = returnedCBSTransactions;
    }

    @Test
    @Transactional
    void createCBSTransactionsWithExistingId() throws Exception {
        // Create the CBSTransactions with an existing ID
        cBSTransactions.setId(1L);

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restCBSTransactionsMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(cBSTransactions)))
            .andExpect(status().isBadRequest());

        // Validate the CBSTransactions in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllCBSTransactions() throws Exception {
        // Initialize the database
        insertedCBSTransactions = cBSTransactionsRepository.saveAndFlush(cBSTransactions);

        // Get all the cBSTransactionsList
        restCBSTransactionsMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(cBSTransactions.getId().intValue())))
            .andExpect(jsonPath("$.[*].messageid").value(hasItem(DEFAULT_MESSAGEID)))
            .andExpect(jsonPath("$.[*].channelcode").value(hasItem(DEFAULT_CHANNELCODE)))
            .andExpect(jsonPath("$.[*].messagetype").value(hasItem(DEFAULT_MESSAGETYPE)))
            .andExpect(jsonPath("$.[*].transcurrency").value(hasItem(DEFAULT_TRANSCURRENCY)))
            .andExpect(jsonPath("$.[*].debtorsname").value(hasItem(DEFAULT_DEBTORSNAME)))
            .andExpect(jsonPath("$.[*].debtorsaccountid").value(hasItem(DEFAULT_DEBTORSACCOUNTID)))
            .andExpect(jsonPath("$.[*].debtorsphone").value(hasItem(DEFAULT_DEBTORSPHONE)))
            .andExpect(jsonPath("$.[*].creditorsname").value(hasItem(DEFAULT_CREDITORSNAME)))
            .andExpect(jsonPath("$.[*].creditorsaccountid").value(hasItem(DEFAULT_CREDITORSACCOUNTID)))
            .andExpect(jsonPath("$.[*].creditorsphone").value(hasItem(DEFAULT_CREDITORSPHONE)))
            .andExpect(jsonPath("$.[*].narration").value(hasItem(DEFAULT_NARRATION)))
            .andExpect(jsonPath("$.[*].externalreference").value(hasItem(DEFAULT_EXTERNALREFERENCE)))
            .andExpect(jsonPath("$.[*].cbsreference").value(hasItem(DEFAULT_CBSREFERENCE)))
            .andExpect(jsonPath("$.[*].cbsstatus").value(hasItem(DEFAULT_CBSSTATUS)))
            .andExpect(jsonPath("$.[*].cbsstatusdesc").value(hasItem(DEFAULT_CBSSTATUSDESC)))
            .andExpect(jsonPath("$.[*].requestInstanttime").value(hasItem(DEFAULT_REQUEST_INSTANTTIME.toString())))
            .andExpect(jsonPath("$.[*].requestjson").value(hasItem(DEFAULT_REQUESTJSON)))
            .andExpect(jsonPath("$.[*].cbsrequestxml").value(hasItem(DEFAULT_CBSREQUESTXML)))
            .andExpect(jsonPath("$.[*].cbsresponsexml").value(hasItem(DEFAULT_CBSRESPONSEXML)))
            .andExpect(jsonPath("$.[*].amount").value(hasItem(DEFAULT_AMOUNT)));
    }

    @Test
    @Transactional
    void getCBSTransactions() throws Exception {
        // Initialize the database
        insertedCBSTransactions = cBSTransactionsRepository.saveAndFlush(cBSTransactions);

        // Get the cBSTransactions
        restCBSTransactionsMockMvc
            .perform(get(ENTITY_API_URL_ID, cBSTransactions.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(cBSTransactions.getId().intValue()))
            .andExpect(jsonPath("$.messageid").value(DEFAULT_MESSAGEID))
            .andExpect(jsonPath("$.channelcode").value(DEFAULT_CHANNELCODE))
            .andExpect(jsonPath("$.messagetype").value(DEFAULT_MESSAGETYPE))
            .andExpect(jsonPath("$.transcurrency").value(DEFAULT_TRANSCURRENCY))
            .andExpect(jsonPath("$.debtorsname").value(DEFAULT_DEBTORSNAME))
            .andExpect(jsonPath("$.debtorsaccountid").value(DEFAULT_DEBTORSACCOUNTID))
            .andExpect(jsonPath("$.debtorsphone").value(DEFAULT_DEBTORSPHONE))
            .andExpect(jsonPath("$.creditorsname").value(DEFAULT_CREDITORSNAME))
            .andExpect(jsonPath("$.creditorsaccountid").value(DEFAULT_CREDITORSACCOUNTID))
            .andExpect(jsonPath("$.creditorsphone").value(DEFAULT_CREDITORSPHONE))
            .andExpect(jsonPath("$.narration").value(DEFAULT_NARRATION))
            .andExpect(jsonPath("$.externalreference").value(DEFAULT_EXTERNALREFERENCE))
            .andExpect(jsonPath("$.cbsreference").value(DEFAULT_CBSREFERENCE))
            .andExpect(jsonPath("$.cbsstatus").value(DEFAULT_CBSSTATUS))
            .andExpect(jsonPath("$.cbsstatusdesc").value(DEFAULT_CBSSTATUSDESC))
            .andExpect(jsonPath("$.requestInstanttime").value(DEFAULT_REQUEST_INSTANTTIME.toString()))
            .andExpect(jsonPath("$.requestjson").value(DEFAULT_REQUESTJSON))
            .andExpect(jsonPath("$.cbsrequestxml").value(DEFAULT_CBSREQUESTXML))
            .andExpect(jsonPath("$.cbsresponsexml").value(DEFAULT_CBSRESPONSEXML))
            .andExpect(jsonPath("$.amount").value(DEFAULT_AMOUNT));
    }

    @Test
    @Transactional
    void getNonExistingCBSTransactions() throws Exception {
        // Get the cBSTransactions
        restCBSTransactionsMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingCBSTransactions() throws Exception {
        // Initialize the database
        insertedCBSTransactions = cBSTransactionsRepository.saveAndFlush(cBSTransactions);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the cBSTransactions
        CBSTransactions updatedCBSTransactions = cBSTransactionsRepository.findById(cBSTransactions.getId()).orElseThrow();
        // Disconnect from session so that the updates on updatedCBSTransactions are not directly saved in db
        em.detach(updatedCBSTransactions);
        updatedCBSTransactions
            .messageid(UPDATED_MESSAGEID)
            .channelcode(UPDATED_CHANNELCODE)
            .messagetype(UPDATED_MESSAGETYPE)
            .transcurrency(UPDATED_TRANSCURRENCY)
            .debtorsname(UPDATED_DEBTORSNAME)
            .debtorsaccountid(UPDATED_DEBTORSACCOUNTID)
            .debtorsphone(UPDATED_DEBTORSPHONE)
            .creditorsname(UPDATED_CREDITORSNAME)
            .creditorsaccountid(UPDATED_CREDITORSACCOUNTID)
            .creditorsphone(UPDATED_CREDITORSPHONE)
            .narration(UPDATED_NARRATION)
            .externalreference(UPDATED_EXTERNALREFERENCE)
            .cbsreference(UPDATED_CBSREFERENCE)
            .cbsstatus(UPDATED_CBSSTATUS)
            .cbsstatusdesc(UPDATED_CBSSTATUSDESC)
            .requestInstanttime(UPDATED_REQUEST_INSTANTTIME)
            .requestjson(UPDATED_REQUESTJSON)
            .cbsrequestxml(UPDATED_CBSREQUESTXML)
            .cbsresponsexml(UPDATED_CBSRESPONSEXML)
            .amount(UPDATED_AMOUNT);

        restCBSTransactionsMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedCBSTransactions.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(updatedCBSTransactions))
            )
            .andExpect(status().isOk());

        // Validate the CBSTransactions in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedCBSTransactionsToMatchAllProperties(updatedCBSTransactions);
    }

    @Test
    @Transactional
    void putNonExistingCBSTransactions() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        cBSTransactions.setId(longCount.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCBSTransactionsMockMvc
            .perform(
                put(ENTITY_API_URL_ID, cBSTransactions.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(cBSTransactions))
            )
            .andExpect(status().isBadRequest());

        // Validate the CBSTransactions in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchCBSTransactions() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        cBSTransactions.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCBSTransactionsMockMvc
            .perform(
                put(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(cBSTransactions))
            )
            .andExpect(status().isBadRequest());

        // Validate the CBSTransactions in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamCBSTransactions() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        cBSTransactions.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCBSTransactionsMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(cBSTransactions)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the CBSTransactions in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateCBSTransactionsWithPatch() throws Exception {
        // Initialize the database
        insertedCBSTransactions = cBSTransactionsRepository.saveAndFlush(cBSTransactions);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the cBSTransactions using partial update
        CBSTransactions partialUpdatedCBSTransactions = new CBSTransactions();
        partialUpdatedCBSTransactions.setId(cBSTransactions.getId());

        partialUpdatedCBSTransactions
            .messageid(UPDATED_MESSAGEID)
            .debtorsname(UPDATED_DEBTORSNAME)
            .debtorsphone(UPDATED_DEBTORSPHONE)
            .creditorsaccountid(UPDATED_CREDITORSACCOUNTID)
            .creditorsphone(UPDATED_CREDITORSPHONE)
            .narration(UPDATED_NARRATION)
            .cbsreference(UPDATED_CBSREFERENCE)
            .cbsstatus(UPDATED_CBSSTATUS)
            .amount(UPDATED_AMOUNT);

        restCBSTransactionsMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCBSTransactions.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedCBSTransactions))
            )
            .andExpect(status().isOk());

        // Validate the CBSTransactions in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertCBSTransactionsUpdatableFieldsEquals(
            createUpdateProxyForBean(partialUpdatedCBSTransactions, cBSTransactions),
            getPersistedCBSTransactions(cBSTransactions)
        );
    }

    @Test
    @Transactional
    void fullUpdateCBSTransactionsWithPatch() throws Exception {
        // Initialize the database
        insertedCBSTransactions = cBSTransactionsRepository.saveAndFlush(cBSTransactions);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the cBSTransactions using partial update
        CBSTransactions partialUpdatedCBSTransactions = new CBSTransactions();
        partialUpdatedCBSTransactions.setId(cBSTransactions.getId());

        partialUpdatedCBSTransactions
            .messageid(UPDATED_MESSAGEID)
            .channelcode(UPDATED_CHANNELCODE)
            .messagetype(UPDATED_MESSAGETYPE)
            .transcurrency(UPDATED_TRANSCURRENCY)
            .debtorsname(UPDATED_DEBTORSNAME)
            .debtorsaccountid(UPDATED_DEBTORSACCOUNTID)
            .debtorsphone(UPDATED_DEBTORSPHONE)
            .creditorsname(UPDATED_CREDITORSNAME)
            .creditorsaccountid(UPDATED_CREDITORSACCOUNTID)
            .creditorsphone(UPDATED_CREDITORSPHONE)
            .narration(UPDATED_NARRATION)
            .externalreference(UPDATED_EXTERNALREFERENCE)
            .cbsreference(UPDATED_CBSREFERENCE)
            .cbsstatus(UPDATED_CBSSTATUS)
            .cbsstatusdesc(UPDATED_CBSSTATUSDESC)
            .requestInstanttime(UPDATED_REQUEST_INSTANTTIME)
            .requestjson(UPDATED_REQUESTJSON)
            .cbsrequestxml(UPDATED_CBSREQUESTXML)
            .cbsresponsexml(UPDATED_CBSRESPONSEXML)
            .amount(UPDATED_AMOUNT);

        restCBSTransactionsMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCBSTransactions.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedCBSTransactions))
            )
            .andExpect(status().isOk());

        // Validate the CBSTransactions in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertCBSTransactionsUpdatableFieldsEquals(
            partialUpdatedCBSTransactions,
            getPersistedCBSTransactions(partialUpdatedCBSTransactions)
        );
    }

    @Test
    @Transactional
    void patchNonExistingCBSTransactions() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        cBSTransactions.setId(longCount.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCBSTransactionsMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, cBSTransactions.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(cBSTransactions))
            )
            .andExpect(status().isBadRequest());

        // Validate the CBSTransactions in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchCBSTransactions() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        cBSTransactions.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCBSTransactionsMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(cBSTransactions))
            )
            .andExpect(status().isBadRequest());

        // Validate the CBSTransactions in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamCBSTransactions() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        cBSTransactions.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCBSTransactionsMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(om.writeValueAsBytes(cBSTransactions)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the CBSTransactions in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteCBSTransactions() throws Exception {
        // Initialize the database
        insertedCBSTransactions = cBSTransactionsRepository.saveAndFlush(cBSTransactions);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the cBSTransactions
        restCBSTransactionsMockMvc
            .perform(delete(ENTITY_API_URL_ID, cBSTransactions.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return cBSTransactionsRepository.count();
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

    protected CBSTransactions getPersistedCBSTransactions(CBSTransactions cBSTransactions) {
        return cBSTransactionsRepository.findById(cBSTransactions.getId()).orElseThrow();
    }

    protected void assertPersistedCBSTransactionsToMatchAllProperties(CBSTransactions expectedCBSTransactions) {
        assertCBSTransactionsAllPropertiesEquals(expectedCBSTransactions, getPersistedCBSTransactions(expectedCBSTransactions));
    }

    protected void assertPersistedCBSTransactionsToMatchUpdatableProperties(CBSTransactions expectedCBSTransactions) {
        assertCBSTransactionsAllUpdatablePropertiesEquals(expectedCBSTransactions, getPersistedCBSTransactions(expectedCBSTransactions));
    }
}

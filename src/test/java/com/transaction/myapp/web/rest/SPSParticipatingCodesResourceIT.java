package com.transaction.myapp.web.rest;

import static com.transaction.myapp.domain.SPSParticipatingCodesAsserts.*;
import static com.transaction.myapp.web.rest.TestUtil.createUpdateProxyForBean;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.transaction.myapp.IntegrationTest;
import com.transaction.myapp.domain.SPSParticipatingCodes;
import com.transaction.myapp.repository.SPSParticipatingCodesRepository;
import jakarta.persistence.EntityManager;
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
 * Integration tests for the {@link SPSParticipatingCodesResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class SPSParticipatingCodesResourceIT {

    private static final String DEFAULT_BICCODE = "AAAAAAAA";
    private static final String UPDATED_BICCODE = "BBBBBBBB";

    private static final String DEFAULT_BICNAME = "AAAAAAAAAA";
    private static final String UPDATED_BICNAME = "BBBBBBBBBB";

    private static final String DEFAULT_BICSTATUS = "AAAAAAAAAA";
    private static final String UPDATED_BICSTATUS = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/sps-participating-codes";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ObjectMapper om;

    @Autowired
    private SPSParticipatingCodesRepository sPSParticipatingCodesRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restSPSParticipatingCodesMockMvc;

    private SPSParticipatingCodes sPSParticipatingCodes;

    private SPSParticipatingCodes insertedSPSParticipatingCodes;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static SPSParticipatingCodes createEntity() {
        return new SPSParticipatingCodes().biccode(DEFAULT_BICCODE).bicname(DEFAULT_BICNAME).bicstatus(DEFAULT_BICSTATUS);
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static SPSParticipatingCodes createUpdatedEntity() {
        return new SPSParticipatingCodes().biccode(UPDATED_BICCODE).bicname(UPDATED_BICNAME).bicstatus(UPDATED_BICSTATUS);
    }

    @BeforeEach
    void initTest() {
        sPSParticipatingCodes = createEntity();
    }

    @AfterEach
    void cleanup() {
        if (insertedSPSParticipatingCodes != null) {
            sPSParticipatingCodesRepository.delete(insertedSPSParticipatingCodes);
            insertedSPSParticipatingCodes = null;
        }
    }

    @Test
    @Transactional
    void createSPSParticipatingCodes() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the SPSParticipatingCodes
        var returnedSPSParticipatingCodes = om.readValue(
            restSPSParticipatingCodesMockMvc
                .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(sPSParticipatingCodes)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            SPSParticipatingCodes.class
        );

        // Validate the SPSParticipatingCodes in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        assertSPSParticipatingCodesUpdatableFieldsEquals(
            returnedSPSParticipatingCodes,
            getPersistedSPSParticipatingCodes(returnedSPSParticipatingCodes)
        );

        insertedSPSParticipatingCodes = returnedSPSParticipatingCodes;
    }

    @Test
    @Transactional
    void createSPSParticipatingCodesWithExistingId() throws Exception {
        // Create the SPSParticipatingCodes with an existing ID
        sPSParticipatingCodes.setId(1L);

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restSPSParticipatingCodesMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(sPSParticipatingCodes)))
            .andExpect(status().isBadRequest());

        // Validate the SPSParticipatingCodes in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllSPSParticipatingCodes() throws Exception {
        // Initialize the database
        insertedSPSParticipatingCodes = sPSParticipatingCodesRepository.saveAndFlush(sPSParticipatingCodes);

        // Get all the sPSParticipatingCodesList
        restSPSParticipatingCodesMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(sPSParticipatingCodes.getId().intValue())))
            .andExpect(jsonPath("$.[*].biccode").value(hasItem(DEFAULT_BICCODE)))
            .andExpect(jsonPath("$.[*].bicname").value(hasItem(DEFAULT_BICNAME)))
            .andExpect(jsonPath("$.[*].bicstatus").value(hasItem(DEFAULT_BICSTATUS)));
    }

    @Test
    @Transactional
    void getSPSParticipatingCodes() throws Exception {
        // Initialize the database
        insertedSPSParticipatingCodes = sPSParticipatingCodesRepository.saveAndFlush(sPSParticipatingCodes);

        // Get the sPSParticipatingCodes
        restSPSParticipatingCodesMockMvc
            .perform(get(ENTITY_API_URL_ID, sPSParticipatingCodes.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(sPSParticipatingCodes.getId().intValue()))
            .andExpect(jsonPath("$.biccode").value(DEFAULT_BICCODE))
            .andExpect(jsonPath("$.bicname").value(DEFAULT_BICNAME))
            .andExpect(jsonPath("$.bicstatus").value(DEFAULT_BICSTATUS));
    }

    @Test
    @Transactional
    void getNonExistingSPSParticipatingCodes() throws Exception {
        // Get the sPSParticipatingCodes
        restSPSParticipatingCodesMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingSPSParticipatingCodes() throws Exception {
        // Initialize the database
        insertedSPSParticipatingCodes = sPSParticipatingCodesRepository.saveAndFlush(sPSParticipatingCodes);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the sPSParticipatingCodes
        SPSParticipatingCodes updatedSPSParticipatingCodes = sPSParticipatingCodesRepository
            .findById(sPSParticipatingCodes.getId())
            .orElseThrow();
        // Disconnect from session so that the updates on updatedSPSParticipatingCodes are not directly saved in db
        em.detach(updatedSPSParticipatingCodes);
        updatedSPSParticipatingCodes.biccode(UPDATED_BICCODE).bicname(UPDATED_BICNAME).bicstatus(UPDATED_BICSTATUS);

        restSPSParticipatingCodesMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedSPSParticipatingCodes.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(updatedSPSParticipatingCodes))
            )
            .andExpect(status().isOk());

        // Validate the SPSParticipatingCodes in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedSPSParticipatingCodesToMatchAllProperties(updatedSPSParticipatingCodes);
    }

    @Test
    @Transactional
    void putNonExistingSPSParticipatingCodes() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        sPSParticipatingCodes.setId(longCount.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSPSParticipatingCodesMockMvc
            .perform(
                put(ENTITY_API_URL_ID, sPSParticipatingCodes.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(sPSParticipatingCodes))
            )
            .andExpect(status().isBadRequest());

        // Validate the SPSParticipatingCodes in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchSPSParticipatingCodes() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        sPSParticipatingCodes.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restSPSParticipatingCodesMockMvc
            .perform(
                put(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(sPSParticipatingCodes))
            )
            .andExpect(status().isBadRequest());

        // Validate the SPSParticipatingCodes in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamSPSParticipatingCodes() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        sPSParticipatingCodes.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restSPSParticipatingCodesMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(sPSParticipatingCodes)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the SPSParticipatingCodes in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateSPSParticipatingCodesWithPatch() throws Exception {
        // Initialize the database
        insertedSPSParticipatingCodes = sPSParticipatingCodesRepository.saveAndFlush(sPSParticipatingCodes);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the sPSParticipatingCodes using partial update
        SPSParticipatingCodes partialUpdatedSPSParticipatingCodes = new SPSParticipatingCodes();
        partialUpdatedSPSParticipatingCodes.setId(sPSParticipatingCodes.getId());

        restSPSParticipatingCodesMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedSPSParticipatingCodes.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedSPSParticipatingCodes))
            )
            .andExpect(status().isOk());

        // Validate the SPSParticipatingCodes in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertSPSParticipatingCodesUpdatableFieldsEquals(
            createUpdateProxyForBean(partialUpdatedSPSParticipatingCodes, sPSParticipatingCodes),
            getPersistedSPSParticipatingCodes(sPSParticipatingCodes)
        );
    }

    @Test
    @Transactional
    void fullUpdateSPSParticipatingCodesWithPatch() throws Exception {
        // Initialize the database
        insertedSPSParticipatingCodes = sPSParticipatingCodesRepository.saveAndFlush(sPSParticipatingCodes);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the sPSParticipatingCodes using partial update
        SPSParticipatingCodes partialUpdatedSPSParticipatingCodes = new SPSParticipatingCodes();
        partialUpdatedSPSParticipatingCodes.setId(sPSParticipatingCodes.getId());

        partialUpdatedSPSParticipatingCodes.biccode(UPDATED_BICCODE).bicname(UPDATED_BICNAME).bicstatus(UPDATED_BICSTATUS);

        restSPSParticipatingCodesMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedSPSParticipatingCodes.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedSPSParticipatingCodes))
            )
            .andExpect(status().isOk());

        // Validate the SPSParticipatingCodes in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertSPSParticipatingCodesUpdatableFieldsEquals(
            partialUpdatedSPSParticipatingCodes,
            getPersistedSPSParticipatingCodes(partialUpdatedSPSParticipatingCodes)
        );
    }

    @Test
    @Transactional
    void patchNonExistingSPSParticipatingCodes() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        sPSParticipatingCodes.setId(longCount.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSPSParticipatingCodesMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, sPSParticipatingCodes.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(sPSParticipatingCodes))
            )
            .andExpect(status().isBadRequest());

        // Validate the SPSParticipatingCodes in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchSPSParticipatingCodes() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        sPSParticipatingCodes.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restSPSParticipatingCodesMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(sPSParticipatingCodes))
            )
            .andExpect(status().isBadRequest());

        // Validate the SPSParticipatingCodes in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamSPSParticipatingCodes() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        sPSParticipatingCodes.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restSPSParticipatingCodesMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(om.writeValueAsBytes(sPSParticipatingCodes)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the SPSParticipatingCodes in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteSPSParticipatingCodes() throws Exception {
        // Initialize the database
        insertedSPSParticipatingCodes = sPSParticipatingCodesRepository.saveAndFlush(sPSParticipatingCodes);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the sPSParticipatingCodes
        restSPSParticipatingCodesMockMvc
            .perform(delete(ENTITY_API_URL_ID, sPSParticipatingCodes.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return sPSParticipatingCodesRepository.count();
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

    protected SPSParticipatingCodes getPersistedSPSParticipatingCodes(SPSParticipatingCodes sPSParticipatingCodes) {
        return sPSParticipatingCodesRepository.findById(sPSParticipatingCodes.getId()).orElseThrow();
    }

    protected void assertPersistedSPSParticipatingCodesToMatchAllProperties(SPSParticipatingCodes expectedSPSParticipatingCodes) {
        assertSPSParticipatingCodesAllPropertiesEquals(
            expectedSPSParticipatingCodes,
            getPersistedSPSParticipatingCodes(expectedSPSParticipatingCodes)
        );
    }

    protected void assertPersistedSPSParticipatingCodesToMatchUpdatableProperties(SPSParticipatingCodes expectedSPSParticipatingCodes) {
        assertSPSParticipatingCodesAllUpdatablePropertiesEquals(
            expectedSPSParticipatingCodes,
            getPersistedSPSParticipatingCodes(expectedSPSParticipatingCodes)
        );
    }
}

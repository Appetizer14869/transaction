package com.transaction.myapp.domain;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A SPSParticipatingCodes.
 */
@Entity
@Table(name = "sps_participating_codes")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class SPSParticipatingCodes implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Size(max = 8)
    @Column(name = "biccode", length = 8)
    private String biccode;

    @Size(max = 12)
    @Column(name = "bicname", length = 12)
    private String bicname;

    @Size(max = 10)
    @Column(name = "bicstatus", length = 10)
    private String bicstatus;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public SPSParticipatingCodes id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getBiccode() {
        return this.biccode;
    }

    public SPSParticipatingCodes biccode(String biccode) {
        this.setBiccode(biccode);
        return this;
    }

    public void setBiccode(String biccode) {
        this.biccode = biccode;
    }

    public String getBicname() {
        return this.bicname;
    }

    public SPSParticipatingCodes bicname(String bicname) {
        this.setBicname(bicname);
        return this;
    }

    public void setBicname(String bicname) {
        this.bicname = bicname;
    }

    public String getBicstatus() {
        return this.bicstatus;
    }

    public SPSParticipatingCodes bicstatus(String bicstatus) {
        this.setBicstatus(bicstatus);
        return this;
    }

    public void setBicstatus(String bicstatus) {
        this.bicstatus = bicstatus;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof SPSParticipatingCodes)) {
            return false;
        }
        return getId() != null && getId().equals(((SPSParticipatingCodes) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "SPSParticipatingCodes{" +
            "id=" + getId() +
            ", biccode='" + getBiccode() + "'" +
            ", bicname='" + getBicname() + "'" +
            ", bicstatus='" + getBicstatus() + "'" +
            "}";
    }
}

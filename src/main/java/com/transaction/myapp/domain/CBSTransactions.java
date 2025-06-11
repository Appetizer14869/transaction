package com.transaction.myapp.domain;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.time.Instant;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A CBSTransactions.
 */
@Entity
@Table(name = "cbs_transactions")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class CBSTransactions implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Size(max = 14)
    @Column(name = "messageid", length = 14)
    private String messageid;

    @Size(max = 4)
    @Column(name = "channelcode", length = 4)
    private String channelcode;

    @Size(max = 3)
    @Column(name = "messagetype", length = 3)
    private String messagetype;

    @Size(max = 3)
    @Column(name = "transcurrency", length = 3)
    private String transcurrency;

    @Size(max = 100)
    @Column(name = "debtorsname", length = 100)
    private String debtorsname;

    @Size(max = 14)
    @Column(name = "debtorsaccountid", length = 14)
    private String debtorsaccountid;

    @Size(max = 14)
    @Column(name = "debtorsphone", length = 14)
    private String debtorsphone;

    @Size(max = 100)
    @Column(name = "creditorsname", length = 100)
    private String creditorsname;

    @Size(max = 14)
    @Column(name = "creditorsaccountid", length = 14)
    private String creditorsaccountid;

    @Size(max = 14)
    @Column(name = "creditorsphone", length = 14)
    private String creditorsphone;

    @Size(max = 100)
    @Column(name = "narration", length = 100)
    private String narration;

    @Size(max = 40)
    @Column(name = "externalreference", length = 40)
    private String externalreference;

    @Size(max = 40)
    @Column(name = "cbsreference", length = 40)
    private String cbsreference;

    @Size(max = 10)
    @Column(name = "cbsstatus", length = 10)
    private String cbsstatus;

    @Size(max = 200)
    @Column(name = "cbsstatusdesc", length = 200)
    private String cbsstatusdesc;

    @Column(name = "request_instanttime")
    private Instant requestInstanttime;

    @Column(name = "requestjson")
    private String requestjson;

    @Column(name = "cbsrequestxml")
    private String cbsrequestxml;

    @Column(name = "cbsresponsexml")
    private String cbsresponsexml;

    @Column(name = "amount")
    private Double amount;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public CBSTransactions id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMessageid() {
        return this.messageid;
    }

    public CBSTransactions messageid(String messageid) {
        this.setMessageid(messageid);
        return this;
    }

    public void setMessageid(String messageid) {
        this.messageid = messageid;
    }

    public String getChannelcode() {
        return this.channelcode;
    }

    public CBSTransactions channelcode(String channelcode) {
        this.setChannelcode(channelcode);
        return this;
    }

    public void setChannelcode(String channelcode) {
        this.channelcode = channelcode;
    }

    public String getMessagetype() {
        return this.messagetype;
    }

    public CBSTransactions messagetype(String messagetype) {
        this.setMessagetype(messagetype);
        return this;
    }

    public void setMessagetype(String messagetype) {
        this.messagetype = messagetype;
    }

    public String getTranscurrency() {
        return this.transcurrency;
    }

    public CBSTransactions transcurrency(String transcurrency) {
        this.setTranscurrency(transcurrency);
        return this;
    }

    public void setTranscurrency(String transcurrency) {
        this.transcurrency = transcurrency;
    }

    public String getDebtorsname() {
        return this.debtorsname;
    }

    public CBSTransactions debtorsname(String debtorsname) {
        this.setDebtorsname(debtorsname);
        return this;
    }

    public void setDebtorsname(String debtorsname) {
        this.debtorsname = debtorsname;
    }

    public String getDebtorsaccountid() {
        return this.debtorsaccountid;
    }

    public CBSTransactions debtorsaccountid(String debtorsaccountid) {
        this.setDebtorsaccountid(debtorsaccountid);
        return this;
    }

    public void setDebtorsaccountid(String debtorsaccountid) {
        this.debtorsaccountid = debtorsaccountid;
    }

    public String getDebtorsphone() {
        return this.debtorsphone;
    }

    public CBSTransactions debtorsphone(String debtorsphone) {
        this.setDebtorsphone(debtorsphone);
        return this;
    }

    public void setDebtorsphone(String debtorsphone) {
        this.debtorsphone = debtorsphone;
    }

    public String getCreditorsname() {
        return this.creditorsname;
    }

    public CBSTransactions creditorsname(String creditorsname) {
        this.setCreditorsname(creditorsname);
        return this;
    }

    public void setCreditorsname(String creditorsname) {
        this.creditorsname = creditorsname;
    }

    public String getCreditorsaccountid() {
        return this.creditorsaccountid;
    }

    public CBSTransactions creditorsaccountid(String creditorsaccountid) {
        this.setCreditorsaccountid(creditorsaccountid);
        return this;
    }

    public void setCreditorsaccountid(String creditorsaccountid) {
        this.creditorsaccountid = creditorsaccountid;
    }

    public String getCreditorsphone() {
        return this.creditorsphone;
    }

    public CBSTransactions creditorsphone(String creditorsphone) {
        this.setCreditorsphone(creditorsphone);
        return this;
    }

    public void setCreditorsphone(String creditorsphone) {
        this.creditorsphone = creditorsphone;
    }

    public String getNarration() {
        return this.narration;
    }

    public CBSTransactions narration(String narration) {
        this.setNarration(narration);
        return this;
    }

    public void setNarration(String narration) {
        this.narration = narration;
    }

    public String getExternalreference() {
        return this.externalreference;
    }

    public CBSTransactions externalreference(String externalreference) {
        this.setExternalreference(externalreference);
        return this;
    }

    public void setExternalreference(String externalreference) {
        this.externalreference = externalreference;
    }

    public String getCbsreference() {
        return this.cbsreference;
    }

    public CBSTransactions cbsreference(String cbsreference) {
        this.setCbsreference(cbsreference);
        return this;
    }

    public void setCbsreference(String cbsreference) {
        this.cbsreference = cbsreference;
    }

    public String getCbsstatus() {
        return this.cbsstatus;
    }

    public CBSTransactions cbsstatus(String cbsstatus) {
        this.setCbsstatus(cbsstatus);
        return this;
    }

    public void setCbsstatus(String cbsstatus) {
        this.cbsstatus = cbsstatus;
    }

    public String getCbsstatusdesc() {
        return this.cbsstatusdesc;
    }

    public CBSTransactions cbsstatusdesc(String cbsstatusdesc) {
        this.setCbsstatusdesc(cbsstatusdesc);
        return this;
    }

    public void setCbsstatusdesc(String cbsstatusdesc) {
        this.cbsstatusdesc = cbsstatusdesc;
    }

    public Instant getRequestInstanttime() {
        return this.requestInstanttime;
    }

    public CBSTransactions requestInstanttime(Instant requestInstanttime) {
        this.setRequestInstanttime(requestInstanttime);
        return this;
    }

    public void setRequestInstanttime(Instant requestInstanttime) {
        this.requestInstanttime = requestInstanttime;
    }

    public String getRequestjson() {
        return this.requestjson;
    }

    public CBSTransactions requestjson(String requestjson) {
        this.setRequestjson(requestjson);
        return this;
    }

    public void setRequestjson(String requestjson) {
        this.requestjson = requestjson;
    }

    public String getCbsrequestxml() {
        return this.cbsrequestxml;
    }

    public CBSTransactions cbsrequestxml(String cbsrequestxml) {
        this.setCbsrequestxml(cbsrequestxml);
        return this;
    }

    public void setCbsrequestxml(String cbsrequestxml) {
        this.cbsrequestxml = cbsrequestxml;
    }

    public String getCbsresponsexml() {
        return this.cbsresponsexml;
    }

    public CBSTransactions cbsresponsexml(String cbsresponsexml) {
        this.setCbsresponsexml(cbsresponsexml);
        return this;
    }

    public void setCbsresponsexml(String cbsresponsexml) {
        this.cbsresponsexml = cbsresponsexml;
    }

    public Double getAmount() {
        return this.amount;
    }

    public CBSTransactions amount(Double amount) {
        this.setAmount(amount);
        return this;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof CBSTransactions)) {
            return false;
        }
        return getId() != null && getId().equals(((CBSTransactions) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "CBSTransactions{" +
            "id=" + getId() +
            ", messageid='" + getMessageid() + "'" +
            ", channelcode='" + getChannelcode() + "'" +
            ", messagetype='" + getMessagetype() + "'" +
            ", transcurrency='" + getTranscurrency() + "'" +
            ", debtorsname='" + getDebtorsname() + "'" +
            ", debtorsaccountid='" + getDebtorsaccountid() + "'" +
            ", debtorsphone='" + getDebtorsphone() + "'" +
            ", creditorsname='" + getCreditorsname() + "'" +
            ", creditorsaccountid='" + getCreditorsaccountid() + "'" +
            ", creditorsphone='" + getCreditorsphone() + "'" +
            ", narration='" + getNarration() + "'" +
            ", externalreference='" + getExternalreference() + "'" +
            ", cbsreference='" + getCbsreference() + "'" +
            ", cbsstatus='" + getCbsstatus() + "'" +
            ", cbsstatusdesc='" + getCbsstatusdesc() + "'" +
            ", requestInstanttime='" + getRequestInstanttime() + "'" +
            ", requestjson='" + getRequestjson() + "'" +
            ", cbsrequestxml='" + getCbsrequestxml() + "'" +
            ", cbsresponsexml='" + getCbsresponsexml() + "'" +
            ", amount=" + getAmount() +
            "}";
    }
}

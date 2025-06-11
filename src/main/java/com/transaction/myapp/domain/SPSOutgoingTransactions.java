package com.transaction.myapp.domain;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.time.Instant;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A SPSOutgoingTransactions.
 */
@Entity
@Table(name = "sps_outgoing_transactions")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class SPSOutgoingTransactions implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Size(max = 40)
    @Column(name = "messageid", length = 40)
    private String messageid;

    @Size(max = 16)
    @Column(name = "channelcode", length = 16)
    private String channelcode;

    @Size(max = 100)
    @Column(name = "callbackurl", length = 100)
    private String callbackurl;

    @Size(max = 28)
    @Column(name = "messagetype", length = 28)
    private String messagetype;

    @Size(max = 10)
    @Column(name = "transcurrency", length = 10)
    private String transcurrency;

    @Size(max = 100)
    @Column(name = "debtorsname", length = 100)
    private String debtorsname;

    @Size(max = 30)
    @Column(name = "debtorsaccountid", length = 30)
    private String debtorsaccountid;

    @Size(max = 18)
    @Column(name = "debtorsbankcode", length = 18)
    private String debtorsbankcode;

    @Size(max = 19)
    @Column(name = "debtorsphone", length = 19)
    private String debtorsphone;

    @Size(max = 100)
    @Column(name = "beneficiaryname", length = 100)
    private String beneficiaryname;

    @Size(max = 30)
    @Column(name = "beneficiaryaccountid", length = 30)
    private String beneficiaryaccountid;

    @Size(max = 19)
    @Column(name = "beneficiarybankcode", length = 19)
    private String beneficiarybankcode;

    @Size(max = 19)
    @Column(name = "beneficiaryphone", length = 19)
    private String beneficiaryphone;

    @Size(max = 100)
    @Column(name = "narration", length = 100)
    private String narration;

    @Size(max = 40)
    @Column(name = "externalreference", length = 40)
    private String externalreference;

    @Size(max = 40)
    @Column(name = "cbsreference", length = 40)
    private String cbsreference;

    @Size(max = 40)
    @Column(name = "messageendtoendid", length = 40)
    private String messageendtoendid;

    @Size(max = 19)
    @Column(name = "transactionstatus", length = 19)
    private String transactionstatus;

    @Size(max = 200)
    @Column(name = "transactionstatusdesc", length = 200)
    private String transactionstatusdesc;

    @Size(max = 19)
    @Column(name = "spsstatus", length = 19)
    private String spsstatus;

    @Size(max = 200)
    @Column(name = "spsstatusdesc", length = 200)
    private String spsstatusdesc;

    @Size(max = 19)
    @Column(name = "cbsstatus", length = 19)
    private String cbsstatus;

    @Size(max = 200)
    @Column(name = "cbsstatusdesc", length = 200)
    private String cbsstatusdesc;

    @Column(name = "request_instanttime")
    private Instant requestInstanttime;

    @Size(max = 29)
    @Column(name = "isomessagetype", length = 29)
    private String isomessagetype;

    @Column(name = "requestjson")
    private String requestjson;

    @Column(name = "spsrequestxml")
    private String spsrequestxml;

    @Column(name = "spsresponsexml")
    private String spsresponsexml;

    @Column(name = "amount")
    private Double amount;

    @Size(max = 10)
    @Column(name = "callbackstatus", length = 10)
    private String callbackstatus;

    @Size(max = 100)
    @Column(name = "callbackstatusdesc", length = 100)
    private String callbackstatusdesc;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public SPSOutgoingTransactions id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMessageid() {
        return this.messageid;
    }

    public SPSOutgoingTransactions messageid(String messageid) {
        this.setMessageid(messageid);
        return this;
    }

    public void setMessageid(String messageid) {
        this.messageid = messageid;
    }

    public String getChannelcode() {
        return this.channelcode;
    }

    public SPSOutgoingTransactions channelcode(String channelcode) {
        this.setChannelcode(channelcode);
        return this;
    }

    public void setChannelcode(String channelcode) {
        this.channelcode = channelcode;
    }

    public String getCallbackurl() {
        return this.callbackurl;
    }

    public SPSOutgoingTransactions callbackurl(String callbackurl) {
        this.setCallbackurl(callbackurl);
        return this;
    }

    public void setCallbackurl(String callbackurl) {
        this.callbackurl = callbackurl;
    }

    public String getMessagetype() {
        return this.messagetype;
    }

    public SPSOutgoingTransactions messagetype(String messagetype) {
        this.setMessagetype(messagetype);
        return this;
    }

    public void setMessagetype(String messagetype) {
        this.messagetype = messagetype;
    }

    public String getTranscurrency() {
        return this.transcurrency;
    }

    public SPSOutgoingTransactions transcurrency(String transcurrency) {
        this.setTranscurrency(transcurrency);
        return this;
    }

    public void setTranscurrency(String transcurrency) {
        this.transcurrency = transcurrency;
    }

    public String getDebtorsname() {
        return this.debtorsname;
    }

    public SPSOutgoingTransactions debtorsname(String debtorsname) {
        this.setDebtorsname(debtorsname);
        return this;
    }

    public void setDebtorsname(String debtorsname) {
        this.debtorsname = debtorsname;
    }

    public String getDebtorsaccountid() {
        return this.debtorsaccountid;
    }

    public SPSOutgoingTransactions debtorsaccountid(String debtorsaccountid) {
        this.setDebtorsaccountid(debtorsaccountid);
        return this;
    }

    public void setDebtorsaccountid(String debtorsaccountid) {
        this.debtorsaccountid = debtorsaccountid;
    }

    public String getDebtorsbankcode() {
        return this.debtorsbankcode;
    }

    public SPSOutgoingTransactions debtorsbankcode(String debtorsbankcode) {
        this.setDebtorsbankcode(debtorsbankcode);
        return this;
    }

    public void setDebtorsbankcode(String debtorsbankcode) {
        this.debtorsbankcode = debtorsbankcode;
    }

    public String getDebtorsphone() {
        return this.debtorsphone;
    }

    public SPSOutgoingTransactions debtorsphone(String debtorsphone) {
        this.setDebtorsphone(debtorsphone);
        return this;
    }

    public void setDebtorsphone(String debtorsphone) {
        this.debtorsphone = debtorsphone;
    }

    public String getBeneficiaryname() {
        return this.beneficiaryname;
    }

    public SPSOutgoingTransactions beneficiaryname(String beneficiaryname) {
        this.setBeneficiaryname(beneficiaryname);
        return this;
    }

    public void setBeneficiaryname(String beneficiaryname) {
        this.beneficiaryname = beneficiaryname;
    }

    public String getBeneficiaryaccountid() {
        return this.beneficiaryaccountid;
    }

    public SPSOutgoingTransactions beneficiaryaccountid(String beneficiaryaccountid) {
        this.setBeneficiaryaccountid(beneficiaryaccountid);
        return this;
    }

    public void setBeneficiaryaccountid(String beneficiaryaccountid) {
        this.beneficiaryaccountid = beneficiaryaccountid;
    }

    public String getBeneficiarybankcode() {
        return this.beneficiarybankcode;
    }

    public SPSOutgoingTransactions beneficiarybankcode(String beneficiarybankcode) {
        this.setBeneficiarybankcode(beneficiarybankcode);
        return this;
    }

    public void setBeneficiarybankcode(String beneficiarybankcode) {
        this.beneficiarybankcode = beneficiarybankcode;
    }

    public String getBeneficiaryphone() {
        return this.beneficiaryphone;
    }

    public SPSOutgoingTransactions beneficiaryphone(String beneficiaryphone) {
        this.setBeneficiaryphone(beneficiaryphone);
        return this;
    }

    public void setBeneficiaryphone(String beneficiaryphone) {
        this.beneficiaryphone = beneficiaryphone;
    }

    public String getNarration() {
        return this.narration;
    }

    public SPSOutgoingTransactions narration(String narration) {
        this.setNarration(narration);
        return this;
    }

    public void setNarration(String narration) {
        this.narration = narration;
    }

    public String getExternalreference() {
        return this.externalreference;
    }

    public SPSOutgoingTransactions externalreference(String externalreference) {
        this.setExternalreference(externalreference);
        return this;
    }

    public void setExternalreference(String externalreference) {
        this.externalreference = externalreference;
    }

    public String getCbsreference() {
        return this.cbsreference;
    }

    public SPSOutgoingTransactions cbsreference(String cbsreference) {
        this.setCbsreference(cbsreference);
        return this;
    }

    public void setCbsreference(String cbsreference) {
        this.cbsreference = cbsreference;
    }

    public String getMessageendtoendid() {
        return this.messageendtoendid;
    }

    public SPSOutgoingTransactions messageendtoendid(String messageendtoendid) {
        this.setMessageendtoendid(messageendtoendid);
        return this;
    }

    public void setMessageendtoendid(String messageendtoendid) {
        this.messageendtoendid = messageendtoendid;
    }

    public String getTransactionstatus() {
        return this.transactionstatus;
    }

    public SPSOutgoingTransactions transactionstatus(String transactionstatus) {
        this.setTransactionstatus(transactionstatus);
        return this;
    }

    public void setTransactionstatus(String transactionstatus) {
        this.transactionstatus = transactionstatus;
    }

    public String getTransactionstatusdesc() {
        return this.transactionstatusdesc;
    }

    public SPSOutgoingTransactions transactionstatusdesc(String transactionstatusdesc) {
        this.setTransactionstatusdesc(transactionstatusdesc);
        return this;
    }

    public void setTransactionstatusdesc(String transactionstatusdesc) {
        this.transactionstatusdesc = transactionstatusdesc;
    }

    public String getSpsstatus() {
        return this.spsstatus;
    }

    public SPSOutgoingTransactions spsstatus(String spsstatus) {
        this.setSpsstatus(spsstatus);
        return this;
    }

    public void setSpsstatus(String spsstatus) {
        this.spsstatus = spsstatus;
    }

    public String getSpsstatusdesc() {
        return this.spsstatusdesc;
    }

    public SPSOutgoingTransactions spsstatusdesc(String spsstatusdesc) {
        this.setSpsstatusdesc(spsstatusdesc);
        return this;
    }

    public void setSpsstatusdesc(String spsstatusdesc) {
        this.spsstatusdesc = spsstatusdesc;
    }

    public String getCbsstatus() {
        return this.cbsstatus;
    }

    public SPSOutgoingTransactions cbsstatus(String cbsstatus) {
        this.setCbsstatus(cbsstatus);
        return this;
    }

    public void setCbsstatus(String cbsstatus) {
        this.cbsstatus = cbsstatus;
    }

    public String getCbsstatusdesc() {
        return this.cbsstatusdesc;
    }

    public SPSOutgoingTransactions cbsstatusdesc(String cbsstatusdesc) {
        this.setCbsstatusdesc(cbsstatusdesc);
        return this;
    }

    public void setCbsstatusdesc(String cbsstatusdesc) {
        this.cbsstatusdesc = cbsstatusdesc;
    }

    public Instant getRequestInstanttime() {
        return this.requestInstanttime;
    }

    public SPSOutgoingTransactions requestInstanttime(Instant requestInstanttime) {
        this.setRequestInstanttime(requestInstanttime);
        return this;
    }

    public void setRequestInstanttime(Instant requestInstanttime) {
        this.requestInstanttime = requestInstanttime;
    }

    public String getIsomessagetype() {
        return this.isomessagetype;
    }

    public SPSOutgoingTransactions isomessagetype(String isomessagetype) {
        this.setIsomessagetype(isomessagetype);
        return this;
    }

    public void setIsomessagetype(String isomessagetype) {
        this.isomessagetype = isomessagetype;
    }

    public String getRequestjson() {
        return this.requestjson;
    }

    public SPSOutgoingTransactions requestjson(String requestjson) {
        this.setRequestjson(requestjson);
        return this;
    }

    public void setRequestjson(String requestjson) {
        this.requestjson = requestjson;
    }

    public String getSpsrequestxml() {
        return this.spsrequestxml;
    }

    public SPSOutgoingTransactions spsrequestxml(String spsrequestxml) {
        this.setSpsrequestxml(spsrequestxml);
        return this;
    }

    public void setSpsrequestxml(String spsrequestxml) {
        this.spsrequestxml = spsrequestxml;
    }

    public String getSpsresponsexml() {
        return this.spsresponsexml;
    }

    public SPSOutgoingTransactions spsresponsexml(String spsresponsexml) {
        this.setSpsresponsexml(spsresponsexml);
        return this;
    }

    public void setSpsresponsexml(String spsresponsexml) {
        this.spsresponsexml = spsresponsexml;
    }

    public Double getAmount() {
        return this.amount;
    }

    public SPSOutgoingTransactions amount(Double amount) {
        this.setAmount(amount);
        return this;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public String getCallbackstatus() {
        return this.callbackstatus;
    }

    public SPSOutgoingTransactions callbackstatus(String callbackstatus) {
        this.setCallbackstatus(callbackstatus);
        return this;
    }

    public void setCallbackstatus(String callbackstatus) {
        this.callbackstatus = callbackstatus;
    }

    public String getCallbackstatusdesc() {
        return this.callbackstatusdesc;
    }

    public SPSOutgoingTransactions callbackstatusdesc(String callbackstatusdesc) {
        this.setCallbackstatusdesc(callbackstatusdesc);
        return this;
    }

    public void setCallbackstatusdesc(String callbackstatusdesc) {
        this.callbackstatusdesc = callbackstatusdesc;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof SPSOutgoingTransactions)) {
            return false;
        }
        return getId() != null && getId().equals(((SPSOutgoingTransactions) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "SPSOutgoingTransactions{" +
            "id=" + getId() +
            ", messageid='" + getMessageid() + "'" +
            ", channelcode='" + getChannelcode() + "'" +
            ", callbackurl='" + getCallbackurl() + "'" +
            ", messagetype='" + getMessagetype() + "'" +
            ", transcurrency='" + getTranscurrency() + "'" +
            ", debtorsname='" + getDebtorsname() + "'" +
            ", debtorsaccountid='" + getDebtorsaccountid() + "'" +
            ", debtorsbankcode='" + getDebtorsbankcode() + "'" +
            ", debtorsphone='" + getDebtorsphone() + "'" +
            ", beneficiaryname='" + getBeneficiaryname() + "'" +
            ", beneficiaryaccountid='" + getBeneficiaryaccountid() + "'" +
            ", beneficiarybankcode='" + getBeneficiarybankcode() + "'" +
            ", beneficiaryphone='" + getBeneficiaryphone() + "'" +
            ", narration='" + getNarration() + "'" +
            ", externalreference='" + getExternalreference() + "'" +
            ", cbsreference='" + getCbsreference() + "'" +
            ", messageendtoendid='" + getMessageendtoendid() + "'" +
            ", transactionstatus='" + getTransactionstatus() + "'" +
            ", transactionstatusdesc='" + getTransactionstatusdesc() + "'" +
            ", spsstatus='" + getSpsstatus() + "'" +
            ", spsstatusdesc='" + getSpsstatusdesc() + "'" +
            ", cbsstatus='" + getCbsstatus() + "'" +
            ", cbsstatusdesc='" + getCbsstatusdesc() + "'" +
            ", requestInstanttime='" + getRequestInstanttime() + "'" +
            ", isomessagetype='" + getIsomessagetype() + "'" +
            ", requestjson='" + getRequestjson() + "'" +
            ", spsrequestxml='" + getSpsrequestxml() + "'" +
            ", spsresponsexml='" + getSpsresponsexml() + "'" +
            ", amount=" + getAmount() +
            ", callbackstatus='" + getCallbackstatus() + "'" +
            ", callbackstatusdesc='" + getCallbackstatusdesc() + "'" +
            "}";
    }
}

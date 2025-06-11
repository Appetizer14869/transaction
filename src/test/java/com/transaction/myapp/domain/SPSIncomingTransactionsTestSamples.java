package com.transaction.myapp.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;

public class SPSIncomingTransactionsTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static SPSIncomingTransactions getSPSIncomingTransactionsSample1() {
        return new SPSIncomingTransactions()
            .id(1L)
            .messageid("messageid1")
            .channelcode("channelcode1")
            .callbackurl("callbackurl1")
            .messagetype("messagetype1")
            .transcurrency("transcurrency1")
            .debtorsname("debtorsname1")
            .debtorsaccountid("debtorsaccountid1")
            .debtorsbankcode("debtorsbankcode1")
            .debtorsphone("debtorsphone1")
            .beneficiaryname("beneficiaryname1")
            .beneficiaryaccountid("beneficiaryaccountid1")
            .beneficiarybankcode("beneficiarybankcode1")
            .beneficiaryphone("beneficiaryphone1")
            .narration("narration1")
            .externalreference("externalreference1")
            .cbsreference("cbsreference1")
            .messageendtoendid("messageendtoendid1")
            .transactionstatus("transactionstatus1")
            .transactionstatusdesc("transactionstatusdesc1")
            .spsstatus("spsstatus1")
            .spsstatusdesc("spsstatusdesc1")
            .cbsstatus("cbsstatus1")
            .cbsstatusdesc("cbsstatusdesc1")
            .isomessagetype("isomessagetype1")
            .requestjson("requestjson1")
            .spsrequestxml("spsrequestxml1")
            .spsresponsexml("spsresponsexml1");
    }

    public static SPSIncomingTransactions getSPSIncomingTransactionsSample2() {
        return new SPSIncomingTransactions()
            .id(2L)
            .messageid("messageid2")
            .channelcode("channelcode2")
            .callbackurl("callbackurl2")
            .messagetype("messagetype2")
            .transcurrency("transcurrency2")
            .debtorsname("debtorsname2")
            .debtorsaccountid("debtorsaccountid2")
            .debtorsbankcode("debtorsbankcode2")
            .debtorsphone("debtorsphone2")
            .beneficiaryname("beneficiaryname2")
            .beneficiaryaccountid("beneficiaryaccountid2")
            .beneficiarybankcode("beneficiarybankcode2")
            .beneficiaryphone("beneficiaryphone2")
            .narration("narration2")
            .externalreference("externalreference2")
            .cbsreference("cbsreference2")
            .messageendtoendid("messageendtoendid2")
            .transactionstatus("transactionstatus2")
            .transactionstatusdesc("transactionstatusdesc2")
            .spsstatus("spsstatus2")
            .spsstatusdesc("spsstatusdesc2")
            .cbsstatus("cbsstatus2")
            .cbsstatusdesc("cbsstatusdesc2")
            .isomessagetype("isomessagetype2")
            .requestjson("requestjson2")
            .spsrequestxml("spsrequestxml2")
            .spsresponsexml("spsresponsexml2");
    }

    public static SPSIncomingTransactions getSPSIncomingTransactionsRandomSampleGenerator() {
        return new SPSIncomingTransactions()
            .id(longCount.incrementAndGet())
            .messageid(UUID.randomUUID().toString())
            .channelcode(UUID.randomUUID().toString())
            .callbackurl(UUID.randomUUID().toString())
            .messagetype(UUID.randomUUID().toString())
            .transcurrency(UUID.randomUUID().toString())
            .debtorsname(UUID.randomUUID().toString())
            .debtorsaccountid(UUID.randomUUID().toString())
            .debtorsbankcode(UUID.randomUUID().toString())
            .debtorsphone(UUID.randomUUID().toString())
            .beneficiaryname(UUID.randomUUID().toString())
            .beneficiaryaccountid(UUID.randomUUID().toString())
            .beneficiarybankcode(UUID.randomUUID().toString())
            .beneficiaryphone(UUID.randomUUID().toString())
            .narration(UUID.randomUUID().toString())
            .externalreference(UUID.randomUUID().toString())
            .cbsreference(UUID.randomUUID().toString())
            .messageendtoendid(UUID.randomUUID().toString())
            .transactionstatus(UUID.randomUUID().toString())
            .transactionstatusdesc(UUID.randomUUID().toString())
            .spsstatus(UUID.randomUUID().toString())
            .spsstatusdesc(UUID.randomUUID().toString())
            .cbsstatus(UUID.randomUUID().toString())
            .cbsstatusdesc(UUID.randomUUID().toString())
            .isomessagetype(UUID.randomUUID().toString())
            .requestjson(UUID.randomUUID().toString())
            .spsrequestxml(UUID.randomUUID().toString())
            .spsresponsexml(UUID.randomUUID().toString());
    }
}

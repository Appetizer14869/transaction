package com.transaction.myapp.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;

public class CBSTransactionsTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static CBSTransactions getCBSTransactionsSample1() {
        return new CBSTransactions()
            .id(1L)
            .messageid("messageid1")
            .channelcode("channelcode1")
            .messagetype("messagetype1")
            .transcurrency("transcurrency1")
            .debtorsname("debtorsname1")
            .debtorsaccountid("debtorsaccountid1")
            .debtorsphone("debtorsphone1")
            .creditorsname("creditorsname1")
            .creditorsaccountid("creditorsaccountid1")
            .creditorsphone("creditorsphone1")
            .narration("narration1")
            .externalreference("externalreference1")
            .cbsreference("cbsreference1")
            .cbsstatus("cbsstatus1")
            .cbsstatusdesc("cbsstatusdesc1")
            .requestjson("requestjson1")
            .cbsrequestxml("cbsrequestxml1")
            .cbsresponsexml("cbsresponsexml1");
    }

    public static CBSTransactions getCBSTransactionsSample2() {
        return new CBSTransactions()
            .id(2L)
            .messageid("messageid2")
            .channelcode("channelcode2")
            .messagetype("messagetype2")
            .transcurrency("transcurrency2")
            .debtorsname("debtorsname2")
            .debtorsaccountid("debtorsaccountid2")
            .debtorsphone("debtorsphone2")
            .creditorsname("creditorsname2")
            .creditorsaccountid("creditorsaccountid2")
            .creditorsphone("creditorsphone2")
            .narration("narration2")
            .externalreference("externalreference2")
            .cbsreference("cbsreference2")
            .cbsstatus("cbsstatus2")
            .cbsstatusdesc("cbsstatusdesc2")
            .requestjson("requestjson2")
            .cbsrequestxml("cbsrequestxml2")
            .cbsresponsexml("cbsresponsexml2");
    }

    public static CBSTransactions getCBSTransactionsRandomSampleGenerator() {
        return new CBSTransactions()
            .id(longCount.incrementAndGet())
            .messageid(UUID.randomUUID().toString())
            .channelcode(UUID.randomUUID().toString())
            .messagetype(UUID.randomUUID().toString())
            .transcurrency(UUID.randomUUID().toString())
            .debtorsname(UUID.randomUUID().toString())
            .debtorsaccountid(UUID.randomUUID().toString())
            .debtorsphone(UUID.randomUUID().toString())
            .creditorsname(UUID.randomUUID().toString())
            .creditorsaccountid(UUID.randomUUID().toString())
            .creditorsphone(UUID.randomUUID().toString())
            .narration(UUID.randomUUID().toString())
            .externalreference(UUID.randomUUID().toString())
            .cbsreference(UUID.randomUUID().toString())
            .cbsstatus(UUID.randomUUID().toString())
            .cbsstatusdesc(UUID.randomUUID().toString())
            .requestjson(UUID.randomUUID().toString())
            .cbsrequestxml(UUID.randomUUID().toString())
            .cbsresponsexml(UUID.randomUUID().toString());
    }
}

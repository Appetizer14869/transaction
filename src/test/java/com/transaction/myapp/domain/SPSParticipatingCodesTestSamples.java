package com.transaction.myapp.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;

public class SPSParticipatingCodesTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static SPSParticipatingCodes getSPSParticipatingCodesSample1() {
        return new SPSParticipatingCodes().id(1L).biccode("biccode1").bicname("bicname1").bicstatus("bicstatus1");
    }

    public static SPSParticipatingCodes getSPSParticipatingCodesSample2() {
        return new SPSParticipatingCodes().id(2L).biccode("biccode2").bicname("bicname2").bicstatus("bicstatus2");
    }

    public static SPSParticipatingCodes getSPSParticipatingCodesRandomSampleGenerator() {
        return new SPSParticipatingCodes()
            .id(longCount.incrementAndGet())
            .biccode(UUID.randomUUID().toString())
            .bicname(UUID.randomUUID().toString())
            .bicstatus(UUID.randomUUID().toString());
    }
}

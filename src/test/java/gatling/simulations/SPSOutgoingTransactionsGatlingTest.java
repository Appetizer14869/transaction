package gatling.simulations;

import static io.gatling.javaapi.core.CoreDsl.StringBody;
import static io.gatling.javaapi.core.CoreDsl.exec;
import static io.gatling.javaapi.core.CoreDsl.rampUsers;
import static io.gatling.javaapi.core.CoreDsl.scenario;
import static io.gatling.javaapi.http.HttpDsl.header;
import static io.gatling.javaapi.http.HttpDsl.headerRegex;
import static io.gatling.javaapi.http.HttpDsl.http;
import static io.gatling.javaapi.http.HttpDsl.status;

import io.gatling.javaapi.core.ChainBuilder;
import io.gatling.javaapi.core.ScenarioBuilder;
import io.gatling.javaapi.core.Simulation;
import io.gatling.javaapi.http.HttpProtocolBuilder;
import java.time.Duration;
import java.util.Map;
import java.util.Optional;

/**
 * Performance test for the SPSOutgoingTransactions entity.
 *
 * @see <a href="https://github.com/jhipster/generator-jhipster/tree/v8.11.0/generators/gatling#logging-tips">Logging tips</a>
 */
public class SPSOutgoingTransactionsGatlingTest extends Simulation {

    String baseURL = Optional.ofNullable(System.getProperty("baseURL")).orElse("http://localhost:8091");

    HttpProtocolBuilder httpConf = http
        .baseUrl(baseURL)
        .inferHtmlResources()
        .acceptHeader("*/*")
        .acceptEncodingHeader("gzip, deflate")
        .acceptLanguageHeader("fr,fr-fr;q=0.8,en-us;q=0.5,en;q=0.3")
        .connectionHeader("keep-alive")
        .userAgentHeader("Mozilla/5.0 (Macintosh; Intel Mac OS X 10.10; rv:33.0) Gecko/20100101 Firefox/33.0")
        .silentResources(); // Silence all resources like css or css so they don't clutter the results

    Map<String, String> headersHttp = Map.of("Accept", "application/json");

    Map<String, String> headersHttpAuthentication = Map.of("Content-Type", "application/json", "Accept", "application/json");

    Map<String, String> headersHttpAuthenticated = Map.of("Accept", "application/json", "Authorization", "${access_token}");

    ChainBuilder scn = exec(http("First unauthenticated request").get("/api/account").headers(headersHttp).check(status().is(401)))
        .exitHereIfFailed()
        .pause(10)
        .exec(
            http("Authentication")
                .post("/api/authenticate")
                .headers(headersHttpAuthentication)
                .body(StringBody("{\"username\":\"admin\", \"password\":\"admin\"}"))
                .asJson()
                .check(header("Authorization").saveAs("access_token"))
        )
        .exitHereIfFailed()
        .pause(2)
        .exec(http("Authenticated request").get("/api/account").headers(headersHttpAuthenticated).check(status().is(200)))
        .pause(10)
        .repeat(2)
        .on(
            exec(
                http("Get all sPSOutgoingTransactions")
                    .get("/services/transaction/api/sps-outgoing-transactions")
                    .headers(headersHttpAuthenticated)
                    .check(status().is(200))
            )
                .pause(Duration.ofSeconds(10), Duration.ofSeconds(20))
                .exec(
                    http("Create new sPSOutgoingTransactions")
                        .post("/services/transaction/api/sps-outgoing-transactions")
                        .headers(headersHttpAuthenticated)
                        .body(
                            StringBody(
                                "{" +
                                "\"messageid\": \"SAMPLE_TEXT\"" +
                                ", \"channelcode\": \"SAMPLE_TEXT\"" +
                                ", \"callbackurl\": \"SAMPLE_TEXT\"" +
                                ", \"messagetype\": \"SAMPLE_TEXT\"" +
                                ", \"transcurrency\": \"SAMPLE_TEXT\"" +
                                ", \"debtorsname\": \"SAMPLE_TEXT\"" +
                                ", \"debtorsaccountid\": \"SAMPLE_TEXT\"" +
                                ", \"debtorsbankcode\": \"SAMPLE_TEXT\"" +
                                ", \"debtorsphone\": \"SAMPLE_TEXT\"" +
                                ", \"beneficiaryname\": \"SAMPLE_TEXT\"" +
                                ", \"beneficiaryaccountid\": \"SAMPLE_TEXT\"" +
                                ", \"beneficiarybankcode\": \"SAMPLE_TEXT\"" +
                                ", \"beneficiaryphone\": \"SAMPLE_TEXT\"" +
                                ", \"narration\": \"SAMPLE_TEXT\"" +
                                ", \"externalreference\": \"SAMPLE_TEXT\"" +
                                ", \"cbsreference\": \"SAMPLE_TEXT\"" +
                                ", \"messageendtoendid\": \"SAMPLE_TEXT\"" +
                                ", \"transactionstatus\": \"SAMPLE_TEXT\"" +
                                ", \"transactionstatusdesc\": \"SAMPLE_TEXT\"" +
                                ", \"spsstatus\": \"SAMPLE_TEXT\"" +
                                ", \"spsstatusdesc\": \"SAMPLE_TEXT\"" +
                                ", \"cbsstatus\": \"SAMPLE_TEXT\"" +
                                ", \"cbsstatusdesc\": \"SAMPLE_TEXT\"" +
                                ", \"requestInstanttime\": \"2020-01-01T00:00:00.000Z\"" +
                                ", \"isomessagetype\": \"SAMPLE_TEXT\"" +
                                ", \"requestjson\": \"SAMPLE_TEXT\"" +
                                ", \"spsrequestxml\": \"SAMPLE_TEXT\"" +
                                ", \"spsresponsexml\": \"SAMPLE_TEXT\"" +
                                ", \"amount\": 0" +
                                ", \"callbackstatus\": \"SAMPLE_TEXT\"" +
                                ", \"callbackstatusdesc\": \"SAMPLE_TEXT\"" +
                                "}"
                            )
                        )
                        .asJson()
                        .check(status().is(201))
                        .check(headerRegex("Location", "(.*)").saveAs("new_sPSOutgoingTransactions_url"))
                )
                .exitHereIfFailed()
                .pause(10)
                .repeat(5)
                .on(
                    exec(
                        http("Get created sPSOutgoingTransactions")
                            .get("/services/transaction${new_sPSOutgoingTransactions_url}")
                            .headers(headersHttpAuthenticated)
                    ).pause(10)
                )
                .exec(
                    http("Delete created sPSOutgoingTransactions")
                        .delete("/services/transaction${new_sPSOutgoingTransactions_url}")
                        .headers(headersHttpAuthenticated)
                )
                .pause(10)
        );

    ScenarioBuilder users = scenario("Test the SPSOutgoingTransactions entity").exec(scn);

    {
        setUp(
            users.injectOpen(rampUsers(Integer.getInteger("users", 100)).during(Duration.ofMinutes(Integer.getInteger("ramp", 1))))
        ).protocols(httpConf);
    }
}

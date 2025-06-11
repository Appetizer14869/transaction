package com.transaction.myapp.repository;

import com.transaction.myapp.domain.SPSIncomingTransactions;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the SPSIncomingTransactions entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SPSIncomingTransactionsRepository extends JpaRepository<SPSIncomingTransactions, Long> {}

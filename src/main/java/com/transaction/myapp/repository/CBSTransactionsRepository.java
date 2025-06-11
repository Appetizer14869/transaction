package com.transaction.myapp.repository;

import com.transaction.myapp.domain.CBSTransactions;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the CBSTransactions entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CBSTransactionsRepository extends JpaRepository<CBSTransactions, Long> {}

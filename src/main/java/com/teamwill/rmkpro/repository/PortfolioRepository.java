package com.teamwill.rmkpro.repository;

import com.teamwill.rmkpro.domain.Portfolio;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Portfolio entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PortfolioRepository extends JpaRepository<Portfolio, Long> {}

package com.busifrog.domain;

import java.io.Serializable;
import java.time.Instant;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A SellerPlan.
 */
@Entity
@Table(name = "seller_plan")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class SellerPlan implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "products")
    private Long products;

    @Column(name = "services")
    private Long services;

    @Column(name = "monthly_price")
    private Double monthlyPrice;

    @Column(name = "annual_price")
    private Double annualPrice;

    @Column(name = "discount")
    private Long discount;

    @Column(name = "created_date")
    private Instant createdDate;

    @Column(name = "last_modified_date")
    private Instant lastModifiedDate;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "last_modified_by")
    private String lastModifiedBy;

    @Column(name = "is_deleted")
    private Boolean isDeleted;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public SellerPlan id(Long id) {
        this.id = id;
        return this;
    }

    public String getName() {
        return this.name;
    }

    public SellerPlan name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getProducts() {
        return this.products;
    }

    public SellerPlan products(Long products) {
        this.products = products;
        return this;
    }

    public void setProducts(Long products) {
        this.products = products;
    }

    public Long getServices() {
        return this.services;
    }

    public SellerPlan services(Long services) {
        this.services = services;
        return this;
    }

    public void setServices(Long services) {
        this.services = services;
    }

    public Double getMonthlyPrice() {
        return this.monthlyPrice;
    }

    public SellerPlan monthlyPrice(Double monthlyPrice) {
        this.monthlyPrice = monthlyPrice;
        return this;
    }

    public void setMonthlyPrice(Double monthlyPrice) {
        this.monthlyPrice = monthlyPrice;
    }

    public Double getAnnualPrice() {
        return this.annualPrice;
    }

    public SellerPlan annualPrice(Double annualPrice) {
        this.annualPrice = annualPrice;
        return this;
    }

    public void setAnnualPrice(Double annualPrice) {
        this.annualPrice = annualPrice;
    }

    public Long getDiscount() {
        return this.discount;
    }

    public SellerPlan discount(Long discount) {
        this.discount = discount;
        return this;
    }

    public void setDiscount(Long discount) {
        this.discount = discount;
    }

    public Instant getCreatedDate() {
        return this.createdDate;
    }

    public SellerPlan createdDate(Instant createdDate) {
        this.createdDate = createdDate;
        return this;
    }

    public void setCreatedDate(Instant createdDate) {
        this.createdDate = createdDate;
    }

    public Instant getLastModifiedDate() {
        return this.lastModifiedDate;
    }

    public SellerPlan lastModifiedDate(Instant lastModifiedDate) {
        this.lastModifiedDate = lastModifiedDate;
        return this;
    }

    public void setLastModifiedDate(Instant lastModifiedDate) {
        this.lastModifiedDate = lastModifiedDate;
    }

    public String getCreatedBy() {
        return this.createdBy;
    }

    public SellerPlan createdBy(String createdBy) {
        this.createdBy = createdBy;
        return this;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public String getLastModifiedBy() {
        return this.lastModifiedBy;
    }

    public SellerPlan lastModifiedBy(String lastModifiedBy) {
        this.lastModifiedBy = lastModifiedBy;
        return this;
    }

    public void setLastModifiedBy(String lastModifiedBy) {
        this.lastModifiedBy = lastModifiedBy;
    }

    public Boolean getIsDeleted() {
        return this.isDeleted;
    }

    public SellerPlan isDeleted(Boolean isDeleted) {
        this.isDeleted = isDeleted;
        return this;
    }

    public void setIsDeleted(Boolean isDeleted) {
        this.isDeleted = isDeleted;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof SellerPlan)) {
            return false;
        }
        return id != null && id.equals(((SellerPlan) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "SellerPlan{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", products=" + getProducts() +
            ", services=" + getServices() +
            ", monthlyPrice=" + getMonthlyPrice() +
            ", annualPrice=" + getAnnualPrice() +
            ", discount=" + getDiscount() +
            ", createdDate='" + getCreatedDate() + "'" +
            ", lastModifiedDate='" + getLastModifiedDate() + "'" +
            ", createdBy='" + getCreatedBy() + "'" +
            ", lastModifiedBy='" + getLastModifiedBy() + "'" +
            ", isDeleted='" + getIsDeleted() + "'" +
            "}";
    }
}

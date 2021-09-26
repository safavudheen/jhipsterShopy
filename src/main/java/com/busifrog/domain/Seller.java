package com.busifrog.domain;

import com.busifrog.domain.enumeration.SellerStatus;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Seller.
 */
@Entity
@Table(name = "seller")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Seller extends AbstractAuditingEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "logo_image_url")
    private String logoImageUrl;

    @Column(name = "pincode")
    private Long pincode;

    @Column(name = "latitude")
    private String latitude;

    @Column(name = "longitude")
    private String longitude;

    @Column(name = "plan_expiry_date")
    private Instant planExpiryDate;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private SellerStatus status;

    @Column(name = "website_link")
    private String websiteLink;

    @Column(name = "is_deleted")
    private Boolean isDeleted = false;

    @JsonIgnoreProperties(value = { "seller" }, allowSetters = true)
    @OneToOne
    @JoinColumn(unique = true)
    private Contact contact;

    @OneToMany(mappedBy = "seller")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "category", "seller" }, allowSetters = true)
    private Set<Product> products = new HashSet<>();

    @OneToMany(mappedBy = "seller")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "category", "seller" }, allowSetters = true)
    private Set<Service> services = new HashSet<>();

    @OneToMany(mappedBy = "seller")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "seller" }, allowSetters = true)
    private Set<UserVisit> userVisits = new HashSet<>();

    @ManyToOne
    private SellerPlan sellerPlan;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Seller id(Long id) {
        this.id = id;
        return this;
    }

    public String getName() {
        return this.name;
    }

    public Seller name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLogoImageUrl() {
        return this.logoImageUrl;
    }

    public Seller logoImageUrl(String logoImageUrl) {
        this.logoImageUrl = logoImageUrl;
        return this;
    }

    public void setLogoImageUrl(String logoImageUrl) {
        this.logoImageUrl = logoImageUrl;
    }

    public Long getPincode() {
        return this.pincode;
    }

    public Seller pincode(Long pincode) {
        this.pincode = pincode;
        return this;
    }

    public void setPincode(Long pincode) {
        this.pincode = pincode;
    }

    public String getLatitude() {
        return this.latitude;
    }

    public Seller latitude(String latitude) {
        this.latitude = latitude;
        return this;
    }

    public void setLatitude(String latitude) {
        this.latitude = latitude;
    }

    public String getLongitude() {
        return this.longitude;
    }

    public Seller longitude(String longitude) {
        this.longitude = longitude;
        return this;
    }

    public void setLongitude(String longitude) {
        this.longitude = longitude;
    }

    public Instant getPlanExpiryDate() {
        return this.planExpiryDate;
    }

    public Seller planExpiryDate(Instant planExpiryDate) {
        this.planExpiryDate = planExpiryDate;
        return this;
    }

    public void setPlanExpiryDate(Instant planExpiryDate) {
        this.planExpiryDate = planExpiryDate;
    }

    public SellerStatus getStatus() {
        return this.status;
    }

    public Seller status(SellerStatus status) {
        this.status = status;
        return this;
    }

    public void setStatus(SellerStatus status) {
        this.status = status;
    }

    public String getWebsiteLink() {
        return this.websiteLink;
    }

    public Seller websiteLink(String websiteLink) {
        this.websiteLink = websiteLink;
        return this;
    }

    public void setWebsiteLink(String websiteLink) {
        this.websiteLink = websiteLink;
    }

    public Boolean getIsDeleted() {
        return this.isDeleted;
    }

    public Seller isDeleted(Boolean isDeleted) {
        this.isDeleted = isDeleted;
        return this;
    }

    public void setIsDeleted(Boolean isDeleted) {
        this.isDeleted = isDeleted;
    }

    public Contact getContact() {
        return this.contact;
    }

    public Seller contact(Contact contact) {
        this.setContact(contact);
        return this;
    }

    public void setContact(Contact contact) {
        this.contact = contact;
    }

    public Set<Product> getProducts() {
        return this.products;
    }

    public Seller products(Set<Product> products) {
        this.setProducts(products);
        return this;
    }

    public Seller addProduct(Product product) {
        this.products.add(product);
        product.setSeller(this);
        return this;
    }

    public Seller removeProduct(Product product) {
        this.products.remove(product);
        product.setSeller(null);
        return this;
    }

    public void setProducts(Set<Product> products) {
        if (this.products != null) {
            this.products.forEach(i -> i.setSeller(null));
        }
        if (products != null) {
            products.forEach(i -> i.setSeller(this));
        }
        this.products = products;
    }

    public Set<Service> getServices() {
        return this.services;
    }

    public Seller services(Set<Service> services) {
        this.setServices(services);
        return this;
    }

    public Seller addService(Service service) {
        this.services.add(service);
        service.setSeller(this);
        return this;
    }

    public Seller removeService(Service service) {
        this.services.remove(service);
        service.setSeller(null);
        return this;
    }

    public void setServices(Set<Service> services) {
        if (this.services != null) {
            this.services.forEach(i -> i.setSeller(null));
        }
        if (services != null) {
            services.forEach(i -> i.setSeller(this));
        }
        this.services = services;
    }

    public Set<UserVisit> getUserVisits() {
        return this.userVisits;
    }

    public Seller userVisits(Set<UserVisit> userVisits) {
        this.setUserVisits(userVisits);
        return this;
    }

    public Seller addUserVisit(UserVisit userVisit) {
        this.userVisits.add(userVisit);
        userVisit.setSeller(this);
        return this;
    }

    public Seller removeUserVisit(UserVisit userVisit) {
        this.userVisits.remove(userVisit);
        userVisit.setSeller(null);
        return this;
    }

    public void setUserVisits(Set<UserVisit> userVisits) {
        if (this.userVisits != null) {
            this.userVisits.forEach(i -> i.setSeller(null));
        }
        if (userVisits != null) {
            userVisits.forEach(i -> i.setSeller(this));
        }
        this.userVisits = userVisits;
    }

    public SellerPlan getSellerPlan() {
        return this.sellerPlan;
    }

    public Seller sellerPlan(SellerPlan sellerPlan) {
        this.setSellerPlan(sellerPlan);
        return this;
    }

    public void setSellerPlan(SellerPlan sellerPlan) {
        this.sellerPlan = sellerPlan;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Seller)) {
            return false;
        }
        return id != null && id.equals(((Seller) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Seller{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", logoImageUrl='" + getLogoImageUrl() + "'" +
            ", pincode=" + getPincode() +
            ", latitude='" + getLatitude() + "'" +
            ", longitude='" + getLongitude() + "'" +
            ", planExpiryDate='" + getPlanExpiryDate() + "'" +
            ", status='" + getStatus() + "'" +
            ", websiteLink='" + getWebsiteLink() + "'" +
            ", createdDate='" + getCreatedDate() + "'" +
            ", lastModifiedDate='" + getLastModifiedDate() + "'" +
            ", createdBy='" + getCreatedBy() + "'" +
            ", lastModifiedBy='" + getLastModifiedBy() + "'" +
            ", isDeleted='" + getIsDeleted() + "'" +
            "}";
    }
}

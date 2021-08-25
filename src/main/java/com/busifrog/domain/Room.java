package com.busifrog.domain;

import com.busifrog.domain.enumeration.RoomStatus;
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
 * A Room.
 */
@Entity
@Table(name = "room")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Room extends AbstractAuditingEntity implements Serializable {

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
    private RoomStatus status;

    @Column(name = "website_link")
    private String websiteLink;

    @Column(name = "is_deleted")
    private Boolean isDeleted = false;

    @JsonIgnoreProperties(value = { "room" }, allowSetters = true)
    @OneToOne
    @JoinColumn(unique = true)
    private Contact contact;

    @OneToMany(mappedBy = "room")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "category", "room" }, allowSetters = true)
    private Set<Product> products = new HashSet<>();

    @OneToMany(mappedBy = "room")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "category", "room" }, allowSetters = true)
    private Set<Service> services = new HashSet<>();

    @OneToMany(mappedBy = "room")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "room" }, allowSetters = true)
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

    public Room id(Long id) {
        this.id = id;
        return this;
    }

    public String getName() {
        return this.name;
    }

    public Room name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLogoImageUrl() {
        return this.logoImageUrl;
    }

    public Room logoImageUrl(String logoImageUrl) {
        this.logoImageUrl = logoImageUrl;
        return this;
    }

    public void setLogoImageUrl(String logoImageUrl) {
        this.logoImageUrl = logoImageUrl;
    }

    public Long getPincode() {
        return this.pincode;
    }

    public Room pincode(Long pincode) {
        this.pincode = pincode;
        return this;
    }

    public void setPincode(Long pincode) {
        this.pincode = pincode;
    }

    public String getLatitude() {
        return this.latitude;
    }

    public Room latitude(String latitude) {
        this.latitude = latitude;
        return this;
    }

    public void setLatitude(String latitude) {
        this.latitude = latitude;
    }

    public String getLongitude() {
        return this.longitude;
    }

    public Room longitude(String longitude) {
        this.longitude = longitude;
        return this;
    }

    public void setLongitude(String longitude) {
        this.longitude = longitude;
    }

    public Instant getPlanExpiryDate() {
        return this.planExpiryDate;
    }

    public Room planExpiryDate(Instant planExpiryDate) {
        this.planExpiryDate = planExpiryDate;
        return this;
    }

    public void setPlanExpiryDate(Instant planExpiryDate) {
        this.planExpiryDate = planExpiryDate;
    }

    public RoomStatus getStatus() {
        return this.status;
    }

    public Room status(RoomStatus status) {
        this.status = status;
        return this;
    }

    public void setStatus(RoomStatus status) {
        this.status = status;
    }

    public String getWebsiteLink() {
        return this.websiteLink;
    }

    public Room websiteLink(String websiteLink) {
        this.websiteLink = websiteLink;
        return this;
    }

    public void setWebsiteLink(String websiteLink) {
        this.websiteLink = websiteLink;
    }

    public Boolean getIsDeleted() {
        return this.isDeleted;
    }

    public Room isDeleted(Boolean isDeleted) {
        this.isDeleted = isDeleted;
        return this;
    }

    public void setIsDeleted(Boolean isDeleted) {
        this.isDeleted = isDeleted;
    }

    public Contact getContact() {
        return this.contact;
    }

    public Room contact(Contact contact) {
        this.setContact(contact);
        return this;
    }

    public void setContact(Contact contact) {
        this.contact = contact;
    }

    public Set<Product> getProducts() {
        return this.products;
    }

    public Room products(Set<Product> products) {
        this.setProducts(products);
        return this;
    }

    public Room addProduct(Product product) {
        this.products.add(product);
        product.setRoom(this);
        return this;
    }

    public Room removeProduct(Product product) {
        this.products.remove(product);
        product.setRoom(null);
        return this;
    }

    public void setProducts(Set<Product> products) {
        if (this.products != null) {
            this.products.forEach(i -> i.setRoom(null));
        }
        if (products != null) {
            products.forEach(i -> i.setRoom(this));
        }
        this.products = products;
    }

    public Set<Service> getServices() {
        return this.services;
    }

    public Room services(Set<Service> services) {
        this.setServices(services);
        return this;
    }

    public Room addService(Service service) {
        this.services.add(service);
        service.setRoom(this);
        return this;
    }

    public Room removeService(Service service) {
        this.services.remove(service);
        service.setRoom(null);
        return this;
    }

    public void setServices(Set<Service> services) {
        if (this.services != null) {
            this.services.forEach(i -> i.setRoom(null));
        }
        if (services != null) {
            services.forEach(i -> i.setRoom(this));
        }
        this.services = services;
    }

    public Set<UserVisit> getUserVisits() {
        return this.userVisits;
    }

    public Room userVisits(Set<UserVisit> userVisits) {
        this.setUserVisits(userVisits);
        return this;
    }

    public Room addUserVisit(UserVisit userVisit) {
        this.userVisits.add(userVisit);
        userVisit.setRoom(this);
        return this;
    }

    public Room removeUserVisit(UserVisit userVisit) {
        this.userVisits.remove(userVisit);
        userVisit.setRoom(null);
        return this;
    }

    public void setUserVisits(Set<UserVisit> userVisits) {
        if (this.userVisits != null) {
            this.userVisits.forEach(i -> i.setRoom(null));
        }
        if (userVisits != null) {
            userVisits.forEach(i -> i.setRoom(this));
        }
        this.userVisits = userVisits;
    }

    public SellerPlan getSellerPlan() {
        return this.sellerPlan;
    }

    public Room sellerPlan(SellerPlan sellerPlan) {
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
        if (!(o instanceof Room)) {
            return false;
        }
        return id != null && id.equals(((Room) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Room{" +
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
